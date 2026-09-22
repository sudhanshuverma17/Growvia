import ChatMessage from "../models/ChatMessage.js";
import { getChatModel, buildMessageHistory } from "../services/llmService.js";

/**
 * Streams AI responses token-by-token using Server-Sent Events (SSE).
 * Enforces that the user has purchased the roadmap (or has admin privileges).
 */
export const streamChat = async (req, res) => {
  const { message, careerId } = req.body;

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Message content is required." });
  }

  if (message.length > 2000) {
    return res.status(400).json({ error: "Message exceeds 2000 characters limit." });
  }

  const userId = req.user._id;
  const isAdmin = req.user.role === "admin";
  const purchasedRoadmaps = Array.isArray(req.user.purchasedRoadmaps)
    ? req.user.purchasedRoadmaps
    : [];

  const targetCareerId = typeof careerId === "string" && careerId.trim() ? careerId.trim() : null;

  // Authorization check: User must have purchased this specific roadmap (or be an admin)
  if (targetCareerId) {
    const hasAccess =
      isAdmin ||
      purchasedRoadmaps.some(
        (id) => id.toLowerCase() === targetCareerId.toLowerCase()
      );

    if (!hasAccess) {
      return res.status(403).json({
        error: "Access denied. Vio is only accessible for purchased roadmaps.",
        code: "ROADMAP_NOT_PURCHASED",
      });
    }
  } else {
    // If no careerId provided, ensure user has at least one purchased roadmap or is admin
    const hasAnyAccess = isAdmin || purchasedRoadmaps.length > 0;
    if (!hasAnyAccess) {
      return res.status(403).json({
        error: "Access denied. Vio is only accessible for purchased roadmaps.",
        code: "NO_PURCHASED_ROADMAPS",
      });
    }
  }

  // 1. Establish Server-Sent Events (SSE) headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  if (typeof res.flushHeaders === "function") {
    res.flushHeaders();
  }

  let clientConnected = true;
  req.on("close", () => {
    clientConnected = false;
  });

  try {
    // 2. Fetch past conversation memory from MongoDB for context (chronological order)
    const historyQuery = { userId };
    if (targetCareerId) {
      historyQuery.$or = [
        { careerId: targetCareerId },
        { careerId: null },
        { careerId: { $exists: false } },
      ];
    }

    const pastDocs = await ChatMessage.find(historyQuery)
      .sort({ timestamp: -1 })
      .limit(10)
      .lean();

    const history = pastDocs.reverse().map((doc) => ({
      role: doc.role,
      content: doc.content,
    }));

    // 3. Save incoming user message to database
    await ChatMessage.create({
      userId,
      role: "user",
      content: message.trim(),
      careerId: targetCareerId,
    });

    // 4. Instantiate swappable LangChain model and construct message chain
    const model = getChatModel();
    const promptMessages = buildMessageHistory(message.trim(), history, targetCareerId);

    // 5. Stream tokens
    let fullResponse = "";
    const stream = await model.stream(promptMessages);

    for await (const chunk of stream) {
      if (!clientConnected) break;

      const chunkText = typeof chunk.content === "string" ? chunk.content : "";
      if (chunkText) {
        fullResponse += chunkText;
        res.write(`data: ${JSON.stringify({ chunk: chunkText })}\n\n`);
      }
    }

    // 6. Save completed assistant response to database if response was generated
    if (fullResponse.trim()) {
      await ChatMessage.create({
        userId,
        role: "assistant",
        content: fullResponse.trim(),
        careerId: targetCareerId,
      });
    }

    // 7. Emit stream completion event
    if (clientConnected) {
      res.write("data: [DONE]\n\n");
      res.end();
    }
  } catch (error) {
    console.error("[Chat Stream Error]:", error);

    if (clientConnected) {
      const errorMessage =
        error?.message || "Failed to generate AI response. Please try again in a moment.";
      res.write(`data: ${JSON.stringify({ error: errorMessage })}\n\n`);
      res.write("data: [DONE]\n\n");
      res.end();
    }
  }
};

/**
 * Retrieves persistent chat history for the authenticated user and optional roadmap.
 */
export const getChatHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const isAdmin = req.user.role === "admin";
    const purchasedRoadmaps = Array.isArray(req.user.purchasedRoadmaps)
      ? req.user.purchasedRoadmaps
      : [];

    const { careerId } = req.query;
    const targetCareerId = typeof careerId === "string" && careerId.trim() ? careerId.trim() : null;

    if (targetCareerId) {
      const hasAccess =
        isAdmin ||
        purchasedRoadmaps.some(
          (id) => id.toLowerCase() === targetCareerId.toLowerCase()
        );

      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          error: "Access denied. Vio is only accessible for purchased roadmaps.",
        });
      }
    } else if (!isAdmin && purchasedRoadmaps.length === 0) {
      return res.status(403).json({
        success: false,
        error: "Access denied. Vio is only accessible for purchased roadmaps.",
      });
    }

    const query = { userId };
    if (targetCareerId) {
      query.$or = [
        { careerId: targetCareerId },
        { careerId: null },
        { careerId: { $exists: false } },
      ];
    }

    const messages = await ChatMessage.find(query)
      .sort({ timestamp: 1 })
      .limit(60)
      .select("role content timestamp _id careerId");

    return res.status(200).json({
      success: true,
      messages: messages.map((m) => ({
        id: m._id,
        role: m.role,
        content: m.content,
        timestamp: m.timestamp,
        careerId: m.careerId,
      })),
    });
  } catch (error) {
    console.error("[Get Chat History Error]:", error);
    return res.status(500).json({
      success: false,
      error: "Unable to retrieve conversation history.",
    });
  }
};

/**
 * Clears persistent chat history for the authenticated user and optional roadmap.
 */
export const clearChatHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const isAdmin = req.user.role === "admin";
    const purchasedRoadmaps = Array.isArray(req.user.purchasedRoadmaps)
      ? req.user.purchasedRoadmaps
      : [];

    const { careerId } = req.query;
    const targetCareerId = typeof careerId === "string" && careerId.trim() ? careerId.trim() : null;

    if (targetCareerId) {
      const hasAccess =
        isAdmin ||
        purchasedRoadmaps.some(
          (id) => id.toLowerCase() === targetCareerId.toLowerCase()
        );

      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          error: "Access denied. Vio is only accessible for purchased roadmaps.",
        });
      }

      await ChatMessage.deleteMany({ userId, careerId: targetCareerId });
    } else {
      if (!isAdmin && purchasedRoadmaps.length === 0) {
        return res.status(403).json({
          success: false,
          error: "Access denied. Vio is only accessible for purchased roadmaps.",
        });
      }

      await ChatMessage.deleteMany({ userId });
    }

    return res.status(200).json({
      success: true,
      message: "Chat history cleared successfully.",
    });
  } catch (error) {
    console.error("[Clear Chat History Error]:", error);
    return res.status(500).json({
      success: false,
      error: "Unable to clear conversation history.",
    });
  }
};

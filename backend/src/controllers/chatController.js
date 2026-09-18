import ChatMessage from "../models/ChatMessage.js";
import { getChatModel, buildMessageHistory } from "../services/llmService.js";

/**
 * Streams AI responses token-by-token using Server-Sent Events (SSE).
 * Handles persistent message storage in MongoDB and multi-turn conversational context.
 */
export const streamChat = async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Message content is required." });
  }

  if (message.length > 2000) {
    return res.status(400).json({ error: "Message exceeds 2000 characters limit." });
  }

  const userId = req.user._id;

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
    const pastDocs = await ChatMessage.find({ userId })
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
    });

    // 4. Instantiate swappable LangChain model and construct message chain
    const model = getChatModel();
    const promptMessages = buildMessageHistory(message.trim(), history);

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
 * Retrieves persistent chat history for the authenticated user.
 */
export const getChatHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const messages = await ChatMessage.find({ userId })
      .sort({ timestamp: 1 })
      .limit(60)
      .select("role content timestamp _id");

    return res.status(200).json({
      success: true,
      messages: messages.map((m) => ({
        id: m._id,
        role: m.role,
        content: m.content,
        timestamp: m.timestamp,
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
 * Clears persistent chat history for the authenticated user.
 */
export const clearChatHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    await ChatMessage.deleteMany({ userId });

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

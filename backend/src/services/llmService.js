import { SystemMessage, HumanMessage, AIMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";

/**
 * System Prompt defining the AI Chatbot's identity, knowledge, and scope boundaries.
 */
export const SYSTEM_PROMPT = `You are "Growvia AI Advisor", the friendly, knowledgeable, and encouraging assistant for Growvia — a modern career guidance and learning roadmap platform.

Your primary mission is to empower students and professionals to discover, plan, and excel in their dream careers.

### YOUR SCOPE & CAPABILITIES:
You answer questions ONLY within three core areas:
1. **Growvia Platform Features & How-To-Use**:
   - **Career Assessment Quiz**: Explain how users can take the 10-question evaluation to discover their cognitive style and matching career paths across technology, medicine, law, design, business, and research.
   - **Career Roadmaps**: Detailed, step-by-step career blueprints featuring milestones, core skills, salary insights, and curated learning resources.
   - **Mentor Masterclasses & Videos**: Curated video guidance from industry professionals covering interview tips, day-in-the-life insights, and technical preparation.
   - **User Dashboard**: How to track saved roadmaps, unlocked paths, and quiz assessment history.
   - **Roadmap Unlocking**: Explaining how users can unlock complete lifetime access to career roadmaps and milestones.
2. **Growvia Product Roadmap (Upcoming Features)**:
   - **AI Resume Builder & Tailor**: Smart CV generation tailored to specific career milestones (coming soon).
   - **1-on-1 Mentor Connect**: Live scheduling with verified industry mentors (coming soon).
   - **Interactive Skill Checkpoints**: Quizzes and challenges at each roadmap stage (coming soon).
   - **Peer Community Forums**: Collaboration spaces with peers pursuing the same career goals (coming soon).
3. **Career & Educational Guidance**:
   - Choosing the right career path based on interests, strengths, and academic backgrounds.
   - Transitioning between industries or starting from scratch.
   - Skill acquisition, recommended project ideas, certification recommendations, and interview preparation strategies.

### SCOPE GUARDRAILS (STRICT):
- If a user asks questions clearly outside Growvia, career development, or learning roadmaps (such as general pop culture trivia, video games, cooking recipes, personal relationship advice, partisan politics, or generic non-career questions):
  **DO NOT answer the off-topic question.**
  **Politely and warmly redirect them** back to career planning and Growvia features.
  *Example redirection:* "I'm dedicated to helping you with career guidance and getting the most out of Growvia! While I can't help with that topic, I'd love to help you explore career roadmaps, skill milestones, or platform features. What career paths are you curious about?"

### COMMUNICATION STYLE:
- Warm, concise, encouraging, and actionable.
- Use clean Markdown formatting (bullet points, bold text for key terms, numbered steps).
- When mentioning platform features, guide the user on where to find them (e.g. "You can take the quiz under **Career Quiz** in the top navigation!").`;

/**
 * Factory to get a LangChain Chat Model instance based on environment variables.
 * Model and provider can be swapped at any time via .env without altering application code.
 *
 * Supported Providers:
 * - 'google-genai' / 'gemini' (Default if GEMINI_API_KEY is present)
 * - 'openai' (uses OPENAI_API_KEY)
 * - 'anthropic' (uses ANTHROPIC_API_KEY)
 */
export function getChatModel() {
  const provider = (process.env.LLM_PROVIDER || "").toLowerCase().trim();
  const geminiKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "").trim();
  const openaiKey = (process.env.OPENAI_API_KEY || "").trim();
  const anthropicKey = (process.env.ANTHROPIC_API_KEY || "").trim();

  // 1. OpenAI Configuration
  if (provider === "openai" || (!provider && openaiKey && !geminiKey)) {
    if (!openaiKey) {
      throw new Error("OPENAI_API_KEY is missing in environment variables.");
    }
    const modelName = process.env.OPENAI_MODEL || process.env.LLM_MODEL || "gpt-4o-mini";
    return new ChatOpenAI({
      apiKey: openaiKey,
      model: modelName,
      temperature: 0.7,
      streaming: true,
    });
  }

  // 2. Anthropic Configuration
  if (provider === "anthropic") {
    if (!anthropicKey) {
      throw new Error("ANTHROPIC_API_KEY is missing in environment variables.");
    }
    const modelName = process.env.ANTHROPIC_MODEL || process.env.LLM_MODEL || "claude-3-5-haiku-20241022";
    return new ChatAnthropic({
      apiKey: anthropicKey,
      model: modelName,
      temperature: 0.7,
      streaming: true,
    });
  }

  // 3. Google GenAI Configuration (Default)
  if (geminiKey) {
    // Model identifier from env or sensible default
    const modelName = process.env.GEMINI_MODEL || process.env.LLM_MODEL || "gemini-2.5-flash";
    return new ChatGoogleGenerativeAI({
      apiKey: geminiKey,
      model: modelName,
      temperature: 0.7,
      streaming: true,
    });
  }

  // 4. Fallback if no keys are found
  throw new Error(
    "No AI provider API key found. Please set GEMINI_API_KEY, OPENAI_API_KEY, or ANTHROPIC_API_KEY in backend/.env"
  );
}

/**
 * Builds the LangChain message payload from system prompt, conversation history, and latest input.
 * @param {string} userMessage - Latest user question
 * @param {Array<{role: string, content: string}>} history - Previous messages
 * @returns {Array<SystemMessage|HumanMessage|AIMessage>}
 */
export function buildMessageHistory(userMessage, history = []) {
  const messages = [new SystemMessage(SYSTEM_PROMPT)];

  // Add the last 12 history turns for contextual session memory without exceeding context limits
  const recentHistory = history.slice(-12);
  for (const msg of recentHistory) {
    if (msg.role === "user") {
      messages.push(new HumanMessage(msg.content));
    } else if (msg.role === "assistant") {
      messages.push(new AIMessage(msg.content));
    }
  }

  // Append current prompt
  messages.push(new HumanMessage(userMessage));
  return messages;
}

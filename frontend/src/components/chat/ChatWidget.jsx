import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  RefreshCw,
  Trash2,
  Minimize2,
  Bot,
  User as UserIcon,
  AlertCircle,
  HelpCircle,
  Compass,
  Map,
  Lightbulb,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useCourses } from "@/context/course-context";
import { apiUrl } from "@/lib/api-config";

export function ChatWidget() {
  const { user, token, isAuthenticated, isAdmin } = useAuth();
  const [location] = useLocation();

  // Authentication check before rendering or mounting the component at all
  if (!isAuthenticated || !user) {
    return null;
  }

  // Inspect path: Chatbot is exclusively accessible on career roadmaps (/roadmaps/:career)
  const match = location.match(/^\/roadmaps\/([^/?#]+)/);
  const currentCareerId = match ? decodeURIComponent(match[1]) : null;

  // Not on a roadmap page -> do not display the chatbot
  if (!currentCareerId) {
    return null;
  }

  // Check if current roadmap is purchased by the user (or user is an admin)
  const isPurchased =
    isAdmin ||
    (Array.isArray(user.purchasedRoadmaps) &&
      user.purchasedRoadmaps.some(
        (id) => id.toLowerCase() === currentCareerId.toLowerCase()
      ));

  // Roadmap is not purchased -> do not display the chatbot
  if (!isPurchased) {
    return null;
  }

  return (
    <ChatWidgetContent
      key={currentCareerId}
      user={user}
      token={token}
      careerId={currentCareerId}
    />
  );
}

function ChatWidgetContent({ user, token, careerId }) {
  const { getCourseById } = useCourses();
  const currentCourse = getCourseById ? getCourseById(careerId) : null;
  const careerTitle =
    currentCourse?.title ||
    careerId
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [streamError, setStreamError] = useState(null);
  const [lastUserPrompt, setLastUserPrompt] = useState("");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const abortControllerRef = useRef(null);

  const storageKey = `growvia_chat_${user._id || user.id || "user"}_${careerId}`;

  // Listen for custom event so page buttons can trigger the AI Advisor window
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("growvia:open-chat", handleOpen);
    return () => window.removeEventListener("growvia:open-chat", handleOpen);
  }, []);

  // Auto-scroll to bottom of messages container
  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom("instant");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isStreaming]);

  // Load chat history from backend for this purchased roadmap
  useEffect(() => {
    let isMounted = true;

    const fetchHistory = async () => {
      setIsLoadingHistory(true);
      try {
        const res = await fetch(
          apiUrl(`/api/chat/history?careerId=${encodeURIComponent(careerId)}`),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data.messages) && data.messages.length > 0) {
            setMessages(data.messages);
            localStorage.setItem(storageKey, JSON.stringify(data.messages));
            setIsLoadingHistory(false);
            return;
          }
        }
      } catch (err) {
        console.warn("[Chat History]: Server fetch failed, falling back to localStorage", err);
      }

      // LocalStorage fallback
      try {
        const cached = localStorage.getItem(storageKey);
        if (cached && isMounted) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed)) {
            setMessages(parsed);
          }
        }
      } catch (e) {
        console.error("[Chat History LocalStorage Error]:", e);
      } finally {
        if (isMounted) setIsLoadingHistory(false);
      }
    };

    fetchHistory();

    return () => {
      isMounted = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [token, storageKey, careerId]);

  // Synchronize messages state with localStorage as offline backup
  useEffect(() => {
    if (!isLoadingHistory && messages.length > 0) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(messages));
      } catch (err) {
        console.warn("[Chat LocalStorage Save Warning]:", err);
      }
    }
  }, [messages, isLoadingHistory, storageKey]);

  // Focus input when chat window opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Send a message (or auto-send a starter prompt)
  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || isStreaming) return;

    setInput("");
    setStreamError(null);
    setLastUserPrompt(query);

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toISOString(),
    };

    const tempAssistantMessage = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: "",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage, tempAssistantMessage]);
    setIsStreaming(true);

    try {
      abortControllerRef.current = new AbortController();

      const response = await fetch(apiUrl("/api/chat/stream"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: query, careerId }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Server responded with status ${response.status}`
        );
      }

      if (!response.body) {
        throw new Error("Streaming is not supported by your browser environment.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let assistantText = "";
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;

          const dataPayload = trimmed.slice(5).trim();
          if (dataPayload === "[DONE]") {
            break;
          }

          try {
            const parsed = JSON.parse(dataPayload);
            if (parsed.error) {
              throw new Error(parsed.error);
            }
            if (parsed.chunk) {
              assistantText += parsed.chunk;
              setMessages((prev) => {
                const next = [...prev];
                const lastIdx = next.length - 1;
                if (lastIdx >= 0 && next[lastIdx].role === "assistant") {
                  next[lastIdx] = {
                    ...next[lastIdx],
                    content: assistantText,
                  };
                }
                return next;
              });
            }
          } catch (e) {
            // Non-JSON or incomplete chunk
          }
        }
      }

      // In case assistant didn't return text
      if (!assistantText.trim()) {
        setMessages((prev) => {
          const next = [...prev];
          const lastIdx = next.length - 1;
          if (lastIdx >= 0 && next[lastIdx].role === "assistant") {
            next[lastIdx] = {
              ...next[lastIdx],
              content:
                "I'm here to help you navigate Growvia! Could you please clarify your career or platform question?",
            };
          }
          return next;
        });
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("[Chat Stream]: Request aborted by user.");
      } else {
        console.error("[Chat Stream Error]:", err);
        setStreamError(err.message || "Failed to reach Growvia AI. Please check your connection.");
        // Remove empty assistant placeholder if failed completely
        setMessages((prev) => {
          if (prev.length > 0 && prev[prev.length - 1].content === "") {
            return prev.slice(0, -1);
          }
          return prev;
        });
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  // Retry last failed prompt
  const handleRetry = () => {
    if (lastUserPrompt && !isStreaming) {
      handleSendMessage(lastUserPrompt);
    }
  };

  // Clear conversation history for this roadmap
  const handleClearHistory = async () => {
    if (window.confirm(`Clear your conversation history for ${careerTitle}?`)) {
      try {
        await fetch(
          apiUrl(`/api/chat/history?careerId=${encodeURIComponent(careerId)}`),
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.warn("[Clear Chat]: Could not clear remote history:", err);
      }
      setMessages([]);
      localStorage.removeItem(storageKey);
      setStreamError(null);
    }
  };

  const roadmapPrompts = [
    {
      icon: Compass,
      text: `What are the core skills and milestones for ${careerTitle}?`,
    },
    {
      icon: Map,
      text: `Can you walk me through the step-by-step roadmap stages?`,
    },
    {
      icon: Lightbulb,
      text: `Which top colleges and entrance exams should I target?`,
    },
    {
      icon: Sparkles,
      text: `Can you give me a structured 6-month study and prep schedule?`,
    },
  ];

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans antialiased">
      {/* Floating Chat Launcher Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            aria-label={`Open ${careerTitle} AI Assistant`}
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 border border-white/20 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            {/* Pulsing beacon glow */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900"></span>
            </span>

            <Sparkles className="w-6 h-6 transition-transform group-hover:rotate-12 duration-300" />

            {/* Desktop Tooltip */}
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-slate-900/90 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-slate-200 shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
              Ask {careerTitle} AI Advisor
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`
              fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-xl border border-white/10 shadow-2xl text-slate-100
              sm:inset-auto sm:bottom-0 sm:right-0 sm:w-[390px] sm:h-[570px] sm:rounded-2xl sm:overflow-hidden sm:mb-2
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 bg-slate-900/90 border-b border-white/10 select-none">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-sm shrink-0">
                  <Bot className="w-4 h-4" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-semibold text-white tracking-tight truncate">
                      Growvia AI Advisor
                    </h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                      Purchased
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate max-w-[210px]">
                    {careerTitle} · Dedicated AI Guide
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-slate-400 shrink-0">
                {messages.length > 0 && (
                  <button
                    onClick={handleClearHistory}
                    title={`Clear conversation for ${careerTitle}`}
                    disabled={isStreaming}
                    className="p-1.5 rounded-lg hover:bg-white/10 hover:text-rose-400 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-white/10">
              {/* Empty state with suggested starter questions */}
              {messages.length === 0 && !isLoadingHistory && (
                <div className="flex flex-col items-center justify-center h-full text-center px-2 py-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 shadow-inner">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 mb-1">
                    Welcome to your {careerTitle} AI Advisor!
                  </h4>
                  <p className="text-xs text-slate-400 max-w-[280px] mb-5 leading-relaxed">
                    You have lifetime access to this roadmap. Ask me anything about milestone stages, recommended colleges, exam strategies, or skill progression.
                  </p>

                  <div className="w-full space-y-2 text-left">
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 px-1">
                      Suggested questions for this roadmap
                    </p>
                    {roadmapPrompts.map((prompt, idx) => {
                      const Icon = prompt.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(prompt.text)}
                          className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/5 hover:border-emerald-500/30 text-xs text-slate-300 hover:text-white transition-all text-left group cursor-pointer"
                        >
                          <Icon className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
                          <span className="flex-1 line-clamp-1">{prompt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Message List */}
              {messages.map((msg, index) => {
                const isUser = msg.role === "user";
                const isLastAssistant =
                  !isUser && index === messages.length - 1 && isStreaming;

                return (
                  <div
                    key={msg.id || index}
                    className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isUser && (
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div
                      className={`
                        max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed
                        ${
                          isUser
                            ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-none shadow-md shadow-emerald-900/20"
                            : "bg-slate-900/80 border border-white/10 text-slate-200 rounded-bl-none shadow-sm"
                        }
                      `}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      ) : (
                        <div className="prose prose-invert prose-xs max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-strong:text-emerald-300 prose-headings:text-slate-100 prose-code:text-teal-300 prose-code:bg-slate-800/60 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
                          {msg.content ? (
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          ) : isLastAssistant ? (
                            <div className="flex items-center gap-1.5 py-1 text-slate-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]"></span>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]"></span>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"></span>
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>

                    {isUser && (
                      <div className="w-7 h-7 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                        <UserIcon className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Inline Error with Retry Button */}
              {streamError && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-950/40 border border-rose-800/40 text-rose-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">{streamError}</p>
                    <button
                      onClick={handleRetry}
                      className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/30 text-[11px] font-medium transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Retry
                    </button>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-slate-900/90 border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-end gap-2"
              >
                <div className="relative flex-1">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Ask about ${careerTitle}, milestones, skills, colleges...`}
                    rows={1}
                    disabled={isStreaming}
                    className="w-full resize-none rounded-xl bg-slate-950/80 border border-white/10 px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/40 transition-all disabled:opacity-50 max-h-24 scrollbar-none"
                    style={{ minHeight: "42px" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!input.trim() || isStreaming}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-md shadow-teal-500/20 disabled:opacity-40 disabled:hover:from-emerald-500 disabled:hover:to-teal-500 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0"
                  aria-label="Send question"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 px-1">
                <span>Shift + Enter for new line</span>
                <span>Powered by Growvia AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatWidget;

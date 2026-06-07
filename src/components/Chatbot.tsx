import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, RefreshCw, Bot, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Initialize Session and Load History
  useEffect(() => {
    // Generate or fetch session ID
    let storedSessionId = localStorage.getItem("webmantu_chat_session_id");
    if (!storedSessionId) {
      storedSessionId = `webmantu_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem("webmantu_chat_session_id", storedSessionId);
    }
    setSessionId(storedSessionId);

    // Fetch message history
    const storedHistory = localStorage.getItem("webmantu_chat_history");
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory) as Message[];
        // Re-convert dates back to Date objects
        const formattedHistory = parsedHistory.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(formattedHistory);
      } catch (e) {
        console.error("Error parsing chat history:", e);
        initializeWelcomeMessage();
      }
    } else {
      initializeWelcomeMessage();
    }
  }, []);

  // Initialize welcome message
  const initializeWelcomeMessage = () => {
    const welcomeMsg: Message = {
      id: "welcome",
      sender: "bot",
      text: "Hey there! 👋 I am **WebMantu AI Assistant**. How can I help you build your dream website, set up automations, or supercharge your business today?",
      timestamp: new Date(),
    };
    setMessages([welcomeMsg]);
    localStorage.setItem("webmantu_chat_history", JSON.stringify([welcomeMsg]));
  };

  // Scroll to bottom whenever messages or loading state changes
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && chatInputRef.current) {
      setTimeout(() => chatInputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Reset/Clear Chat
  const handleResetChat = () => {
    const newSessionId = `webmantu_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem("webmantu_chat_session_id", newSessionId);
    setSessionId(newSessionId);
    
    initializeWelcomeMessage();
    toast.success("Chat history cleared. New session started!");
  };

  // Send Message to n8n Webhook
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue("");
    
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    localStorage.setItem("webmantu_chat_history", JSON.stringify(updatedMessages));
    
    setIsLoading(true);

    // Get Webhook URL from environment variables or use fallback
    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || "";

    if (!webhookUrl || webhookUrl.includes("your-uuid-here")) {
      setTimeout(() => {
        const errorBotMessage: Message = {
          id: `bot_error_${Date.now()}`,
          sender: "bot",
          text: "⚠️ **Config Error:** It seems my connection is not set up correctly yet. Please specify a valid `VITE_N8N_WEBHOOK_URL` in your `.env` file to connect me to your n8n workflow!",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorBotMessage]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "sendMessage",
          chatInput: userText,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      
      // Resilient parsing for n8n AI Chat Agent & standard webhooks
      let botReply = "";
      if (typeof data === "string") {
        botReply = data;
      } else if (Array.isArray(data) && data[0]) {
        botReply = data[0].output || data[0].text || data[0].response || JSON.stringify(data[0]);
      } else if (data) {
        botReply = data.output || data.text || data.response || JSON.stringify(data);
      } else {
        botReply = "I received your message, but I couldn't interpret the format of the response.";
      }

      const botMessage: Message = {
        id: `bot_${Date.now()}`,
        sender: "bot",
        text: botReply,
        timestamp: new Date(),
      };

      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);
      localStorage.setItem("webmantu_chat_history", JSON.stringify(finalMessages));
    } catch (error) {
      console.error("Error communicating with n8n chatbot:", error);
      
      const errorBotMessage: Message = {
        id: `bot_err_${Date.now()}`,
        sender: "bot",
        text: "🔌 **Connection Error:** I'm having trouble reaching my brain right now. Please ensure your n8n workflow is active, and CORS is allowed in your Chat Trigger node!",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorBotMessage]);
      toast.error("Failed to connect to the AI Agent. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to render bold markdown formatting simply
  const renderMessageText = (text: string) => {
    // Basic Markdown support for **bold** and line breaks
    return text.split("\n").map((line, idx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={idx} className="block min-h-[1rem]">
          {parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={pIdx} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50",
          isOpen 
            ? "bg-[#1C1712] text-white border border-[#D4A43A]/30 rotate-90" 
            : "bg-gradient-to-r from-[#D4A43A] to-[#E7C46A] text-[#16120E] hover:from-[#E7C46A] hover:to-[#D4A43A] hover:scale-[1.08] shadow-[0_0_20px_rgba(212,164,58,0.3)] hover:shadow-[0_0_30px_rgba(212,164,58,0.6)]"
        )}
        aria-label="Toggle Chat"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <div className="relative">
            <MessageSquare size={24} className="animate-pulse" />
            <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-3rem)] h-[550px] max-h-[calc(100vh-8rem)] z-50 rounded-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right shadow-[0_0_40px_rgba(212,164,58,0.15)] border border-[#D4A43A]/20 bg-[#0B0B0C]/95 backdrop-blur-md",
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-90 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-[#16120E] px-4 py-3.5 flex items-center justify-between border-b border-[#D4A43A]/20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/60 border border-white/10">
              <Bot size={18} className="text-white" />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-[#080b16]"></span>
            </div>
            <div className="text-left">
              <h3 className="text-sm font-display font-bold text-white tracking-wide flex items-center gap-1.5">
                WebMantu Agent
                <Sparkles size={12} className="text-yellow-300 animate-pulse" />
              </h3>
              <p className="text-[10px] text-[#E7C46A]/90 font-medium">Available 24 hours for your help</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Reset Chat Button */}
            <button
              onClick={handleResetChat}
              className="p-1.5 hover:bg-white/10 text-white/80 hover:text-white rounded-lg transition-colors cursor-pointer"
              title="Reset Conversation"
            >
              <RefreshCw size={14} />
            </button>
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/10 text-white/80 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-muted flex flex-col">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex flex-col max-w-[85%] animate-in fade-in-30 slide-in-from-bottom-2 duration-200",
                msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
              )}
            >
              <div
                className={cn(
                  "px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap select-text shadow-sm font-sans",
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-[#D4A43A] to-[#E7C46A] text-[#16120E] font-medium rounded-tr-none"
                    : "bg-[#16120E] text-[#FDFBF7] border border-[#2A221A] rounded-tl-none"
                )}
              >
                {renderMessageText(msg.text)}
              </div>
              <span className="text-[9px] text-muted-foreground mt-1 px-1.5 font-medium">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex flex-col items-start max-w-[85%] mr-auto animate-in fade-in-30 duration-200">
              <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-[#16120E] text-[#FDFBF7] border border-[#2A221A] flex items-center gap-1.5 h-9">
                <span className="h-2 w-2 rounded-full bg-[#D4A43A]/80 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="h-2 w-2 rounded-full bg-[#D4A43A]/80 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="h-2 w-2 rounded-full bg-[#D4A43A]/80 animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 bg-[#0B0B0C] border-t border-[#D4A43A]/20 flex items-center gap-2 shrink-0"
        >
          <input
            ref={chatInputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            placeholder="Type your message..."
            className="flex-1 bg-[#16120E] text-[#FDFBF7] text-sm border border-[#2A221A] rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#D4A43A]/50 focus:shadow-[0_0_10px_rgba(212,164,58,0.15)] disabled:opacity-50 transition-all placeholder:text-[#8C7A6B] font-sans"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="bg-[#D4A43A] hover:bg-[#E7C46A] disabled:bg-[#2A221A] disabled:text-[#8C7A6B] text-[#16120E] rounded-xl p-2.5 transition-all flex items-center justify-center shrink-0 hover:shadow-[0_0_15px_rgba(212,164,58,0.4)] cursor-pointer active:scale-95"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </>
  );
};

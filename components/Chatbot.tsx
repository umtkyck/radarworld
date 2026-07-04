"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const quickReplies = [
  "What products do you offer?",
  "Can you build custom sensors?",
  "How does shipping work?",
  "Do you offer warranties?",
];

const botResponses: Record<string, string> = {
  greeting: "Hello! Welcome to Radar Cart. I'm here to help you find the perfect radar equipment for your needs. How can I assist you today?",
  products: "We offer two Doppler radar platforms:\n\n• True Ground Speed Sensor (ZLYTGSS01) - Non-contact ground speed for railroad wheel-slip protection and agricultural rate control\n• Ball & Swing Tracking Radar (ZLYSPT01) - Golf and baseball ball, club, and bat tracking for sports electronics\n\nBoth can be customized to your application by our engineering team. Which one fits your project?",
  shipping: "We offer free worldwide shipping on orders over $1,000! For orders under $1,000, shipping is $99.\n\n• Ships to 150+ countries\n• Processing time: 2-3 business days\n• Delivery tracking provided\n\nNeed help with a specific shipping question?",
  warranty: "All Radar Cart products come with a 2-year manufacturer warranty covering:\n\n• Manufacturing defects\n• Component failures\n• Technical support\n\nExtended warranty options are also available. Would you like more details?",
  support: "You can reach our support team through:\n\n• Email: support@radarcart.com\n• Sales: sales@radarcart.com\n\nOur team is available Monday-Friday, 9am-6pm EST. How else can I help?",
  price: "Our current pricing:\n\n• True Ground Speed Sensor (ZLYTGSS01): $245\n• Ball & Swing Tracking Radar (ZLYSPT01): $389\n\nVolume and OEM pricing is available - contact sales@radarcart.com for a quote. Custom variants are priced per project.",
  custom: "Yes - custom engineering is our core strength! We adapt both platforms to your application:\n\n• Custom firmware and detection profiles\n• Interfaces: Pulse, CAN, RS-485, UART, SPI, or proprietary\n• Custom housings and mounting options\n• Antenna and beam pattern design\n\nTell our engineers about your project at sales@radarcart.com.",
  default: "I'm here to help! You can ask me about:\n\n• Our ground speed and sports tracking radars\n• Custom engineering options\n• Shipping and delivery\n• Warranties and support\n• Pricing information\n\nOr feel free to ask any specific question about radar equipment!",
};

function getBotResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return botResponses.greeting;
  }
  if (lowerMessage.includes("custom") || lowerMessage.includes("oem") || lowerMessage.includes("engineer") || lowerMessage.includes("integrat")) {
    return botResponses.custom;
  }
  if (lowerMessage.includes("product") || lowerMessage.includes("offer") || lowerMessage.includes("sell") || lowerMessage.includes("radar")) {
    return botResponses.products;
  }
  if (lowerMessage.includes("ship") || lowerMessage.includes("deliver") || lowerMessage.includes("international")) {
    return botResponses.shipping;
  }
  if (lowerMessage.includes("warranty") || lowerMessage.includes("guarantee") || lowerMessage.includes("return")) {
    return botResponses.warranty;
  }
  if (lowerMessage.includes("support") || lowerMessage.includes("contact") || lowerMessage.includes("help") || lowerMessage.includes("email") || lowerMessage.includes("phone")) {
    return botResponses.support;
  }
  if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("expensive") || lowerMessage.includes("cheap") || lowerMessage.includes("budget")) {
    return botResponses.price;
  }

  return botResponses.default;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: botResponses.greeting,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        text: getBotResponse(text),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
          isOpen
            ? "bg-zinc-800 hover:bg-zinc-700"
            : "bg-emerald-500 hover:bg-emerald-600"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageCircle size={24} className="text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-emerald-500/10 border-b border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Bot size={20} className="text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Radar Cart Support</h3>
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px] min-h-[300px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[85%] ${
                    message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === "user"
                        ? "bg-emerald-500/20"
                        : "bg-white/10"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User size={16} className="text-emerald-400" />
                    ) : (
                      <Bot size={16} className="text-zinc-400" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-emerald-500 text-white"
                        : "bg-white/5 text-zinc-300"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Bot size={16} className="text-zinc-400" />
                  </div>
                  <div className="bg-white/5 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-full border border-white/10 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-10 h-10 bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-700 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors"
              >
                <Send size={18} className="text-white" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

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
  shipping: "We ship across North America (US, Canada, Mexico) with your choice of carrier at checkout:\n\n• USPS Priority Mail - from $39\n• UPS Ground / FedEx Ground - from $49\n• UPS 2nd Day Air and FedEx Priority Overnight for express delivery\n\nOrders over $1,000 ship free (ground). Processing time is 2-3 business days with full tracking. Need help with a specific shipping question?",
  warranty: "All Radar Cart products come with a 2-year manufacturer warranty covering:\n\n• Manufacturing defects\n• Component failures\n• Technical support\n\nExtended warranty options are also available. Would you like more details?",
  support: "You can reach our support team through:\n\n• Phone: +1 (224) 629-9664\n• Email: umtkyck@gmail.com\n• Address: 1109 W Bauer Rd, Naperville, IL 60563, US\n\nOur team is available Monday-Friday, 9am-6pm CT. How else can I help?",
  price: "Our current pricing:\n\n• True Ground Speed Sensor (ZLYTGSS01): $245\n• Ball & Swing Tracking Radar (ZLYSPT01): $389\n\nVolume and OEM pricing is available - contact umtkyck@gmail.com for a quote. Custom variants are priced per project.",
  payment: "We accept two payment methods:\n\n• Credit / debit card - secure checkout via Stripe\n• Bank transfer (ACH or wire, domestic and international) - payable to Melis Electronics LLC\n\nFor bank transfers, select Bank Transfer at checkout to see the remittance details, or email umtkyck@gmail.com for a pro forma invoice.",
  custom: "Yes - custom engineering is our core strength! We adapt both platforms to your application:\n\n• Custom firmware and detection profiles\n• Interfaces: Pulse, CAN, RS-485, UART, SPI, or proprietary\n• Custom housings and mounting options\n• Antenna and beam pattern design\n\nTell our engineers about your project at umtkyck@gmail.com.",
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
  if (lowerMessage.includes("pay") || lowerMessage.includes("wire") || lowerMessage.includes("bank") || lowerMessage.includes("ach") || lowerMessage.includes("invoice") || lowerMessage.includes("transfer")) {
    return botResponses.payment;
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
            ? "bg-slate-700 hover:bg-slate-600"
            : "bg-slate-900 hover:bg-slate-800"
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
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-slate-50 border-b border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Radar Cart Support</h3>
                <p className="text-xs text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
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
                        ? "bg-slate-900"
                        : "bg-slate-100"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <Bot size={16} className="text-slate-500" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-700"
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
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <Bot size={16} className="text-slate-500" />
                  </div>
                  <div className="bg-slate-100 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
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
                    className="text-xs px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-full border border-slate-200 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 text-sm"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-10 h-10 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors"
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

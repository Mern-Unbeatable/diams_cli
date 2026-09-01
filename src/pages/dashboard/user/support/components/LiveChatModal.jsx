import { Headset, MessageSquare, Send, X } from "lucide-react";
import { useState } from "react";

export const LiveChatModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello Thomas! 👋 I'm NovaSky's 24/7 AI Assistant. How can I help you today?",
      time: "Just now",
    },
  ]);
  const [input, setInput] = useState("");

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: input.trim(),
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Thank you for reaching out! A live Swiss support specialist is also available if you need further assistance with your account.",
        time: "Just now",
      };
      setMessages((prev) => [...prev, botReply]);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="flex flex-col h-[520px] w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Chat Header */}
        <div className="flex items-center justify-between bg-[#00183c] px-4 py-3 text-white">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-btnPrimary text-white shadow">
              <Headset size={16} />
            </span>
            <div>
              <p className="text-xs font-bold leading-tight">
                NovaSky Live Support
              </p>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-white/70">Online • 24/7</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs bg-slate-50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 shadow-xs ${
                  m.sender === "user"
                    ? "bg-btnPrimary text-white rounded-br-xs"
                    : "bg-white text-primary border border-gray-200/80 rounded-bl-xs"
                }`}
              >
                <p className="leading-relaxed">{m.text}</p>
                <span
                  className={`block text-[9px] mt-1 ${
                    m.sender === "user" ? "text-white/70 text-right" : "text-primary/40"
                  }`}
                >
                  {m.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 border-t border-gray-100 bg-white p-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 rounded-xl border border-gray-200 px-3.5 py-2 text-xs font-medium text-primary focus:border-btnPrimary focus:outline-none"
          />
          <button
            type="submit"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-btnPrimary text-white shadow-xs hover:bg-btnPrimary/90 transition-colors"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
};

import { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex w-full max-w-4xl mx-auto p-4"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about the Bhagavad Gita..."
        disabled={disabled}
        className="w-full px-4 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gita-soft focus:border-gita-primary focus:ring-1 focus:ring-gita-primary outline-none transition-all duration-200"
      />
      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-gita-primary hover:text-gita-accent transition-colors disabled:opacity-50"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
};
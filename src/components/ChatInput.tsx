import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export const ChatInput = ({ onSend, disabled, value, onChange }: ChatInputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSend(value);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex w-full max-w-3xl mx-auto p-4"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ask about the Bhagavad Gita..."
        disabled={disabled}
        className="w-full px-6 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 dark:text-white backdrop-blur-sm border border-gita-soft dark:border-gray-700 focus:border-gita-primary focus:ring-1 focus:ring-gita-primary outline-none transition-all duration-200"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-gita-primary dark:text-gita-light hover:text-gita-accent transition-colors disabled:opacity-50"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
};
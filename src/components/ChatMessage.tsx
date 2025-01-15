import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  className?: string;
}

export const ChatMessage = ({ content, isUser, className }: ChatMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start",
        className
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2 backdrop-blur-sm",
          isUser
            ? "bg-gita-primary/90 text-white dark:bg-gita-primary/70"
            : "bg-white/80 border border-gita-soft dark:bg-gray-800/80 dark:border-gray-700 dark:text-white"
        )}
      >
        <p className="text-sm md:text-base leading-relaxed">{content}</p>
      </div>
    </motion.div>
  );
};
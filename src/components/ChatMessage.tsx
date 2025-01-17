import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Bot, User, BookOpen, Scroll } from "lucide-react";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  className?: string;
}

export const ChatMessage = ({ content, isUser, className }: ChatMessageProps) => {
  const highlightContent = (text: string) => {
    const chapterPattern = /Chapter (\d+)/gi;
    const versePattern = /Verse (\d+)/gi;
    const sourcePattern = /Source: ([^.]+)/gi;

    let formattedText = text
      .replace(chapterPattern, '<span class="text-gita-primary font-semibold">$&</span>')
      .replace(versePattern, '<span class="text-gita-primary font-semibold">$&</span>')
      .replace(sourcePattern, '<span class="text-gita-accent italic">$&</span>');

    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex w-full items-start gap-3",
        isUser ? "justify-end" : "justify-start",
        className
      )}
    >
      {!isUser && (
        <div className="flex gap-2">
          <div className="flex-shrink-0 rounded-full bg-gita-soft p-2">
            <Bot className="h-5 w-5 text-gita-primary" />
          </div>
          <div className="flex-shrink-0 rounded-full bg-gita-soft p-2">
            <BookOpen className="h-5 w-5 text-gita-primary" />
          </div>
          <div className="flex-shrink-0 rounded-full bg-gita-soft p-2">
            <Scroll className="h-5 w-5 text-gita-primary" />
          </div>
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2 backdrop-blur-sm",
          isUser
            ? "bg-gita-primary/90 text-white dark:bg-gita-primary/70"
            : "bg-white/80 border border-gita-soft dark:bg-gray-800/80 dark:border-gray-700 dark:text-white"
        )}
      >
        <p className="text-sm md:text-base leading-relaxed">
          {highlightContent(content)}
        </p>
      </div>
      {isUser && (
        <div className="flex-shrink-0 rounded-full bg-gita-soft p-2">
          <User className="h-5 w-5 text-gita-primary" />
        </div>
      )}
    </motion.div>
  );
};
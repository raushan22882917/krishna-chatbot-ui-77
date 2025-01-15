import { cn } from "@/lib/utils";

export const TypingIndicator = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex space-x-2 p-3", className)}>
      <div className="w-2 h-2 rounded-full bg-gita-primary animate-bounce [animation-delay:-0.3s]" />
      <div className="w-2 h-2 rounded-full bg-gita-primary animate-bounce [animation-delay:-0.15s]" />
      <div className="w-2 h-2 rounded-full bg-gita-primary animate-bounce" />
    </div>
  );
};
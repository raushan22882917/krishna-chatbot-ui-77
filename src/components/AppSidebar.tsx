import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { MessageCircle, MessageSquare } from "lucide-react";
import { useState } from "react";
import { FeedbackDialog } from "./FeedbackDialog";

interface AppSidebarProps {
  onQuestionClick: (question: string) => void;
}

export const AppSidebar = ({ onQuestionClick }: AppSidebarProps) => {
  const { open } = useSidebar();
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = [
    "What is karma yoga?",
    "How can I find inner peace?",
    "What does Krishna say about duty?",
    "How to overcome anger?",
    "What is the purpose of life?",
    "How to practice detachment?",
    "What is dharma?",
    "How to achieve moksha?",
  ];

  return (
    <>
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen pt-16 transition-transform bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-r border-gita-soft dark:border-gray-700 w-64",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <ScrollArea className="flex flex-col h-full px-4 pb-4">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-4 px-4 text-lg font-semibold text-gita-primary dark:text-gita-light">
                Suggested Questions
              </h2>
              <div className="space-y-2">
                {questions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-sm text-gita-primary dark:text-gita-light hover:bg-gita-soft/50 h-auto py-2 px-4"
                    onClick={() => onQuestionClick(question)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-left">{question}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-auto px-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setShowFeedback(true)}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              See User Feedback
            </Button>
          </div>
        </ScrollArea>
      </aside>
      <FeedbackDialog open={showFeedback} onOpenChange={setShowFeedback} />
    </>
  );
};
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  onQuestionClick: (question: string) => void;
}

export const AppSidebar = ({ onQuestionClick }: AppSidebarProps) => {
  const { isOpen } = useSidebar();

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
    <aside
      className={cn(
        "fixed top-0 left-0 z-40 h-screen pt-16 transition-transform bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-r border-gita-soft dark:border-gray-700",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <ScrollArea className="flex flex-col h-full px-4 pb-4">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold text-gita-primary dark:text-gita-light">
              Suggested Questions
            </h2>
            <div className="space-y-1">
              {questions.map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-gita-primary dark:text-gita-light hover:bg-gita-soft/50"
                  onClick={() => onQuestionClick(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};
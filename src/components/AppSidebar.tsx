import { useState } from "react";
import { format } from "date-fns";
import { Moon, Sun, MessageCircle } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  onQuestionClick: (question: string) => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const SUGGESTED_QUESTIONS = [
  "What is karma yoga?",
  "How to find inner peace?",
  "What is the purpose of life?",
  "How to overcome anger?",
  "What is dharma?",
  "How to achieve moksha?",
];

export function AppSidebar({ onQuestionClick, isDarkMode, onThemeToggle }: AppSidebarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useState(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <img src="/krishna-logo.png" alt="Krishna Logo" className="w-8 h-8" />
          <h1 className="text-lg font-semibold text-gita-primary">Gita Guide</h1>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gita-neutral">
            {format(currentTime, "MMM d, yyyy h:mm a")}
          </span>
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-full hover:bg-gita-soft transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-gita-primary" />
            ) : (
              <Moon className="w-4 h-4 text-gita-primary" />
            )}
          </button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Suggested Questions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SUGGESTED_QUESTIONS.map((question) => (
                <SidebarMenuItem key={question}>
                  <SidebarMenuButton
                    onClick={() => onQuestionClick(question)}
                    className="w-full text-left"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{question}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
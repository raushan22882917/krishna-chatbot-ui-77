import { useState, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { TypingIndicator } from "@/components/TypingIndicator";
import { BackgroundVideo } from "@/components/BackgroundVideo";
import { SuggestedQuestions } from "@/components/SuggestedQuestions";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Navbar } from "@/components/Navbar";

interface Message {
  content: string;
  isUser: boolean;
}

const SUGGESTED_QUESTIONS = [
  "What is the main message of Bhagavad Gita?",
  "How can I find inner peace?",
  "What is karma yoga?",
  "How to overcome anger?",
];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleSendMessage = async (content: string) => {
    setMessages((prev) => [...prev, { content, isUser: true }]);
    setIsTyping(true);
    setInputMessage("");
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          content: "This is a simulated response from Krishna's teachings. In a real implementation, this would be connected to an AI backend.",
          isUser: false,
        },
      ]);
    }, 2000);
  };

  const handleQuestionClick = (question: string) => {
    setInputMessage(question);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar
          onQuestionClick={handleQuestionClick}
          isDarkMode={isDarkMode}
          onThemeToggle={toggleTheme}
        />
        <main className="flex-1 relative">
          <Navbar />
          {messages.length === 0 && <BackgroundVideo />}
          <div className="min-h-screen relative z-10 pt-16">
            <div className="max-w-4xl mx-auto pt-8 pb-24">
              {messages.length === 0 ? (
                <WelcomeScreen />
              ) : (
                <div className="space-y-6 px-4">
                  <div className="space-y-6 max-h-[60vh] overflow-y-auto px-4 scrollbar-thin scrollbar-thumb-gita-soft scrollbar-track-transparent">
                    {messages.map((message, index) => (
                      <ChatMessage
                        key={index}
                        content={message.content}
                        isUser={message.isUser}
                      />
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <TypingIndicator className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gita-soft" />
                      </div>
                    )}
                  </div>
                  {!isTyping && messages.length > 0 && (
                    <SuggestedQuestions
                      questions={SUGGESTED_QUESTIONS}
                      onQuestionClick={handleQuestionClick}
                    />
                  )}
                </div>
              )}
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent pt-12 pb-4 dark:from-gray-900">
              <ChatInput 
                onSend={handleSendMessage} 
                disabled={isTyping} 
                value={inputMessage}
                onChange={setInputMessage}
              />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
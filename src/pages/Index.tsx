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
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleSendMessage = async (content: string) => {
    try {
      setMessages((prev) => [...prev, { content, isUser: true }]);
      setIsTyping(true);
      setInputMessage("");

      const response = await fetch("https://samay-ai-twgu.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        mode: "cors",
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          content: data.response || "I apologize, but I couldn't process your request at the moment.",
          isUser: false,
        },
      ]);
    } catch (error) {
      setIsTyping(false);
      let errorMessage = "Failed to get response. Please try again later.";
      
      if (error instanceof Error) {
        if (error.message.includes("Failed to fetch")) {
          errorMessage = "Unable to connect to the server. Please check your internet connection or try again later.";
        } else if (error.message.includes("HTTP error")) {
          errorMessage = "The server is currently unavailable. Please try again in a few minutes.";
        }
        console.error("Error details:", error);
      }

      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    }
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
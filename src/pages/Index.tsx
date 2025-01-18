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

interface APIResponse {
  response: string;
  suggested_questions: string[];
  Book_Name?: string;
  Chapter?: string;
  verse?: string;
  translation?: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSendMessage = async (content: string) => {
    try {
      setMessages((prev) => [...prev, { content, isUser: true }]);
      setIsTyping(true);
      setInputMessage("");

      const response = await fetch("https://samay-ai-twgu.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          query: content,
          generate_suggestions: true, // Add this flag to indicate we want related questions
          context: "bhagavad_gita_yoga_sutras" // Add context to get relevant suggestions
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, details: ${errorData}`);
      }

      const data: APIResponse = await response.json();
      
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          content: data.response || "I apologize, but I couldn't process your request at the moment.",
          isUser: false,
        },
      ]);

      // Update suggested questions from API response
      if (data.suggested_questions && Array.isArray(data.suggested_questions)) {
        // Filter questions to ensure they're related to Gita or Yoga Sutras
        const relevantQuestions = data.suggested_questions.filter(question => 
          question.toLowerCase().includes('gita') || 
          question.toLowerCase().includes('krishna') ||
          question.toLowerCase().includes('yoga') ||
          question.toLowerCase().includes('dharma') ||
          question.toLowerCase().includes('karma')
        );
        
        // Take only the first 3 relevant questions
        const newQuestions = Array.from(new Set(relevantQuestions)).slice(0, 3);
        setSuggestedQuestions(newQuestions.length > 0 ? newQuestions : [
          "What does the Gita say about this topic?",
          "How does this relate to Karma Yoga?",
          "Can you explain this from Krishna's perspective?"
        ]);
      }
    } catch (error) {
      setIsTyping(false);
      let errorMessage = "Failed to get response. Please try again later.";
      
      if (error instanceof Error) {
        if (error.message.includes("Failed to fetch")) {
          errorMessage = "Unable to connect to the server. Please check your internet connection or try again later.";
        } else {
          console.error("Error details:", error);
          errorMessage = "The server is currently unavailable. Please try again in a few minutes.";
        }
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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar onQuestionClick={handleQuestionClick} />
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
                  {!isTyping && messages.length > 0 && suggestedQuestions.length > 0 && (
                    <SuggestedQuestions
                      questions={suggestedQuestions}
                      onQuestionClick={handleQuestionClick}
                    />
                  )}
                </div>
              )}
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent pt-12 pb-4">
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
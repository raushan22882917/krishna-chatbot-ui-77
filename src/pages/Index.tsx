import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { TypingIndicator } from "@/components/TypingIndicator";

interface Message {
  content: string;
  isUser: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (content: string) => {
    // Add user message
    setMessages((prev) => [...prev, { content, isUser: true }]);
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          content: "This is a simulated response. In a real implementation, this would be connected to an AI backend.",
          isUser: false,
        },
      ]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gita-soft/20">
      <div className="max-w-4xl mx-auto pt-8 pb-24">
        {messages.length === 0 ? (
          <WelcomeScreen />
        ) : (
          <div className="space-y-6 px-4">
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
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent pt-12 pb-4">
        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};

export default Index;
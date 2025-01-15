import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

export const SuggestedQuestions = ({
  questions,
  onQuestionClick,
}: SuggestedQuestionsProps) => {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gita-neutral">Suggested questions:</p>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onQuestionClick(question)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gita-primary bg-white/80 hover:bg-white rounded-full border border-gita-soft hover:border-gita-primary transition-colors duration-200"
          >
            <MessageCircle className="w-4 h-4" />
            {question}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
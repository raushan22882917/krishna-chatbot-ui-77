import { motion } from "framer-motion";
import { BookOpen, MessageCircle } from "lucide-react";

export const WelcomeScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center space-y-8 px-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-24 h-24 mx-auto rounded-full bg-gita-soft/50 backdrop-blur-sm flex items-center justify-center"
      >
        <BookOpen className="w-12 h-12 text-gita-primary" />
      </motion.div>
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-gray-800">
          Welcome to Bhagavad Gita AI
        </h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Ask questions about the sacred text and receive guidance based on its
          timeless wisdom.
        </p>
        <div className="flex items-center justify-center gap-2 text-gita-neutral">
          <MessageCircle className="w-5 h-5" />
          <span>Start by asking a question below</span>
        </div>
      </div>
    </motion.div>
  );
};
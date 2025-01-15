import { motion } from "framer-motion";

export const WelcomeScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center space-y-6"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-24 h-24 mx-auto rounded-full bg-gita-soft/50 backdrop-blur-sm flex items-center justify-center"
      >
        <img
          src="/placeholder.svg"
          alt="Gita Icon"
          className="w-16 h-16 object-contain"
        />
      </motion.div>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome to Bhagavad Gita AI
        </h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Ask questions about the sacred text and receive guidance based on its
          timeless wisdom.
        </p>
      </div>
    </motion.div>
  );
};
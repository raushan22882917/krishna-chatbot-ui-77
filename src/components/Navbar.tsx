import { Menu, MessageSquare } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const handleSubmitFeedback = async () => {
    try {
      const { error } = await supabase
        .from('feedback')
        .insert([
          { content: feedback }
        ]);

      if (error) throw error;

      toast({
        title: "Thank you for your feedback!",
        description: "Your feedback has been submitted successfully.",
      });

      setFeedback("");
      setIsOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gita-soft dark:border-gray-700">
      <div className="flex items-center justify-between px-2 sm:px-4 py-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={toggleSidebar}
            className="p-1.5 sm:p-2 hover:bg-gita-soft/50 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gita-primary dark:text-gita-light" />
          </button>
          <div className="flex items-center gap-1 sm:gap-2">
            <img src="download.png" alt="Krishna Logo" className="w-6 h-6 sm:w-8 sm:h-8" />
            <h1 className="text-base sm:text-lg font-semibold text-gita-primary dark:text-gita-light hidden sm:block">
              Gita Guide
            </h1>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(true)}
          className="p-1.5 sm:p-2 hover:bg-gita-soft/50 rounded-lg transition-colors"
        >
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-gita-primary dark:text-gita-light" />
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] mx-4">
          <DialogHeader>
            <DialogTitle>Share Your Feedback</DialogTitle>
            <DialogDescription>
              We value your thoughts and suggestions. Please share your feedback with us.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[100px]"
            />
            <Button onClick={handleSubmitFeedback} className="w-full">
              Submit Feedback
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};
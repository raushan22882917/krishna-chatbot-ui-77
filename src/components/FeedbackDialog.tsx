import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Feedback {
  id: string;
  content: string;
  created_at: string;
}

export const FeedbackDialog = ({ open, onOpenChange }: FeedbackDialogProps) => {
  const { data: feedbacks, isLoading } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Feedback[];
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gita-primary dark:text-gita-light">
            User Feedback
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4">
            {isLoading ? (
              <p className="text-center text-gita-primary dark:text-gita-light">
                Loading feedback...
              </p>
            ) : feedbacks?.length === 0 ? (
              <p className="text-center text-gita-primary dark:text-gita-light">
                No feedback yet
              </p>
            ) : (
              feedbacks?.map((feedback) => (
                <div
                  key={feedback.id}
                  className="rounded-lg border border-gita-soft p-4 dark:border-gray-700"
                >
                  <p className="text-gita-primary dark:text-gita-light">
                    {feedback.content}
                  </p>
                  <p className="mt-2 text-sm text-gita-primary/70 dark:text-gita-light/70">
                    {new Date(feedback.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
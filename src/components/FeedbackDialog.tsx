import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ViewFullResponseDialog } from "./ViewFullResponseDialog";

interface FeedbackDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FeedbackEntry {
  id: string;
  content: string;
  created_at: string;
}

export const FeedbackDialog = ({ isOpen, onClose }: FeedbackDialogProps) => {
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);

  const { data: feedbackEntries, isLoading } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as FeedbackEntry[];
    },
  });

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              User Feedback
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {isLoading ? (
              <p className="text-center text-muted-foreground">Loading feedback...</p>
            ) : feedbackEntries?.length === 0 ? (
              <p className="text-center text-muted-foreground">No feedback yet</p>
            ) : (
              feedbackEntries?.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(entry.created_at), "PPpp")}
                    </p>
                  </div>
                  <p className="text-sm line-clamp-3">{entry.content}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={() => setSelectedFeedback(entry.content)}
                  >
                    View Full Response
                  </Button>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      <ViewFullResponseDialog
        isOpen={!!selectedFeedback}
        onClose={() => setSelectedFeedback(null)}
        content={selectedFeedback || ""}
      />
    </>
  );
};
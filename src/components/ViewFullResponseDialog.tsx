import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ViewFullResponseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

export const ViewFullResponseDialog = ({
  isOpen,
  onClose,
  content,
}: ViewFullResponseDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Full Feedback Response</DialogTitle>
        </DialogHeader>
        <div className="mt-4 text-sm leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
};
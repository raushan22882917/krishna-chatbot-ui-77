import { cn } from "@/lib/utils";

export const BackgroundVideo = () => {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute min-h-full min-w-full object-cover w-full h-full opacity-40 dark:opacity-30"
      >
        <source src="krishna.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-gita-soft/70 to-white/95 dark:from-gray-900/70 dark:to-gray-900/95 backdrop-blur-sm" />
    </div>
  );
};
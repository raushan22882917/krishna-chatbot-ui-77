import { cn } from "@/lib/utils";

export const BackgroundVideo = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute min-h-full min-w-full object-cover opacity-20"
      >
        <source src="/krishna-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-gita-soft/50 to-white/95 backdrop-blur-sm" />
    </div>
  );
};
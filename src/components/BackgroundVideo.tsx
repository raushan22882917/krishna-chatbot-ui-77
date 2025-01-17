export const BackgroundVideo = () => {
  return (
    <div className="fixed inset-0 z-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-40"
        style={{ filter: "brightness(0.7)" }}
      >
        <source src="/krishna.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
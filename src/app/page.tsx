"use client";

import { useState, useRef, useEffect } from "react";
import { TbDeviceGamepad2 } from "react-icons/tb";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPacman, setShowPacman] = useState(false);
  const [showRefresh, setShowRefresh] = useState(false);
  const [hiddenIcons, setHiddenIcons] = useState<string[]>([]);
  const [pacmanPosition, setPacmanPosition] = useState(0);
  const [hiddenDots, setHiddenDots] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const iconPositions = {
    wechat: 0,
    linkedin: 1,
    instagram: 2,
    line: 3,
    gamepad: 4,
  };

  useEffect(() => {
    if (!showPacman) return;

    const animationDuration = 8000; // 8 seconds
    const startTime = Date.now();
    const hiddenIconsSet = new Set<string>();
    const hiddenDotsSet = new Set<number>();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / animationDuration;
      const screenWidth = window.innerWidth;
      const pacmanX = -100 + (screenWidth + 200) * progress;

      setPacmanPosition(pacmanX);

      // Check collision with each icon
      const centerX = screenWidth / 2;
      const isMobile = screenWidth < 640; // sm breakpoint
      const iconWidth = isMobile ? 48 : 64; // 12 = 48px, 16 = 64px
      const gap = isMobile ? 12 : 24; // gap-3 = 12px, gap-6 = 24px
      const totalWidth = (iconWidth + gap) * 5 - gap; // 5 total items
      const startX = centerX - totalWidth / 2;
      const pacmanWidth = isMobile ? 64 : 96; // w-16 = 64px, w-24 = 96px
      const pacmanCenterX = pacmanX + pacmanWidth / 2;

      Object.entries(iconPositions).forEach(([icon, index]) => {
        const iconLeftX = startX + (iconWidth + gap) * index;
        const iconCenterX = iconLeftX + iconWidth / 2;

        // Check if icon center has reached pacman's center
        if (
          Math.abs(iconCenterX - pacmanCenterX) <= iconWidth / 2 &&
          !hiddenIconsSet.has(icon)
        ) {
          hiddenIconsSet.add(icon);
          setHiddenIcons((prev) => [...prev, icon]);
        }
      });

      // Check collision with white dots (left and right of icons)
      const dotSize = isMobile ? 20 : 28; // w-5 h-5 = 20px, w-7 h-7 = 28px
      const dotGap = gap; // Same as icon gap
      const totalIconsWidth = (iconWidth + gap) * 5 - gap;
      const leftDotsCount = Math.floor((screenWidth / 2 - totalIconsWidth / 2 - gap) / (dotSize + dotGap));
      const rightDotsCount = leftDotsCount;

      // Calculate positions similar to rendering
      const iconSpacerWidth = totalIconsWidth + gap * 2;
      const totalDotsAndIconsWidth = leftDotsCount * (dotSize + dotGap) + iconSpacerWidth + rightDotsCount * (dotSize + dotGap);
      const containerStartX = centerX - totalDotsAndIconsWidth / 2;

      // Left side dots
      for (let i = 0; i < leftDotsCount; i++) {
        const dotX = containerStartX + i * (dotSize + dotGap);
        const dotCenterX = dotX + dotSize / 2;

        if (
          Math.abs(pacmanCenterX - dotCenterX) <= dotSize / 2 &&
          !hiddenDotsSet.has(i)
        ) {
          hiddenDotsSet.add(i);
          setHiddenDots((prev) => [...prev, i]);
        }
      }

      // Right side dots
      const rightSideStartX = containerStartX + leftDotsCount * (dotSize + dotGap) + iconSpacerWidth;
      for (let i = 0; i < rightDotsCount; i++) {
        const dotX = rightSideStartX + i * (dotSize + dotGap);
        const dotCenterX = dotX + dotSize / 2;
        const dotIndex = leftDotsCount + i;

        if (
          Math.abs(pacmanCenterX - dotCenterX) <= dotSize / 2 &&
          !hiddenDotsSet.has(dotIndex)
        ) {
          hiddenDotsSet.add(dotIndex);
          setHiddenDots((prev) => [...prev, dotIndex]);
        }
      }
    }, 16);

    return () => clearInterval(interval);
  }, [showPacman]);

  const handlePlay = () => {
    setIsPlaying(true);
    setShowRefresh(false);
    setHiddenIcons([]);
    setPacmanPosition(0);
    audioRef.current?.play();

    // Show Pacman after 5 seconds
    setTimeout(() => {
      setShowPacman(true);
    }, 5000);

    // Show refresh button after sound ends (13 seconds total)
    setTimeout(() => {
      setIsPlaying(false);
      setShowPacman(false);
      setShowRefresh(true);
    }, 13000);
  };

  const handleRefresh = () => {
    setShowRefresh(false);
    setHiddenIcons([]);
    setHiddenDots([]);
    setPacmanPosition(0);
  };

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Pacman GIF Animation */}
      {showPacman && (
        <div
          className="fixed top-1/2 -translate-y-1/2 z-50 transition-none"
          style={{ left: `${pacmanPosition}px` }}
        >
          <img src="/pacman.gif" alt="Pacman" className="w-16 h-16 sm:w-24 sm:h-24" />
        </div>
      )}

      {/* Refresh Button */}
      {showRefresh && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <button
            onClick={handleRefresh}
            className="group relative w-20 h-20 flex items-center justify-center bg-zinc-900 rounded-full border-2 border-zinc-700 hover:border-zinc-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
          >
            <svg
              className="w-10 h-10 text-zinc-400 group-hover:text-blue-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <div className="absolute inset-0 rounded-full bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors" />
          </button>
        </div>
      )}

      {/* Audio Element */}
      <audio ref={audioRef} src="/pacman.mp3" />

      {/* White Dots in the same row as icons, to the left and right */}
      {isPlaying && (() => {
        const screenWidth = window.innerWidth;
        const isMobile = screenWidth < 640;
        const iconWidth = isMobile ? 48 : 64;
        const gap = isMobile ? 12 : 24;
        const totalIconsWidth = (iconWidth + gap) * 5 - gap; // 5 icons with gaps
        const dotSize = isMobile ? 20 : 28;
        const dotGap = gap; // Same as icon gap
        const leftDotsCount = Math.floor((screenWidth / 2 - totalIconsWidth / 2 - gap) / (dotSize + dotGap));

        return (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none scale-75 sm:scale-100">
            <div className="flex gap-3 sm:gap-6 items-center">
              {/* Left side dots */}
              {Array.from({ length: leftDotsCount }).map((_, i) => (
                <div
                  key={`left-${i}`}
                  className={`w-5 h-5 sm:w-7 sm:h-7 bg-white rounded-full ${hiddenDots.includes(i) ? "opacity-0" : "opacity-100"}`}
                />
              ))}

              {/* Spacer for icons */}
              <div style={{ width: `${totalIconsWidth + gap * 2}px` }} />

              {/* Right side dots */}
              {Array.from({ length: leftDotsCount }).map((_, i) => (
                <div
                  key={`right-${i}`}
                  className={`w-5 h-5 sm:w-7 sm:h-7 bg-white rounded-full ${hiddenDots.includes(leftDotsCount + i) ? "opacity-0" : "opacity-100"}`}
                />
              ))}
            </div>
          </div>
        );
      })()}

      <div className="flex gap-3 sm:gap-6 items-center scale-75 sm:scale-100">
        {/* WeChat */}
        <div className={`group relative ${hiddenIcons.includes("wechat") ? "opacity-0" : "opacity-100"}`}>
          <div className={`relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-zinc-900 rounded-full border group-hover:shadow-lg group-hover:shadow-green-500/20 ${
            isPlaying
              ? "border-green-400 shadow-lg shadow-green-500/20"
              : "border-zinc-800 group-hover:border-zinc-700"
          }`}>
              <svg
                className={`w-5 h-5 sm:w-7 sm:h-7 transition-colors ${
                  isPlaying ? "text-green-400" : "text-zinc-400 group-hover:text-green-400"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
              </svg>
              <div
                className={`absolute inset-0 rounded-full transition-colors ${
                  isPlaying
                    ? "bg-green-500/10"
                    : "bg-green-500/0 group-hover:bg-green-500/10"
                }`}
              />
            </div>
          {/* Username that slides down */}
          {!isPlaying && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-500 ease-out">
              <div className="h-16 flex items-center justify-center bg-zinc-900 rounded-2xl border border-zinc-800 px-4 whitespace-nowrap">
                <span className="text-zinc-400 text-sm font-bold tracking-wide">louisdelozier</span>
              </div>
            </div>
          )}
        </div>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/louis-delozier"
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-zinc-900 rounded-full border hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20 ${
            isPlaying
              ? "border-blue-400 shadow-lg shadow-blue-500/20"
              : "border-zinc-800 hover:border-zinc-700"
          } ${hiddenIcons.includes("linkedin") ? "opacity-0" : "opacity-100"}`}
        >
            <svg
              className={`w-5 h-5 sm:w-7 sm:h-7 transition-colors ${
                isPlaying ? "text-blue-400" : "text-zinc-400 group-hover:text-blue-400"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <div
              className={`absolute inset-0 rounded-full transition-colors ${
                isPlaying ? "bg-blue-500/10" : "bg-blue-500/0 group-hover:bg-blue-500/10"
              }`}
            />
          </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/louisdelozier"
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-zinc-900 rounded-full border hover:scale-110 hover:shadow-lg hover:shadow-pink-500/20 ${
            isPlaying
              ? "border-pink-400 shadow-lg shadow-pink-500/20"
              : "border-zinc-800 hover:border-zinc-700"
          } ${hiddenIcons.includes("instagram") ? "opacity-0" : "opacity-100"}`}
        >
            <svg
              className={`w-5 h-5 sm:w-7 sm:h-7 transition-colors ${
                isPlaying ? "text-pink-400" : "text-zinc-400 group-hover:text-pink-400"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <div
              className={`absolute inset-0 rounded-full transition-colors ${
                isPlaying ? "bg-pink-500/10" : "bg-pink-500/0 group-hover:bg-pink-500/10"
              }`}
            />
          </a>

        {/* LINE */}
        <div className={`group relative ${hiddenIcons.includes("line") ? "opacity-0" : "opacity-100"}`}>
          {/* Username that slides up - T shape top */}
          {!isPlaying && (
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-500 ease-out">
              <div className="h-16 flex items-center justify-center bg-zinc-900 rounded-2xl border border-zinc-800 px-4 whitespace-nowrap">
                <span className="text-zinc-400 text-sm font-bold tracking-wide">louisdelozier</span>
              </div>
            </div>
          )}

          <div
            className={`relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-zinc-900 rounded-full border group-hover:shadow-lg group-hover:shadow-emerald-500/20 ${
              isPlaying
                ? "border-emerald-400 shadow-lg shadow-emerald-500/20"
                : "border-zinc-800 group-hover:border-zinc-700"
            }`}
          >
            <svg
              className={`w-5 h-5 sm:w-7 sm:h-7 transition-colors ${
                isPlaying ? "text-emerald-400" : "text-zinc-400 group-hover:text-emerald-400"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            <div
              className={`absolute inset-0 rounded-full transition-colors ${
                isPlaying
                  ? "bg-emerald-500/10"
                  : "bg-emerald-500/0 group-hover:bg-emerald-500/10"
              }`}
            />
          </div>
        </div>

        {/* Arcade Controller Play Button */}
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className={`group relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-zinc-900 rounded-full border border-zinc-800 hover:border-zinc-700 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20 disabled:cursor-not-allowed ${hiddenIcons.includes("gamepad") ? "opacity-0" : "opacity-100"}`}
        >
          <TbDeviceGamepad2 className="w-6 h-6 sm:w-9 sm:h-9 text-zinc-400 group-hover:text-purple-400 transition-colors" />
          <div className="absolute inset-0 rounded-full bg-purple-500/0 group-hover:bg-purple-500/10 transition-colors" />
        </button>
      </div>
    </main>
  );
}

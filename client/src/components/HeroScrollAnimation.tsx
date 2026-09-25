import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const TOTAL_FRAMES = 300;
const FRAME_PREFIX = "/hero-frames/ezgif-frame-";
const FRAME_EXT = ".jpg";

export function HeroScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const isLoadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [deviceTier, setDeviceTier] = useState<"mobile" | "tablet" | "desktop">("desktop");

  const targetFrameRef = useRef<number>(0);
  const renderedFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);
  const isTickingRef = useRef<boolean>(false);
  const isHeroVisibleRef = useRef<boolean>(true);

  // Scroll-Synchronized Audio System (Always ON, zero buttons)
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const targetVolumeRef = useRef<number>(0);
  const currentVolumeRef = useRef<number>(0);
  const volumeFadeRafRef = useRef<number | null>(null);
  const scrollStopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastSeekTimeRef = useRef<number>(0);
  const lastScrollProgressRef = useRef<number>(0);

  // Smooth audio volume ramping loop
  const rampVolume = useCallback(() => {
    if (!audioRef.current) return;
    const target = targetVolumeRef.current;
    const current = currentVolumeRef.current;
    const diff = target - current;

    if (Math.abs(diff) > 0.008) {
      currentVolumeRef.current += diff * 0.18;
      audioRef.current.volume = Math.max(0, Math.min(1, currentVolumeRef.current));
      volumeFadeRafRef.current = requestAnimationFrame(rampVolume);
    } else {
      currentVolumeRef.current = target;
      audioRef.current.volume = Math.max(0, Math.min(1, target));
      if (target === 0 && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      volumeFadeRafRef.current = null;
    }
  }, []);

  const setTargetVolume = useCallback((vol: number) => {
    targetVolumeRef.current = Math.max(0, Math.min(1, vol));
    if (!volumeFadeRafRef.current) {
      volumeFadeRafRef.current = requestAnimationFrame(rampVolume);
    }
  }, [rampVolume]);

  // Helper to format frame number (001 to 300)
  const getFrameUrl = useCallback((index: number) => {
    const frameNumber = String(index + 1).padStart(3, "0");
    return `${FRAME_PREFIX}${frameNumber}${FRAME_EXT}`;
  }, []);

  // Find nearest loaded frame if target frame is still streaming
  const getNearestLoadedImage = useCallback((targetIdx: number) => {
    if (isLoadedRef.current[targetIdx] && imagesRef.current[targetIdx]) {
      return imagesRef.current[targetIdx];
    }
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const left = targetIdx - offset;
      const right = targetIdx + offset;
      if (left >= 0 && isLoadedRef.current[left] && imagesRef.current[left]) {
        return imagesRef.current[left];
      }
      if (right < TOTAL_FRAMES && isLoadedRef.current[right] && imagesRef.current[right]) {
        return imagesRef.current[right];
      }
    }
    return imagesRef.current[0] || null;
  }, []);

  // Draw frame on canvas with high-DPI scaling and guaranteed edge-to-edge cover
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const img = getNearestLoadedImage(frameIdx);
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Device-adaptive DPR: 1.5 max on mobile to prevent GPU fill-rate strain and RAM exhaustion
    const isMobile = window.innerWidth < 768;
    const dpr = isMobile
      ? Math.min(window.devicePixelRatio || 1, 1.5)
      : Math.min(window.devicePixelRatio || 1, 2);

    const displayWidth = canvas.clientWidth || window.innerWidth;
    const displayHeight = canvas.clientHeight || window.innerHeight;

    const targetW = Math.round(displayWidth * dpr);
    const targetH = Math.round(displayHeight * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = isMobile ? "medium" : "high";

    // Full-bleed cover algorithm
    const scale = Math.max(displayWidth / img.naturalWidth, displayHeight / img.naturalHeight);
    const renderW = img.naturalWidth * scale;
    const renderH = img.naturalHeight * scale;

    const offsetX = (displayWidth - renderW) / 2;
    const offsetY = (displayHeight - renderH) / 2;

    // Sci-fi laboratory hanger backdrop fill
    ctx.fillStyle = "#0c131a";
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

    ctx.restore();
    renderedFrameRef.current = frameIdx;
  }, [getNearestLoadedImage]);

  // Responsive device tier detection
  useEffect(() => {
    const updateTier = () => {
      const w = window.innerWidth;
      if (w < 768) setDeviceTier("mobile");
      else if (w < 1024) setDeviceTier("tablet");
      else setDeviceTier("desktop");
    };
    updateTier();
    window.addEventListener("resize", updateTier, { passive: true });
    return () => window.removeEventListener("resize", updateTier);
  }, []);

  // Adaptive Multi-Tier Preload sequence
  useEffect(() => {
    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    let isCancelled = false;

    const isMobile = window.innerWidth < 768;
    const nav = typeof navigator !== "undefined" ? (navigator as any) : null;
    const isDataSaver = Boolean(nav?.connection?.saveData) || (nav?.hardwareConcurrency || 4) <= 2;

    // Frame step: mobile loads every 2nd or 3rd frame, desktop loads every frame
    const frameStep = isMobile ? (isDataSaver ? 3 : 2) : 1;

    const handleLoadedFrame = (idx: number, img: HTMLImageElement) => {
      if (isCancelled) return;
      if (!isLoadedRef.current[idx]) {
        images[idx] = img;
        isLoadedRef.current[idx] = true;

        if (idx === 0 || Math.round(targetFrameRef.current) === idx) {
          drawFrame(idx);
        }
      }
    };

    // Phase 1: Load Frame 0 immediately for instant First Paint
    const firstImg = new Image();
    firstImg.decoding = "async";
    firstImg.onload = () => handleLoadedFrame(0, firstImg);
    firstImg.src = getFrameUrl(0);
    if (firstImg.complete && firstImg.naturalWidth > 0) {
      handleLoadedFrame(0, firstImg);
    }

    // Phase 2: Prioritized Keyframes across the animation timeline (~15 frames total)
    // Ensures any swift scroll immediately renders an accurate keyframe without blank flashes
    const keyframes = [15, 30, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 299];
    keyframes.forEach((kIdx) => {
      if (kIdx >= TOTAL_FRAMES) return;
      const kImg = new Image();
      kImg.decoding = "async";
      kImg.onload = () => handleLoadedFrame(kIdx, kImg);
      kImg.src = getFrameUrl(kIdx);
    });

    // Phase 3: Incrementally load remaining frames matching the frameStep with gentle throttling
    const remainingFrames: number[] = [];
    for (let i = 1; i < TOTAL_FRAMES; i += frameStep) {
      if (!keyframes.includes(i)) {
        remainingFrames.push(i);
      }
    }

    let currentIndex = 0;
    const batchSize = isMobile ? 3 : 6;

    const loadNextChunk = () => {
      if (isCancelled || currentIndex >= remainingFrames.length) return;

      const sliceEnd = Math.min(currentIndex + batchSize, remainingFrames.length);
      for (let i = currentIndex; i < sliceEnd; i++) {
        const frameIdx = remainingFrames[i];
        const img = new Image();
        img.decoding = "async";
        img.onload = () => handleLoadedFrame(frameIdx, img);
        img.src = getFrameUrl(frameIdx);
      }
      currentIndex = sliceEnd;

      if (currentIndex < remainingFrames.length) {
        if ("requestIdleCallback" in window) {
          (window as any).requestIdleCallback(() => loadNextChunk(), { timeout: 120 });
        } else {
          setTimeout(loadNextChunk, 25);
        }
      }
    };

    // Begin streaming phase 3 after keyframes have initial queue priority
    const timer = setTimeout(loadNextChunk, 100);

    imagesRef.current = images;

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      imagesRef.current = [];
    };
  }, [getFrameUrl, drawFrame]);

  // IntersectionObserver to pause processing and mute audio when hero section is off-screen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isHeroVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          drawFrame(Math.round(targetFrameRef.current));
        } else {
          // Off-screen: immediately silence audio and cancel timers
          if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
          setTargetVolume(0);
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [drawFrame, setTargetVolume]);

  // Audio lifecycle, autoplay unlock on first user gesture, and tab visibility handling
  useEffect(() => {
    const audio = new Audio("/audio/hero-audio.mp3");
    audio.loop = false; // Timeline is synchronized to scroll progress 0.0 -> 1.0
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;

    const unlockAudio = () => {
      if (!audioRef.current) return;
      if (audioRef.current.paused && isHeroVisibleRef.current) {
        audioRef.current.play().catch(() => {});
      }
      removeUnlockListeners();
    };

    const unlockEvents = ["touchstart", "touchmove", "pointerdown", "wheel", "scroll", "keydown"];
    const addUnlockListeners = () => {
      unlockEvents.forEach((evt) =>
        window.addEventListener(evt, unlockAudio, { passive: true, once: true })
      );
    };
    const removeUnlockListeners = () => {
      unlockEvents.forEach((evt) =>
        window.removeEventListener(evt, unlockAudio)
      );
    };

    addUnlockListeners();

    // Direct autoplay attempt (browser permissions permitting)
    audio.play().then(() => {
      removeUnlockListeners();
    }).catch(() => {
      // Unlocks on first user scroll or touch
    });

    const handleVisibility = () => {
      if (!audioRef.current) return;
      if (document.hidden) {
        targetVolumeRef.current = 0;
        audioRef.current.volume = 0;
        audioRef.current.pause();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      removeUnlockListeners();
      document.removeEventListener("visibilitychange", handleVisibility);
      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
      if (volumeFadeRafRef.current) cancelAnimationFrame(volumeFadeRafRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  // Initial draw trigger once mounted
  useEffect(() => {
    const timer = setTimeout(() => {
      drawFrame(Math.round(targetFrameRef.current));
    }, 50);
    return () => clearTimeout(timer);
  }, [drawFrame]);

  // Throttled resize listener
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        drawFrame(Math.round(targetFrameRef.current));
      }, 60);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [drawFrame]);

  // Efficient On-Demand Physics Lerp Loop:
  // Stops executing when target frame is reached or when hero is off-screen, saving mobile battery
  const currentLerpFrameRef = useRef<number>(0);

  const startLerpLoop = useCallback(() => {
    if (isTickingRef.current) return;
    isTickingRef.current = true;

    const tick = () => {
      if (!isHeroVisibleRef.current) {
        isTickingRef.current = false;
        return;
      }

      const diff = targetFrameRef.current - currentLerpFrameRef.current;

      if (Math.abs(diff) > 0.02) {
        currentLerpFrameRef.current += diff * 0.22;
        const frameToDraw = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentLerpFrameRef.current)));
        if (frameToDraw !== renderedFrameRef.current) {
          drawFrame(frameToDraw);
        }
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        currentLerpFrameRef.current = targetFrameRef.current;
        const finalFrame = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(targetFrameRef.current)));
        if (finalFrame !== renderedFrameRef.current) {
          drawFrame(finalFrame);
        }
        isTickingRef.current = false;
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
  }, [drawFrame]);

  // Scroll Progress Tracker
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDist = rect.height - window.innerHeight;
      if (scrollableDist <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(1, Math.max(0, currentScroll / scrollableDist));
      setScrollProgress(progress);

      // Synchronize audio playback precisely with scrolling up and down
      if (isHeroVisibleRef.current && audioRef.current) {
        const audio = audioRef.current;
        const duration = audio.duration && !isNaN(audio.duration) && audio.duration > 0
          ? audio.duration
          : 21.5;

        // Synchronized timestamp matching current hero frame (0.0 to duration)
        const targetTime = Math.min(duration - 0.05, Math.max(0, progress * duration));
        const prevProgress = lastScrollProgressRef.current;
        const isScrollingUp = progress < prevProgress;
        lastScrollProgressRef.current = progress;

        // Dynamic fadeout when transitioning out of the hero section
        let fadeMultiplier = 1;
        if (progress > 0.85) {
          fadeMultiplier = Math.max(0, (1 - progress) / 0.15);
        }

        const activeVolume = 0.85 * fadeMultiplier;

        if (activeVolume > 0.01) {
          setTargetVolume(activeVolume);

          if (audio.paused) {
            audio.play().catch(() => {});
          }

          const now = performance.now();
          const timeDiff = targetTime - audio.currentTime;

          if (isScrollingUp) {
            // Scrolling UP: synchronize backward to the exact matching audio timestamp
            if (now - lastSeekTimeRef.current > 60 || Math.abs(timeDiff) > 0.35) {
              audio.currentTime = targetTime;
              audio.playbackRate = 1.0;
              lastSeekTimeRef.current = now;
            }
          } else {
            // Scrolling DOWN: synchronize forward with dynamic velocity tracking
            if (Math.abs(timeDiff) > 0.4) {
              if (now - lastSeekTimeRef.current > 80) {
                audio.currentTime = targetTime;
                audio.playbackRate = 1.0;
                lastSeekTimeRef.current = now;
              }
            } else {
              // Smooth rate modulation keeps audio locked with frame speed
              audio.playbackRate = Math.max(0.85, Math.min(1.4, 1.0 + timeDiff * 1.2));
            }
          }

          // Reset idle scroll timer: when user pauses scrolling, gently fade out volume
          // so the audio holds its exact synchronized position without drifting away
          if (scrollStopTimerRef.current) {
            clearTimeout(scrollStopTimerRef.current);
          }
          scrollStopTimerRef.current = setTimeout(() => {
            setTargetVolume(0);
          }, 350);
        } else {
          setTargetVolume(0);
        }
      }

      const target = progress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = target;

      if (!isTickingRef.current && isHeroVisibleRef.current) {
        startLerpLoop();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [startLerpLoop, setTargetVolume]);

  // Responsive scroll height: comfortable swipe length on mobile without endless dragging
  const heroHeight = deviceTier === "mobile" ? "280vh" : deviceTier === "tablet" ? "360vh" : "450vh";

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#0c131a]"
      style={{ height: heroHeight }}
      id="hero-section"
    >
      {/* Pinned Fullscreen Viewport: Clean, pure, realistic 3D canvas */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none z-10">
        
        {/* Hardware Accelerated HTML5 Canvas Scrub - 100% Full Bleed */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full select-none pointer-events-none z-0"
        />

        {/* Minimal Initial Hero Header - Smoothly dissolves as user begins scrolling */}
        <AnimatePresence>
          {scrollProgress < 0.12 && (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ 
                opacity: Math.max(0, 1 - scrollProgress * 8), 
                y: -scrollProgress * 100 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 pointer-events-none"
            >
              <div className="max-w-3xl text-center pointer-events-auto px-2">
                <span className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold text-cyan-300 mb-2.5 sm:mb-3 bg-slate-900/80 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full shadow-lg border border-cyan-500/30">
                  VY NextGen Technologies
                </span>
                
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-3 sm:mb-4 leading-tight drop-shadow-md">
                  Architecting <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500">
                    Next-Gen Systems
                  </span>
                </h1>
                
                <p className="text-xs sm:text-base md:text-lg text-slate-300 max-w-xl mx-auto font-normal leading-relaxed mb-5 sm:mb-6">
                  Web Platforms • Mobile Ecosystems • Cloud GST Billing
                </p>

                <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-semibold text-cyan-300 tracking-wider uppercase bg-slate-900/70 backdrop-blur-sm px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full w-fit mx-auto border border-cyan-500/30 shadow-lg">
                  <span>Scroll to explore</span>
                  <ChevronDown className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle, non-blocking scroll cue at the end of the frames */}
        <AnimatePresence>
          {scrollProgress > 0.90 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-3 w-full max-w-xs sm:max-w-none text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-slate-950/80 backdrop-blur-xl border border-cyan-500/30 text-white text-[11px] sm:text-xs font-medium shadow-2xl">
                <span>Continue scrolling to view solutions</span>
                <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 animate-bounce shrink-0" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}


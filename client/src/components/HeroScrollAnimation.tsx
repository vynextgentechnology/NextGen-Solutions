import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";

const TOTAL_FRAMES = 300;
const FRAME_PREFIX = "/hero-frames/ezgif-frame-";
const FRAME_EXT = ".jpg";
const AUDIO_URL = "/audio/hero-audio.mp3";
const AUDIO_DURATION = 10.762; // Exact duration of the hero animation soundtrack in seconds
const SOURCE_ASPECT_RATIO = 1920 / 1080;

export function HeroScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bottomCueRef = useRef<HTMLDivElement>(null);

  // Cached frame images (HTMLImageElement or ImageBitmap) & nearest lookup table
  const imagesRef = useRef<(HTMLImageElement | ImageBitmap | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const isLoadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const nearestLoadedRef = useRef<number[]>(new Array(TOTAL_FRAMES).fill(0));

  // Canvas dimensions & pre-computed cover geometry cache (ZERO calculations inside the draw loop)
  const canvasWidthRef = useRef<number>(0);
  const canvasHeightRef = useRef<number>(0);
  const dprRef = useRef<number>(1);
  const renderWRef = useRef<number>(0);
  const renderHRef = useRef<number>(0);
  const offsetXRef = useRef<number>(0);
  const offsetYRef = useRef<number>(0);

  // Animation & scrolling state (kept in refs for zero React re-render lag)
  const isMobileRef = useRef<boolean>(false);
  const [deviceTier, setDeviceTier] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const targetFrameRef = useRef<number>(0);
  const currentLerpFrameRef = useRef<number>(0);
  const renderedFrameRef = useRef<number>(-1);
  const isTickingRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);
  const lastTickTimeRef = useRef<number>(0);
  const isHeroVisibleRef = useRef<boolean>(true);
  const scrollProgressRef = useRef<number>(0);

  // Velocity tracking for audio playback rate matching
  const lastScrollProgressRef = useRef<number>(0);
  const lastScrollTimeRef = useRef<number>(0);

  // Sound Engine (Web Audio API with PCM Buffers for exact forward & reverse scroll matching)
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const forwardBufferRef = useRef<AudioBuffer | null>(null);
  const reverseBufferRef = useRef<AudioBuffer | null>(null);
  const activeSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const activeDirectionRef = useRef<"forward" | "reverse" | null>(null);
  const sourceStartedAtAudioTimeRef = useRef<number>(0);
  const sourceOffsetTimeRef = useRef<number>(0);
  const currentPlaybackRateRef = useRef<number>(1);
  const scrollStopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isMutedRef = useRef<boolean>(false);
  const isAudioLoadedRef = useRef<boolean>(false);

  // Fallback HTML5 audio element
  const fallbackAudioRef = useRef<HTMLAudioElement | null>(null);

  // Keep isMutedRef in sync with state
  useEffect(() => {
    isMutedRef.current = isMuted;
    if (gainNodeRef.current && audioContextRef.current) {
      const now = audioContextRef.current.currentTime;
      if (isMuted) {
        gainNodeRef.current.gain.setTargetAtTime(0, now, 0.05);
      } else if (isHeroVisibleRef.current && scrollProgressRef.current < 0.88) {
        gainNodeRef.current.gain.setTargetAtTime(0.85, now, 0.08);
      }
    }
    if (fallbackAudioRef.current) {
      fallbackAudioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Helper to format frame filename (001 to 300)
  const getFrameUrl = useCallback((index: number) => {
    const frameNumber = String(index + 1).padStart(3, "0");
    return `${FRAME_PREFIX}${frameNumber}${FRAME_EXT}`;
  }, []);

  // Update nearest loaded frame lookup table whenever a new frame loads
  const updateNearestLookup = useCallback((loadedIdx: number) => {
    const lookup = nearestLoadedRef.current;
    lookup[loadedIdx] = loadedIdx;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (isLoadedRef.current[i]) {
        lookup[i] = i;
      } else {
        let closest = lookup[i];
        let minDiff = Math.abs(i - closest);
        for (let check of [loadedIdx, lookup[Math.max(0, i - 1)], lookup[Math.min(TOTAL_FRAMES - 1, i + 1)]]) {
          if (isLoadedRef.current[check] && Math.abs(i - check) < minDiff) {
            closest = check;
            minDiff = Math.abs(i - check);
          }
        }
        lookup[i] = closest;
      }
    }
  }, []);

  // Draw frame directly to canvas - Ultra-fast GPU texture blit with pre-calculated coordinates
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const actualIdx = nearestLoadedRef.current[frameIdx] ?? 0;
    const img = imagesRef.current[actualIdx];
    if (!img) return;

    // Direct GPU blit using cached geometry (0.1ms execution time)
    ctx.drawImage(
      img as CanvasImageSource,
      offsetXRef.current,
      offsetYRef.current,
      renderWRef.current,
      renderHRef.current
    );
    renderedFrameRef.current = frameIdx;
  }, []);

  // Pre-calculate full-bleed cover geometry and canvas dimensions once upon resize
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 768;
    isMobileRef.current = isMobile;

    // Mobile: DPR 1.0 eliminates GPU fill-rate strain and texture memory pressure
    // Desktop: DPR capped at 1.5 for maximum sharpness
    const dpr = isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5);
    dprRef.current = dpr;

    const displayW = window.innerWidth;
    const displayH = window.innerHeight;
    const targetW = Math.round(displayW * dpr);
    const targetH = Math.round(displayH * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      canvasWidthRef.current = targetW;
      canvasHeightRef.current = targetH;

      const ctx = canvas.getContext("2d", { alpha: false });
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = isMobile ? "medium" : "high";
      }
    }

    // Pre-calculate full bleed cover dimensions for the 16:9 source frames (1920x1080)
    const scale = Math.max(targetW / 1920, targetH / 1080);
    const rw = 1920 * scale;
    const rh = 1080 * scale;
    renderWRef.current = rw;
    renderHRef.current = rh;
    offsetXRef.current = (targetW - rw) * 0.5;
    offsetYRef.current = (targetH - rh) * 0.5;

    const newTier = isMobile ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop";
    if (deviceTier !== newTier) {
      setDeviceTier(newTier);
    }

    drawFrame(Math.round(targetFrameRef.current));
  }, [deviceTier, drawFrame]);

  // Window resize listener
  useEffect(() => {
    resizeCanvas();
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 80);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [resizeCanvas]);

  // Asynchronous Image Preloader with background decoding and ImageBitmap GPU texturing
  useEffect(() => {
    let isCancelled = false;
    const isMobile = window.innerWidth < 768;
    const frameStep = isMobile ? 2 : 1;

    const loadAndDecodeFrame = async (idx: number): Promise<void> => {
      if (isCancelled || isLoadedRef.current[idx]) return;

      const img = new Image();
      img.src = getFrameUrl(idx);

      try {
        if ("decode" in img) {
          await img.decode();
        } else {
          await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = reject;
          });
        }
        if (isCancelled) return;

        // Try createImageBitmap for instant zero-copy GPU textures
        if (typeof createImageBitmap !== "undefined") {
          try {
            const bitmap = await createImageBitmap(img);
            if (isCancelled) return;
            imagesRef.current[idx] = bitmap;
          } catch {
            imagesRef.current[idx] = img;
          }
        } else {
          imagesRef.current[idx] = img;
        }

        isLoadedRef.current[idx] = true;
        updateNearestLookup(idx);

        if (idx === 0 || Math.round(targetFrameRef.current) === idx) {
          drawFrame(idx);
        }
      } catch {
        if (isCancelled) return;
        imagesRef.current[idx] = img;
        isLoadedRef.current[idx] = true;
        updateNearestLookup(idx);
      }
    };

    // Phase 1: Frame 0 for instant First Contentful Paint
    loadAndDecodeFrame(0);

    // Phase 2: Keyframes across the scroll journey
    const keyframes = [10, 25, 45, 70, 95, 120, 150, 180, 210, 240, 270, 299];
    keyframes.forEach((kIdx) => {
      if (kIdx < TOTAL_FRAMES) {
        loadAndDecodeFrame(kIdx);
      }
    });

    // Phase 3: Incrementally load remaining frames with requestIdleCallback
    const remainingFrames: number[] = [];
    for (let i = 1; i < TOTAL_FRAMES; i += frameStep) {
      if (!keyframes.includes(i)) {
        remainingFrames.push(i);
      }
    }

    let chunkIdx = 0;
    const batchSize = isMobile ? 4 : 8;

    const streamNextBatch = () => {
      if (isCancelled || chunkIdx >= remainingFrames.length) return;

      const end = Math.min(chunkIdx + batchSize, remainingFrames.length);
      for (let i = chunkIdx; i < end; i++) {
        loadAndDecodeFrame(remainingFrames[i]);
      }
      chunkIdx = end;

      if (chunkIdx < remainingFrames.length) {
        if ("requestIdleCallback" in window) {
          (window as any).requestIdleCallback(streamNextBatch, { timeout: 100 });
        } else {
          setTimeout(streamNextBatch, 30);
        }
      }
    };

    const streamTimer = setTimeout(streamNextBatch, 120);

    return () => {
      isCancelled = true;
      clearTimeout(streamTimer);
    };
  }, [getFrameUrl, drawFrame, updateNearestLookup]);

  // Load and decode audio buffer for zero-latency scroll-synchronized scrubbing
  const initAudio = useCallback(async () => {
    if (audioContextRef.current && isAudioLoadedRef.current) {
      if (audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume().catch(() => {});
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const audioCtx = audioContextRef.current || new AudioCtx();
      audioContextRef.current = audioCtx;

      if (audioCtx.state === "suspended") {
        await audioCtx.resume().catch(() => {});
      }

      // Master Gain Node for click-free volume fading
      if (!gainNodeRef.current) {
        const gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.connect(audioCtx.destination);
        gainNodeRef.current = gainNode;
      }

      // Setup Fallback HTML5 audio element
      if (!fallbackAudioRef.current) {
        const fbAudio = new Audio(AUDIO_URL);
        fbAudio.preload = "auto";
        fbAudio.volume = 0.75;
        fallbackAudioRef.current = fbAudio;
      }

      // Fetch and decode MP3 into PCM buffer for instant sample-accurate scrubbing
      const res = await fetch(AUDIO_URL);
      const arrayBuffer = await res.arrayBuffer();
      const decodedBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      forwardBufferRef.current = decodedBuffer;

      // Create pre-reversed audio buffer for backward scrubbing
      const numChannels = decodedBuffer.numberOfChannels;
      const length = decodedBuffer.length;
      const sampleRate = decodedBuffer.sampleRate;
      const revBuffer = audioCtx.createBuffer(numChannels, length, sampleRate);

      for (let ch = 0; ch < numChannels; ch++) {
        const src = decodedBuffer.getChannelData(ch);
        const dst = revBuffer.getChannelData(ch);
        for (let i = 0, j = length - 1; i < length; i++, j--) {
          dst[i] = src[j];
        }
      }
      reverseBufferRef.current = revBuffer;
      isAudioLoadedRef.current = true;
      setIsAudioActive(true);
    } catch {
      isAudioLoadedRef.current = false;
    }
  }, []);

  // Stop current Web Audio source smoothly without clicks
  const stopCurrentSource = useCallback(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.04);
    }
    if (activeSourceRef.current) {
      try {
        activeSourceRef.current.stop(audioContextRef.current ? audioContextRef.current.currentTime + 0.05 : 0);
      } catch {}
      activeSourceRef.current = null;
      activeDirectionRef.current = null;
    }
    if (fallbackAudioRef.current && !fallbackAudioRef.current.paused) {
      fallbackAudioRef.current.pause();
    }
  }, []);

  // Precision audio scrubber: locks audio playback directly with scroll progress and direction
  const syncAudioToScroll = useCallback((progress: number, isScrollingDown: boolean, speedMultiplier: number) => {
    if (isMutedRef.current || !isHeroVisibleRef.current) {
      stopCurrentSource();
      return;
    }

    const targetAudioTime = Math.min(AUDIO_DURATION - 0.05, Math.max(0, progress * AUDIO_DURATION));

    if (isAudioLoadedRef.current && forwardBufferRef.current && audioContextRef.current && gainNodeRef.current) {
      const audioCtx = audioContextRef.current;
      if (audioCtx.state === "suspended") {
        audioCtx.resume().catch(() => {});
      }

      const desiredDirection = isScrollingDown ? "forward" : "reverse";
      const bufferToUse = isScrollingDown ? forwardBufferRef.current : reverseBufferRef.current;
      if (!bufferToUse) return;

      const sourceOffset = isScrollingDown
        ? targetAudioTime
        : Math.max(0, Math.min(AUDIO_DURATION, AUDIO_DURATION - targetAudioTime));

      const now = audioCtx.currentTime;
      const targetRate = Math.max(0.65, Math.min(2.0, speedMultiplier));

      const currentSource = activeSourceRef.current;
      const currentDirection = activeDirectionRef.current;

      if (currentSource && currentDirection === desiredDirection) {
        const elapsed = (now - sourceStartedAtAudioTimeRef.current) * currentPlaybackRateRef.current;
        const currentEstimatedTime = isScrollingDown
          ? sourceOffsetTimeRef.current + elapsed
          : AUDIO_DURATION - (sourceOffsetTimeRef.current + elapsed);

        const drift = Math.abs(targetAudioTime - currentEstimatedTime);

        if (drift < 0.35) {
          currentSource.playbackRate.setTargetAtTime(targetRate, now, 0.05);
          currentPlaybackRateRef.current = targetRate;
          gainNodeRef.current.gain.setTargetAtTime(0.85, now, 0.04);
          return;
        }
      }

      stopCurrentSource();

      const newSource = audioCtx.createBufferSource();
      newSource.buffer = bufferToUse;
      newSource.playbackRate.setValueAtTime(targetRate, now);
      currentPlaybackRateRef.current = targetRate;

      newSource.connect(gainNodeRef.current);

      try {
        newSource.start(0, Math.min(AUDIO_DURATION - 0.05, Math.max(0, sourceOffset)));
        activeSourceRef.current = newSource;
        activeDirectionRef.current = desiredDirection;
        sourceStartedAtAudioTimeRef.current = now;
        sourceOffsetTimeRef.current = sourceOffset;

        gainNodeRef.current.gain.setValueAtTime(0.01, now);
        gainNodeRef.current.gain.setTargetAtTime(0.85, now + 0.01, 0.04);
        setIsAudioActive(true);
      } catch {}
      return;
    }

    if (fallbackAudioRef.current) {
      const fb = fallbackAudioRef.current;
      const diff = Math.abs(fb.currentTime - targetAudioTime);
      if (diff > 0.4) {
        fb.currentTime = targetAudioTime;
      }
      fb.playbackRate = Math.max(0.7, Math.min(1.8, speedMultiplier));
      if (fb.paused) {
        fb.play().then(() => setIsAudioActive(true)).catch(() => {});
      }
    }
  }, [stopCurrentSource]);

  // Unlock audio on initial user touch/click/scroll
  useEffect(() => {
    const handleUserGesture = () => {
      initAudio();
      removeListeners();
    };

    const gestureEvents = ["touchstart", "touchend", "pointerdown", "click", "keydown", "wheel", "scroll"];
    const removeListeners = () => {
      gestureEvents.forEach((evt) => window.removeEventListener(evt, handleUserGesture));
    };

    gestureEvents.forEach((evt) =>
      window.addEventListener(evt, handleUserGesture, { passive: true, once: true })
    );

    return () => removeListeners();
  }, [initAudio]);

  // Tab visibility: immediately silence when tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        stopCurrentSource();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [stopCurrentSource]);

  // Toggle mute button
  const toggleMute = useCallback(() => {
    initAudio();
    setIsMuted((prev) => !prev);
  }, [initAudio]);

  // Frame-Rate Independent Exponential Physics Scrub Loop (Runs like butter at 60Hz, 90Hz, 120Hz ProMotion)
  const startScrubLoop = useCallback(() => {
    if (isTickingRef.current) return;
    isTickingRef.current = true;
    lastTickTimeRef.current = performance.now();

    const tick = (now: number) => {
      if (!isHeroVisibleRef.current) {
        isTickingRef.current = false;
        return;
      }

      const dt = Math.min(0.04, Math.max(0.001, (now - lastTickTimeRef.current) / 1000));
      lastTickTimeRef.current = now;

      const target = targetFrameRef.current;
      const current = currentLerpFrameRef.current;
      const diff = target - current;

      // Exponential decay: lambda = 24 on mobile (snappy thumb follow), 18 on desktop (velvet glide)
      const lambda = isMobileRef.current ? 24 : 18;
      const factor = 1 - Math.exp(-lambda * dt);

      if (Math.abs(diff) > 0.04) {
        currentLerpFrameRef.current += diff * factor;
        const frameToDraw = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentLerpFrameRef.current)));
        if (frameToDraw !== renderedFrameRef.current) {
          drawFrame(frameToDraw);
        }
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        currentLerpFrameRef.current = target;
        const finalFrame = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(target)));
        if (finalFrame !== renderedFrameRef.current) {
          drawFrame(finalFrame);
        }
        isTickingRef.current = false;
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
  }, [drawFrame]);

  // Direct DOM style updates for header and bottom cue (Bypasses React reconciliation for 60fps mobile speed)
  const updateOverlayStyles = useCallback((progress: number) => {
    if (headerRef.current) {
      if (progress <= 0.14) {
        const opacity = Math.max(0, 1 - progress * 7.5);
        const translateY = -progress * 60;
        headerRef.current.style.opacity = String(opacity);
        headerRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
        headerRef.current.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
        headerRef.current.style.display = "flex";
      } else {
        headerRef.current.style.opacity = "0";
        headerRef.current.style.pointerEvents = "none";
        headerRef.current.style.display = "none";
      }
    }

    if (bottomCueRef.current) {
      if (progress >= 0.88) {
        const opacity = Math.min(1, (progress - 0.88) * 8);
        bottomCueRef.current.style.opacity = String(opacity);
        bottomCueRef.current.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
        bottomCueRef.current.style.display = "block";
      } else {
        bottomCueRef.current.style.opacity = "0";
        bottomCueRef.current.style.pointerEvents = "none";
        bottomCueRef.current.style.display = "none";
      }
    }
  }, []);

  // Unified scroll handler: Works with Lenis smooth momentum and native window scroll
  const onUnifiedScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollableDist = rect.height - window.innerHeight;
    if (scrollableDist <= 0) return;

    const currentScroll = -rect.top;
    const progress = Math.min(1, Math.max(0, currentScroll / scrollableDist));
    scrollProgressRef.current = progress;

    updateOverlayStyles(progress);

    const prevProgress = lastScrollProgressRef.current;
    const isScrollingDown = progress >= prevProgress;
    const deltaProgress = Math.abs(progress - prevProgress);
    const now = performance.now();
    const deltaTime = Math.max(16, now - lastScrollTimeRef.current);
    lastScrollProgressRef.current = progress;
    lastScrollTimeRef.current = now;

    const scrollRate = (deltaProgress * AUDIO_DURATION) / (deltaTime / 1000);
    const speedMultiplier = Math.max(0.65, Math.min(2.0, scrollRate || 1.0));

    if (isHeroVisibleRef.current && progress < 0.88) {
      syncAudioToScroll(progress, isScrollingDown, speedMultiplier);

      if (scrollStopTimerRef.current) {
        clearTimeout(scrollStopTimerRef.current);
      }
      scrollStopTimerRef.current = setTimeout(() => {
        stopCurrentSource();
      }, 180);
    } else {
      stopCurrentSource();
    }

    targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
    if (!isTickingRef.current && isHeroVisibleRef.current) {
      startScrubLoop();
    }
  }, [updateOverlayStyles, syncAudioToScroll, stopCurrentSource, startScrubLoop]);

  // Main Scroll Listener: Subscribes to Lenis if available or native scroll
  useEffect(() => {
    const lenis = (window as any).__lenis;

    if (lenis) {
      lenis.on("scroll", onUnifiedScroll);
    }
    window.addEventListener("scroll", onUnifiedScroll, { passive: true });
    onUnifiedScroll();

    return () => {
      if (lenis) {
        lenis.off("scroll", onUnifiedScroll);
      }
      window.removeEventListener("scroll", onUnifiedScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
    };
  }, [onUnifiedScroll]);

  // IntersectionObserver to pause rendering and silence audio when off-screen
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
          stopCurrentSource();
          if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [drawFrame, stopCurrentSource]);

  // Clean up Web Audio nodes on unmount
  useEffect(() => {
    return () => {
      stopCurrentSource();
      if (fallbackAudioRef.current) {
        fallbackAudioRef.current.pause();
        fallbackAudioRef.current.src = "";
        fallbackAudioRef.current = null;
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [stopCurrentSource]);

  // Optimized swipe height for mobile touch (240vh allows natural 2-swipe traverse without scroll-fatigue)
  const heroHeight = deviceTier === "mobile" ? "240vh" : deviceTier === "tablet" ? "320vh" : "420vh";

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0c131a]"
      style={{ height: heroHeight }}
      id="hero-section"
    >
      {/* Pinned Fullscreen Viewport - hardware accelerated layout */}
      <div 
        className="sticky top-0 left-0 w-full h-screen h-[100dvh] overflow-hidden flex items-center justify-center pointer-events-none z-10"
        style={{ transform: "translate3d(0, 0, 0)", willChange: "transform" }}
      >
        {/* Hardware-Accelerated 2D Canvas Scrub */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full select-none pointer-events-none z-0"
          style={{ 
            backgroundColor: "#0c131a",
            transform: "translate3d(0, 0, 0)",
            willChange: "transform"
          }}
        />

        {/* Minimal Initial Hero Header - Controlled via direct DOM style updates for zero lag */}
        <div
          ref={headerRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 pointer-events-none transition-none"
          style={{ willChange: "opacity, transform" }}
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
        </div>

        {/* Subtle Scroll Cue at the End of the Hero Experience */}
        <div
          ref={bottomCueRef}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-3 w-full max-w-xs sm:max-w-none text-center hidden"
          style={{ willChange: "opacity" }}
        >
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-slate-950/85 backdrop-blur-xl border border-cyan-500/30 text-white text-[11px] sm:text-xs font-medium shadow-2xl">
            <span>Continue scrolling to view solutions</span>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 animate-bounce shrink-0" />
          </div>
        </div>

        {/* Sleek, Unobtrusive Audio Control & Sound Wave Badge */}
        <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 z-30 pointer-events-auto">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="group flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-slate-900/80 hover:bg-slate-800/90 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-white transition-all shadow-lg text-[11px] sm:text-xs font-medium cursor-pointer active:scale-95"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                <span className="text-slate-400 group-hover:text-slate-200">Sound: Muted</span>
              </>
            ) : (
              <>
                <div className="flex items-center gap-0.5 h-3.5 sm:h-4">
                  <span className={`w-0.5 bg-cyan-400 rounded-full transition-all ${isAudioActive ? "animate-[pulse_0.8s_ease-in-out_infinite] h-3" : "h-1.5"}`} />
                  <span className={`w-0.5 bg-cyan-400 rounded-full transition-all ${isAudioActive ? "animate-[pulse_1.2s_ease-in-out_infinite_0.2s] h-4" : "h-2"}`} />
                  <span className={`w-0.5 bg-cyan-400 rounded-full transition-all ${isAudioActive ? "animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-2.5" : "h-1.5"}`} />
                </div>
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                <span className="hidden xs:inline sm:inline text-cyan-300">Synchronized Audio</span>
              </>
            )}
          </button>
        </div>

      </div>
    </section>
  );
}

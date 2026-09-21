import React, { useState, useEffect, useRef } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms per character
  delay?: number; // initial delay before starting
  cursorChar?: string;
  showCursor?: boolean;
  onComplete?: () => void;
  className?: string;
  enableSound?: boolean;
  soundVolume?: number; // 0 to 1
  autoStart?: boolean;
}

// Lightweight synthesized cyber click sound using Web Audio API
class CyberAudioSynthesizer {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  playKeyClick(volume = 0.03) {
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Soft high-frequency cyber click (like a subtle optical switch)
      const freqs = [1800, 2200, 2400, 2800, 3200];
      const randomFreq = freqs[Math.floor(Math.random() * freqs.length)];

      osc.type = "sine";
      osc.frequency.setValueAtTime(randomFreq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Ignore audio context errors if blocked by browser policy
    }
  }
}

const audioSynth = new CyberAudioSynthesizer();

export function TypewriterText({
  text,
  speed = 18,
  delay = 100,
  cursorChar = "▌",
  showCursor = true,
  onComplete,
  className = "",
  enableSound = false,
  soundVolume = 0.03,
  autoStart = true,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const indexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 450);
    return () => clearInterval(cursorInterval);
  }, []);

  // Main typing engine
  useEffect(() => {
    if (!autoStart) return;

    // Reset state when text changes
    setDisplayedText("");
    setIsTyping(true);
    setIsComplete(false);
    indexRef.current = 0;

    if (timerRef.current) clearTimeout(timerRef.current);

    const startTimeout = setTimeout(() => {
      const typeNextChar = () => {
        if (indexRef.current < text.length) {
          const nextChar = text.charAt(indexRef.current);
          setDisplayedText(text.slice(0, indexRef.current + 1));

          // Soft audio feedback
          if (enableSound && nextChar.trim().length > 0) {
            audioSynth.playKeyClick(soundVolume);
          }

          indexRef.current += 1;

          // Natural cadence pause on punctuation
          let currentSpeed = speed;
          if ([".", "!", "?"].includes(nextChar)) {
            currentSpeed = speed * 4.5;
          } else if ([",", ";", ":", "—", "-"].includes(nextChar)) {
            currentSpeed = speed * 2.2;
          }

          timerRef.current = setTimeout(typeNextChar, currentSpeed);
        } else {
          setIsTyping(false);
          setIsComplete(true);
          onComplete?.();
        }
      };

      typeNextChar();
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, speed, delay, enableSound, soundVolume, autoStart, onComplete]);

  // Fast forward / Skip to end
  const skipToEnd = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDisplayedText(text);
    indexRef.current = text.length;
    setIsTyping(false);
    setIsComplete(true);
    onComplete?.();
  };

  // Replay
  const replay = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDisplayedText("");
    setIsTyping(true);
    setIsComplete(false);
    indexRef.current = 0;

    const typeNextChar = () => {
      if (indexRef.current < text.length) {
        const nextChar = text.charAt(indexRef.current);
        setDisplayedText(text.slice(0, indexRef.current + 1));
        if (enableSound && nextChar.trim().length > 0) {
          audioSynth.playKeyClick(soundVolume);
        }
        indexRef.current += 1;

        let currentSpeed = speed;
        if ([".", "!", "?"].includes(nextChar)) {
          currentSpeed = speed * 4.5;
        } else if ([",", ";", ":", "—", "-"].includes(nextChar)) {
          currentSpeed = speed * 2.2;
        }
        timerRef.current = setTimeout(typeNextChar, currentSpeed);
      } else {
        setIsTyping(false);
        setIsComplete(true);
        onComplete?.();
      }
    };

    timerRef.current = setTimeout(typeNextChar, 100);
  };

  return {
    rendered: (
      <span className={className}>
        {displayedText}
        {showCursor && (
          <span
            className={`inline-block ml-0.5 text-cyan-400 font-bold transition-opacity duration-75 ${
              cursorVisible || isTyping ? "opacity-100" : "opacity-0"
            }`}
          >
            {cursorChar}
          </span>
        )}
      </span>
    ),
    isTyping,
    isComplete,
    skipToEnd,
    replay,
  };
}

// Standalone component version
export function TypewriterDisplay({
  text,
  speed = 18,
  delay = 100,
  cursorChar = "▌",
  showCursor = true,
  onComplete,
  className = "",
  enableSound = false,
  soundVolume = 0.03,
}: TypewriterTextProps) {
  const { rendered } = TypewriterText({
    text,
    speed,
    delay,
    cursorChar,
    showCursor,
    onComplete,
    className,
    enableSound,
    soundVolume,
  });

  return <>{rendered}</>;
}

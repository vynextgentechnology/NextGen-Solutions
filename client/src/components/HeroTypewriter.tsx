import { useState, useEffect } from "react";

export function HeroTypewriter({
  text,
  speed = 22,
  cursorColor = "bg-sky-400",
}: {
  text: string;
  speed?: number;
  cursorColor?: string;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, index + 1));
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return (
    <span className="inline-flex items-center">
      <span>{displayedText}</span>
      {index < text.length && (
        <span
          className={`inline-block w-2 h-4 ml-1 ${cursorColor} animate-pulse align-middle`}
        />
      )}
    </span>
  );
}

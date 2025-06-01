import React, { useEffect, useState } from "react";

const words = [
  "Nexus",
  "Ai",
  "Short",
  "Videos",
  "Generation",
];

export function AnimatedText() {
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);

  useEffect(() => {
    let timeouts = [];

    function runAnimation() {
      setCurrentWordIndex(-1); // Reset

      words.forEach((_, i) => {
        const timeout = setTimeout(() => {
          setCurrentWordIndex(i);
        }, i * 1200); // Interval of 1.2s per word
        timeouts.push(timeout);
      });

      // Restart the cycle after a delay
      const resetTimeout = setTimeout(() => {
        runAnimation();
      }, words.length * 1200 + 2000);
      timeouts.push(resetTimeout);
    }

    runAnimation();

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "2rem",
        maxWidth: "90vw",
        minHeight: "7rem",
        userSelect: "none",
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      {words.map((word, index) => {
        const isVisible = index <= currentWordIndex;
        return (
          <div
            key={index}
            style={{
              opacity: isVisible ? 1 : 0,
              transform:
                index === currentWordIndex
                  ? "translateX(0)"
                  : isVisible
                  ? "translateX(0)"
                  : "translateX(-100%)",
              transition: "transform 0.6s ease, opacity 0.4s ease",
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              fontWeight: 700,
              background: "linear-gradient(90deg, #ff4de6, #ff3c7e, #ff6a6a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              height: "6rem",
              whiteSpace: "nowrap",
              fontFamily: "'Poppins', sans-serif",
              lineHeight: 1,
            }}
            aria-hidden={!isVisible}
          >
            {word}
          </div>
        );
      })}
    </div>
  );
}

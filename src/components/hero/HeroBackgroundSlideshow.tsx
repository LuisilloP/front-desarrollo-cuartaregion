import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

export type Slide = {
  src: string;
  alt?: string;
  position?: string;
  mobileFocus?: "left" | "right" | "center";
};

type Props = {
  slides: Slide[];
  intervalMs?: number;
  transitionMs?: number;
  className?: string;
  showOverlay?: boolean;
};

const HeroBackgroundSlideshow = ({
  slides,
  intervalMs = 7000,
  transitionMs = 1200,
  className = "",
  showOverlay = true
}: Props) => {
  const shouldReduceMotion = useReducedMotion();
  const hasSlides = slides && slides.length > 0;
  const safeSlides = useMemo(() => (hasSlides ? slides : []), [hasSlides, slides]);
  const [index, setIndex] = useState(0);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (!safeSlides.length || shouldReduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % safeSlides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [safeSlides.length, intervalMs, shouldReduceMotion]);

  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  if (!safeSlides.length) return null;

  const current = safeSlides[index] ?? safeSlides[0];
  const focusMap: Record<NonNullable<Slide["mobileFocus"]>, string> = {
    left: "left center",
    right: "right center",
    center: "center center"
  };
  const mobileFocus = current.mobileFocus ? focusMap[current.mobileFocus] : current.position ?? "center center";
  const imageStyle = { "--object-position-mobile": mobileFocus } as React.CSSProperties;

  return (
    <div
      className={`absolute inset-0 -z-10 overflow-hidden pointer-events-none isolate ${className}`}
      aria-hidden="true"
    >
      <AnimatePresence>
        {!shouldReduceMotion && (
          <motion.img
            key={current.src + index}
            src={current.src}
            alt={current.alt ?? ""}
            className="absolute inset-0 h-full w-full object-cover object-[var(--object-position-mobile)] sm:object-center"
            style={imageStyle}
            initial={
              isFirstMount.current
                ? { opacity: 1, scale: 1, x: 0 }
                : { opacity: 0, scale: 1.01, x: 10 }
            }
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.995, x: -10 }}
            transition={{ duration: transitionMs / 1000, ease: "easeInOut" }}
            loading={index === 0 ? "eager" : "lazy"}
            decoding={index === 0 ? "sync" : "async"}
            fetchPriority={index === 0 ? "high" : "auto"}
          />
        )}
      </AnimatePresence>

      {shouldReduceMotion && (
        <img
          src={safeSlides[0].src}
          alt={safeSlides[0].alt ?? ""}
          className="absolute inset-0 h-full w-full object-cover object-[var(--object-position-mobile)] sm:object-center"
          style={imageStyle}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
      )}
      {showOverlay && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/85 via-secondary/60 to-secondary/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(59,130,246,0.18),transparent_40%),radial-gradient(circle_at_78%_10%,rgba(14,165,233,0.16),transparent_36%)]" />
        </>
      )}
    </div>
  );
};

export default HeroBackgroundSlideshow;

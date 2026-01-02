import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

export type Slide = {
  src: string;
  alt?: string;
  position?: string;
};

type Props = {
  slides: Slide[];
  intervalMs?: number;
  transitionMs?: number;
  className?: string;
};

const HeroBackgroundSlideshow = ({
  slides,
  intervalMs = 7000,
  transitionMs = 1200,
  className = ""
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
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: current.position ?? "center" }}
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
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: safeSlides[0].position ?? "center" }}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-br from-secondary/75 via-secondary/55 to-secondary/35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.16),transparent_38%)]" />
    </div>
  );
};

export default HeroBackgroundSlideshow;

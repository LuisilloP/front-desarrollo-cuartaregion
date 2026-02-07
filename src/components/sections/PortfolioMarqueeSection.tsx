// src/components/PortfolioMarqueeSection.tsx
import React, { useState, useMemo, useRef, useEffect } from "react";
import type { Company } from "../../content/portfolioProjects";

// --- Props and Types ---

interface PortfolioMarqueeSectionProps {
  companies: Company[];
  durationSeconds?: number;
  title?: string;
  description?: string;
}

// --- Sub-components ---

const CompanyCard = ({ company }: { company: Company }) => {
  const cardContent = (
    <figure className="flex flex-col gap-3">
      <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[1.75rem] bg-white/80 p-6 shadow-lg ring-1 ring-border/60 transition-shadow duration-300 group-hover:shadow-2xl dark:bg-white/[0.06]">
        <img
          src={company.logo}
          alt={`Logo de ${company.name}`}
          className="max-h-full w-full object-contain"
          loading="lazy"
          width={220}
          height={165}
        />
      </div>
      <figcaption className="truncate px-2 text-center text-sm font-semibold text-content">
        {company.name}
      </figcaption>
    </figure>
  );

  const liClasses =
    "group w-[240px] flex-shrink-0 cursor-pointer rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-4";

  if (company.href) {
    return (
      <li className={liClasses}>
        <a
          href={company.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={company.name}
          className="block transition-transform duration-300 ease-in-out hover:-translate-y-1.5"
        >
          {cardContent}
        </a>
      </li>
    );
  }

  return (
    <li className={liClasses} tabIndex={0}>
      <div className="block transition-transform duration-300 ease-in-out hover:-translate-y-1.5">
        {cardContent}
      </div>
    </li>
  );
};

// --- Main Component ---

const DEFAULT_TITLE = "Marcas que han confiado en Aliado Digital";
const DEFAULT_DESCRIPTION =
  "Nos gusta trabajar con personas reales y proyectos con objetivos claros. Estas son algunas marcas que confiaron en nosotros para mejorar su presencia online y sus procesos.";

const PortfolioMarqueeSection: React.FC<PortfolioMarqueeSectionProps> = ({
  companies,
  durationSeconds = 50,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
}) => {
  const marqueeContainerRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLUListElement>(null);
  const isAdjustingScrollRef = useRef(false);
  const singleWidthRef = useRef(0);
  const isUserInteractingRef = useRef(false);
  const interactionTimeoutRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const visibleCompanies = useMemo(() => companies ?? [], [companies]);

  const marqueeCompanies = useMemo(
    () =>
      visibleCompanies.length > 0
        ? [
            ...visibleCompanies,
            ...visibleCompanies,
            ...visibleCompanies,
            ...visibleCompanies
          ]
        : [],
    [visibleCompanies]
  );

  useEffect(() => {
    const container = marqueeContainerRef.current;
    const track = marqueeTrackRef.current;

    if (container && track) {
      const checkAnimation = () => {
        const singleContentWidth = track.scrollWidth / 2;
        const shouldAnimate = singleContentWidth > container.offsetWidth;
        setIsAnimating(shouldAnimate);
      };

      checkAnimation();
      window.addEventListener("resize", checkAnimation);

      return () => {
        window.removeEventListener("resize", checkAnimation);
      };
    }
  }, [visibleCompanies]);

  useEffect(() => {
    const container = marqueeContainerRef.current;
    const track = marqueeTrackRef.current;

    if (!container || !track) return;

    const markUserInteracting = () => {
      isUserInteractingRef.current = true;
      if (interactionTimeoutRef.current !== null) {
        window.clearTimeout(interactionTimeoutRef.current);
      }
      interactionTimeoutRef.current = window.setTimeout(() => {
        isUserInteractingRef.current = false;
      }, 1200);
    };

    const updateMeasurements = () => {
      singleWidthRef.current = track.scrollWidth / 2;
    };

    const onScroll = () => {
      if (
        isAdjustingScrollRef.current ||
        !isUserInteractingRef.current ||
        singleWidthRef.current === 0
      ) {
        return;
      }

      const buffer = 2;

      if (container.scrollLeft <= buffer) {
        isAdjustingScrollRef.current = true;
        container.scrollLeft += singleWidthRef.current;
        requestAnimationFrame(() => {
          isAdjustingScrollRef.current = false;
        });
        return;
      }

      if (container.scrollLeft >= singleWidthRef.current + buffer) {
        isAdjustingScrollRef.current = true;
        container.scrollLeft -= singleWidthRef.current;
        requestAnimationFrame(() => {
          isAdjustingScrollRef.current = false;
        });
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (!event.shiftKey) return;
      const delta = event.deltaY !== 0 ? event.deltaY : event.deltaX;
      if (delta === 0) return;
      if (container.scrollWidth <= container.clientWidth) return;
      if (singleWidthRef.current === 0) return;

      event.preventDefault();
      markUserInteracting();

      let nextScrollLeft = container.scrollLeft + delta;

      if (nextScrollLeft <= 0) {
        nextScrollLeft += singleWidthRef.current;
      } else if (nextScrollLeft >= singleWidthRef.current) {
        nextScrollLeft -= singleWidthRef.current;
      }

      container.scrollLeft = nextScrollLeft;
    };

    const onMouseEnter = () => {
      isUserInteractingRef.current = true;
    };

    const onMouseLeave = () => {
      isUserInteractingRef.current = false;
    };

    const onTouchStart = () => {
      markUserInteracting();
    };

    const autoScroll = (time: number) => {
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = time;
      }
      const deltaSeconds = (time - lastFrameTimeRef.current) / 1000;
      lastFrameTimeRef.current = time;

      if (
        isAnimating &&
        !isUserInteractingRef.current &&
        singleWidthRef.current > 0
      ) {
        const speed = singleWidthRef.current / durationSeconds;
        let nextScrollLeft = container.scrollLeft + speed * deltaSeconds;

        if (nextScrollLeft >= singleWidthRef.current) {
          nextScrollLeft -= singleWidthRef.current;
        }

        container.scrollLeft = nextScrollLeft;
      }

      rafRef.current = requestAnimationFrame(autoScroll);
    };

    updateMeasurements();
    container.addEventListener("scroll", onScroll, { passive: true });
    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("resize", updateMeasurements);
    rafRef.current = requestAnimationFrame(autoScroll);

    return () => {
      container.removeEventListener("scroll", onScroll);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("resize", updateMeasurements);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      if (interactionTimeoutRef.current !== null) {
        window.clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, [visibleCompanies, isAnimating, durationSeconds]);

  const marqueeStyle = {
    "--marquee-duration": `${durationSeconds}s`,
  } as React.CSSProperties;

  return (
    <section className="relative overflow-visible py-16 sm:py-24">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-content sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="text-base text-muted sm:text-lg">
            {description}
          </p>
        </div>
      </div>
      <div
        ref={marqueeContainerRef}
        className="marquee mt-12 sm:mt-16"
        style={marqueeStyle}
      >
        <ul
          ref={marqueeTrackRef}
          className={`marquee__track px-6 py-4 sm:px-8 sm:py-6 ${
            isAnimating ? "animate" : ""
          }`}
        >
          {marqueeCompanies.map((company, index) => (
            <CompanyCard key={`${company.id}-${index}`} company={company} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PortfolioMarqueeSection;

// src/components/PortfolioMarqueeSection.tsx
import React, { useState, useMemo, useRef, useEffect } from "react";
import type { Company } from "../content/portfolioProjects";

// --- Props and Types ---

interface PortfolioMarqueeSectionProps {
  companies: Company[];
  durationSeconds?: number;
}

// --- Sub-components ---

const CompanyCard = ({ company }: { company: Company }) => {
  const cardContent = (
    <figure className="flex flex-col gap-3">
      <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[1.75rem] bg-white/80 p-6 shadow-soft ring-1 ring-border/60 transition-shadow duration-300 group-hover:shadow-xl dark:bg-white/[0.06]">
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

const PortfolioMarqueeSection: React.FC<PortfolioMarqueeSectionProps> = ({
  companies,
  durationSeconds = 50,
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

  const visibleCompanies = companies ?? [];

  const marqueeCompanies = useMemo(
    () =>
      visibleCompanies.length > 0
        ? [
            ...visibleCompanies,
            ...visibleCompanies,
            ...visibleCompanies,
            ...visibleCompanies,
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
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (event.deltaY === 0) return;
      if (container.scrollWidth <= container.clientWidth) return;
      if (singleWidthRef.current === 0) return;

      event.preventDefault();
      markUserInteracting();

      let nextScrollLeft = container.scrollLeft + event.deltaY;

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
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-highlight/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-[-80px] h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <div className="pill inline-flex items-center justify-center gap-2 text-highlight">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M6 3h12l4 6-10 13L2 9l4-6Z" />
              <path d="M12 22 4 9l8-6 8 6-8 13Z" />
              <path d="M2 9h20" />
            </svg>
            Empresas aliadas
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-content sm:text-4xl lg:text-5xl">
            Empresas con las que hemos trabajado
          </h2>
          <p className="text-base text-muted sm:text-lg">
            Colaboramos con equipos locales para construir experiencias digitales
            solidas. Estas son algunas de las marcas que confiaron en nosotros.
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

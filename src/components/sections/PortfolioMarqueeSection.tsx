// src/components/PortfolioMarqueeSection.tsx
import React, { useState, useMemo, useRef, useEffect, useId } from "react";
import type { Company } from "../../content/portfolioProjects";
import { companies as masterCompanies } from "../../content/portfolioProjects";

// --- Props and Types ---

interface PortfolioMarqueeSectionProps {
  companies: Company[];
  /**
   * Master list rendered in the "ver todas" grid. Defaults to the full
   * portfolio, so each page can keep a curated marquee while the grid always
   * shows every brand.
   */
  allCompanies?: Company[];
  durationSeconds?: number;
  title?: string;
  description?: string;
  showAllLabel?: string;
  hideAllLabel?: string;
}

type CompanyCardVariant = "marquee" | "grid";

// --- Sub-components ---

const CompanyCard = ({
  company,
  variant = "marquee",
  className = "",
  style,
}: {
  company: Company;
  variant?: CompanyCardVariant;
  className?: string;
  style?: React.CSSProperties;
}) => {
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

  const liClasses = [
    "group cursor-pointer rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-4",
    variant === "marquee" ? "w-[240px] flex-shrink-0" : "w-full",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (company.href) {
    return (
      <li className={liClasses} style={style}>
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
    <li className={liClasses} style={style} tabIndex={0}>
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
const DEFAULT_SHOW_ALL_LABEL = "Conocer todas las marcas que han confiado";
const DEFAULT_HIDE_ALL_LABEL = "Ocultar las marcas";

// Reveal timings for the "ver todas" grid, matching the cases grid feel.
const GRID_REVEAL_MS = 500;
const GRID_OPEN_STAGGER_MS = 60;
const GRID_CLOSE_STAGGER_MS = 40;

const PortfolioMarqueeSection: React.FC<PortfolioMarqueeSectionProps> = ({
  companies,
  allCompanies,
  durationSeconds = 50,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  showAllLabel = DEFAULT_SHOW_ALL_LABEL,
  hideAllLabel = DEFAULT_HIDE_ALL_LABEL,
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

  const gridId = `portfolio-all-brands-${useId()}`;
  const closeTimeoutRef = useRef<number | null>(null);
  const [isGridMounted, setIsGridMounted] = useState(false);
  const [isGridRevealed, setIsGridRevealed] = useState(false);

  // Brand lists are authored oldest-to-newest (new clients get appended), so
  // reverse them for display to lead with the most recent work.
  const visibleCompanies = useMemo(
    () => [...(companies ?? [])].reverse(),
    [companies]
  );

  const gridCompanies = useMemo(() => {
    const source =
      allCompanies && allCompanies.length > 0
        ? allCompanies
        : masterCompanies.length > 0
          ? masterCompanies
          : companies ?? [];

    // A page's curated marquee list can overlap with the master list.
    const seen = new Set<string>();
    return [...source].reverse().filter((company) => {
      if (seen.has(company.id)) return false;
      seen.add(company.id);
      return true;
    });
  }, [allCompanies, companies]);

  const hasGrid = gridCompanies.length > 0;

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

  // Reveal the grid cards one frame after mounting so the transition runs.
  useEffect(() => {
    if (!isGridMounted) return;
    const frame = requestAnimationFrame(() => setIsGridRevealed(true));
    return () => cancelAnimationFrame(frame);
  }, [isGridMounted]);

  useEffect(
    () => () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    },
    []
  );

  const toggleGrid = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    if (isGridMounted) {
      setIsGridRevealed(false);
      const unmountDelay =
        (gridCompanies.length - 1) * GRID_CLOSE_STAGGER_MS + GRID_REVEAL_MS;
      closeTimeoutRef.current = window.setTimeout(() => {
        setIsGridMounted(false);
        closeTimeoutRef.current = null;
      }, unmountDelay);
      return;
    }

    setIsGridMounted(true);
  };

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

      {hasGrid && (
        <div className="section-shell mt-10 sm:mt-12">
          <div className="flex justify-center">
            <button
              type="button"
              onClick={toggleGrid}
              aria-expanded={isGridMounted}
              aria-controls={gridId}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3 text-center text-sm font-semibold tracking-[0.01em] text-content shadow-sm transition-colors duration-200 hover:bg-surface-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-2"
            >
              <span>{isGridMounted ? hideAllLabel : showAllLabel}</span>
              <svg
                className={`h-4 w-4 flex-shrink-0 transition-transform duration-300 ${
                  isGridMounted ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {isGridMounted && (
            <ul
              id={gridId}
              className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4"
            >
              {gridCompanies.map((company, index) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  variant="grid"
                  className={`transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
                    isGridRevealed
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${
                      isGridRevealed
                        ? index * GRID_OPEN_STAGGER_MS
                        : (gridCompanies.length - 1 - index) *
                          GRID_CLOSE_STAGGER_MS
                    }ms`,
                  }}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
};

export default PortfolioMarqueeSection;

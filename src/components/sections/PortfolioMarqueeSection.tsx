// src/components/PortfolioMarqueeSection.tsx
import React, { useState, useMemo, useRef, useEffect } from "react";
// The `Tab` type is no longer needed.
import type { Project } from "../../content/portfolioProjects";

// --- Props and Types ---

interface PortfolioMarqueeSectionProps {
  // The `tabs` and `defaultTab` props are removed.
  projects: Project[];
  durationSeconds?: number;
}

// --- Sub-components ---

const ProjectCard = ({ project }: { project: Project }) => {
  const cardContent = (
    <figure className="flex flex-col gap-3">
      {/* Phone-like container for the image */}
      <div className="aspect-[9/16] w-full overflow-hidden rounded-[1.75rem] bg-surface-strong/70 shadow-soft ring-1 ring-border/60 transition-shadow duration-300 group-hover:shadow-xl">
        <img
          src={project.image}
          alt={`Screenshot of the ${project.title} project`}
          className="h-full w-full object-cover"
          loading="lazy"
          width={240}
          height={427} // 9:16 aspect ratio
        />
      </div>
      <figcaption className="truncate px-2 text-center text-sm font-semibold text-content">
        {project.title}
      </figcaption>
    </figure>
  );

  const liClasses =
    "group w-[240px] flex-shrink-0 cursor-pointer rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-4";

  if (project.href) {
    return (
      <li className={liClasses}>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={project.title}
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
  projects,
  durationSeconds = 50, // Sped up from 80s to 50s as requested.
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

  // 1. All projects are now visible, no filtering needed.
  const visibleProjects = projects ?? [];

  // 2. ALWAYS duplicate projects for a seamless loop structure.
  const marqueeProjects = useMemo(
    () =>
      visibleProjects.length > 0
        ? [...visibleProjects, ...visibleProjects, ...visibleProjects, ...visibleProjects]
        : [],
    [visibleProjects]
  );

  // 3. Effect to determine if animation should play
  useEffect(() => {
    const container = marqueeContainerRef.current;
    const track = marqueeTrackRef.current;

    if (container && track) {
      const checkAnimation = () => {
        // We animate only if the original content width exceeds the container width.
        const singleContentWidth = track.scrollWidth / 2;
        const shouldAnimate = singleContentWidth > container.offsetWidth;
        setIsAnimating(shouldAnimate);
      };

      // Check immediately and on window resize.
      checkAnimation();
      window.addEventListener("resize", checkAnimation);

      return () => {
        window.removeEventListener("resize", checkAnimation);
      };
    }
  }, [visibleProjects]); // Re-run this logic if the projects prop ever changes.

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
  }, [visibleProjects, isAnimating, durationSeconds]);

  const marqueeStyle = {
    "--marquee-duration": `${durationSeconds}s`,
  } as React.CSSProperties;

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-highlight/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-[-80px] h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="section-shell">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <div className="pill inline-flex items-center justify-center gap-2 text-highlight">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M6 3h12l4 6-10 13L2 9l4-6Z" />
              <path d="M12 22 4 9l8-6 8 6-8 13Z" />
              <path d="M2 9h20" />
            </svg>
            Nuestro portafolio
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-content sm:text-4xl lg:text-5xl">
            Proyectos que demuestran lo que podemos construir juntos
          </h2>
          <p className="text-base text-muted sm:text-lg">
            Hemos colaborado con clientes de diversas industrias para crear soluciones web y moviles de alto impacto.
            Aqui puedes ver algunos ejemplos de nuestro trabajo.
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
          className={`marquee__track px-6 py-4 sm:px-8 sm:py-6 ${isAnimating ? "animate" : ""}`}
        >
          {marqueeProjects.map((project, index) => (
            <ProjectCard key={`${project.id}-${index}`} project={project} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PortfolioMarqueeSection;


// src/components/PortfolioMarqueeSection.tsx
import React, { useState, useMemo, useRef, useEffect } from "react";
// The `Tab` type is no longer needed.
import type { Project } from "../content/portfolioProjects";

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
      <div className="aspect-[9/16] w-full overflow-hidden rounded-[1.75rem] bg-gray-100 dark:bg-gray-800 shadow-md ring-4 ring-gray-900/5 dark:ring-white/10 transition-shadow duration-300 group-hover:shadow-xl">
        <img
          src={project.image}
          alt={`Screenshot of the ${project.title} project`}
          className="h-full w-full object-cover"
          loading="lazy"
          width={220}
          height={391} // 9:16 aspect ratio
        />
      </div>
      <figcaption className="truncate px-2 text-center text-sm font-medium text-gray-800 dark:text-gray-300">
        {project.title}
      </figcaption>
    </figure>
  );

  const liClasses =
    "group w-[220px] flex-shrink-0 cursor-pointer rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4";

  if (project.href) {
    return (
      <li className={liClasses}>
        <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={project.title} className="transition-transform duration-300 ease-in-out block hover:-translate-y-1.5">
          {cardContent}
        </a>
      </li>
    );
  }

  return (
    <li className={liClasses} tabIndex={0}>
       <div className="transition-transform duration-300 ease-in-out block hover:-translate-y-1.5">
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
  const visibleProjects = projects;

  // 2. ALWAYS duplicate projects for a seamless loop structure.
  const marqueeProjects = useMemo(
    () => [...visibleProjects, ...visibleProjects],
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
    <section className="py-16 sm:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-sky-500/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M6 3h12l4 6-10 13L2 9l4-6Z"/>
              <path d="M12 22 4 9l8-6 8 6-8 13Z"/>
              <path d="M2 9h20"/>
            </svg>
            Nuestro Portafolio
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Algunos de nuestros proyectos
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-white/60">
            Hemos colaborado con clientes de diversas industrias para crear soluciones web y móviles de alto impacto. Aquí puedes ver algunos ejemplos de nuestro trabajo.
          </p>
        </div>
      </div>
      <div
        ref={marqueeContainerRef}
        className="marquee mt-16"
        style={marqueeStyle}
      >
        <ul
          ref={marqueeTrackRef}
          className="p-4 marquee__track"
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

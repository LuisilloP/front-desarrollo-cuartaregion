const REVEAL_SELECTOR = "[data-reveal]";

const revealElement = (element: HTMLElement): void => {
  const delay = Number.parseInt(element.dataset.delay ?? "0", 10);

  if (Number.isFinite(delay) && delay > 0) {
    window.setTimeout(() => {
      element.classList.add("is-in");
    }, delay);
    return;
  }

  element.classList.add("is-in");
};

const disableAnimations = (): void => {
  document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element) => {
    element.style.opacity = "1";
    element.style.transform = "none";
    element.style.transition = "none";
  });
};

const observeRevealElements = (observer: IntersectionObserver): void => {
  document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element) => {
    if (element.classList.contains("is-in")) return;
    observer.observe(element);
  });
};

const initMotion = (): void => {
  const elements = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
  if (!elements.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (prefersReducedMotion.matches) {
    disableAnimations();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        revealElement(element);
        observer.unobserve(element);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.01,
    },
  );

  observeRevealElements(observer);
  document.addEventListener("astro:after-swap", () => observeRevealElements(observer));
};

if (typeof window !== "undefined") {
  initMotion();
}

export {};

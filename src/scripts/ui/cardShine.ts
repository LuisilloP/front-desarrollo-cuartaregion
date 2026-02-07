declare global {
  interface Window {
    __cardShineAfterSwapBound?: boolean;
  }
}

const updatePointerVars = (card: HTMLElement, event: MouseEvent): void => {
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  card.style.setProperty("--mouse-x", `${x}px`);
  card.style.setProperty("--mouse-y", `${y}px`);
};

const attachShineListeners = (selector: string): void => {
  document.querySelectorAll<HTMLElement>(selector).forEach((card) => {
    if (card.dataset.shineListener === "true") return;

    card.addEventListener("mousemove", (event) => updatePointerVars(card, event));
    card.dataset.shineListener = "true";
  });
};

export const initCardShine = (selector = ".card-shine"): void => {
  if (typeof window === "undefined") return;

  attachShineListeners(selector);

  if (window.__cardShineAfterSwapBound) return;
  document.addEventListener("astro:after-swap", () => attachShineListeners(selector));
  window.__cardShineAfterSwapBound = true;
};

type TypewriterOptions = {
  elementId: string;
  cursorSelector: string;
  text: string;
  speedMs?: number;
  startDelayMs?: number;
};

export const initHeroTypewriter = (options: TypewriterOptions): void => {
  if (typeof window === "undefined") return;

  const {
    elementId,
    cursorSelector,
    text,
    speedMs = 50,
    startDelayMs = 500
  } = options;

  const typewriter = document.getElementById(elementId);
  const cursor = document.querySelector<HTMLElement>(cursorSelector);

  if (!typewriter) return;

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mediaQuery.matches) {
    typewriter.textContent = text;
    if (cursor) cursor.style.display = "none";
    return;
  }

  let index = 0;
  const type = () => {
    if (index >= text.length) return;
    typewriter.textContent += text.charAt(index);
    index += 1;
    window.setTimeout(type, speedMs);
  };

  window.setTimeout(type, startDelayMs);
};

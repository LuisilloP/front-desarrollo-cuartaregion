/**
 * Premium Motion System
 * Inspired by Linear/Vercel/Stripe
 * Uses IntersectionObserver + CSS transforms/opacity
 */

type RevealType = 'fade-up' | 'blur-up';

interface RevealConfig {
    type: RevealType;
    delay: number;
    duration: number;
    once: boolean;
    stagger: boolean;
}

const DEFAULTS: RevealConfig = {
    type: 'fade-up',
    delay: 0,
    duration: 600,
    once: true,
    stagger: false,
};

class MotionSystem {
    private observer: IntersectionObserver | null = null;
    private prefersReducedMotion: boolean;

    constructor() {
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    private init() {
        // If reduced motion, make everything visible immediately
        if (this.prefersReducedMotion) {
            this.disableAnimations();
            return;
        }

        // Single observer for all reveal elements
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.reveal(entry.target as HTMLElement);
                    }
                });
            },
            {
                rootMargin: '0px 0px -12% 0px', // Trigger before fully in view
                threshold: 0.01,
            }
        );

        // Observe all elements with data-reveal
        this.observeElements();

        // Re-observe on Astro page transitions
        document.addEventListener('astro:after-swap', () => {
            this.observeElements();
        });
    }

    private observeElements() {
        const elements = document.querySelectorAll('[data-reveal]');
        elements.forEach((el) => {
            if (this.observer) {
                this.observer.observe(el);
            }
        });
    }

    private reveal(element: HTMLElement) {
        const config = this.getConfig(element);

        // Apply custom delay and duration via CSS variables
        if (config.delay > 0) {
            element.style.setProperty('--delay', `${config.delay}ms`);
        }
        if (config.duration !== DEFAULTS.duration) {
            element.style.setProperty('--dur', `${config.duration}ms`);
        }

        // Apply reveal after delay
        setTimeout(() => {
            element.classList.add('is-in');

            // Handle stagger for children
            if (config.stagger) {
                this.applyStagger(element);
            }

            // Unobserve if once
            if (config.once && this.observer) {
                this.observer.unobserve(element);
            }
        }, config.delay);
    }

    private applyStagger(parent: HTMLElement) {
        const children = parent.querySelectorAll('[data-reveal]');
        children.forEach((child, index) => {
            const childDelay = index * 70; // 70ms stagger (Stripe-inspired)
            const childEl = child as HTMLElement;

            setTimeout(() => {
                childEl.classList.add('is-in');
            }, childDelay);
        });
    }

    private getConfig(element: HTMLElement): RevealConfig {
        return {
            type: (element.dataset.reveal as RevealType) || DEFAULTS.type,
            delay: parseInt(element.dataset.delay || String(DEFAULTS.delay)),
            duration: parseInt(element.dataset.duration || String(DEFAULTS.duration)),
            once: element.dataset.once !== 'false', // Default true
            stagger: element.dataset.stagger === 'children',
        };
    }

    private disableAnimations() {
        // For reduced motion, make everything visible immediately
        const elements = document.querySelectorAll('[data-reveal]');
        elements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.opacity = '1';
            htmlEl.style.transform = 'none';
            htmlEl.style.filter = 'none';
            htmlEl.style.transition = 'none';
        });
    }
}

// Auto-initialize
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new MotionSystem();
        });
    } else {
        new MotionSystem();
    }
}

export default MotionSystem;

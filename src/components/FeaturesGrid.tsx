import React from "react";
import { Icon } from "@iconify/react";
import { motion, useReducedMotion } from "framer-motion";

interface Feature {
  title: string;
  description: string;
  step: string;
  icon: React.ReactNode;
}

interface FeaturesGridProps {
  features?: Feature[];
  eyebrow?: string;
  heading?: string;
  subheading?: string;
}

const defaultFeatures: Feature[] = [
  {
    step: "PASO 01",
    title: "Nos cuentas tu idea y tu realidad",
    description:
      "Conversamos contigo para entender tu negocio, tus objetivos y qué te está quitando tiempo hoy.",
    icon: <Icon icon="lucide:users" className="h-5 w-5" />
  },
  {
    step: "PASO 02",
    title: "Te entregamos un plan claro",
    description:
      "Te mostramos opciones simples (y prioridades) para que sepas qué hacer primero y por qué.",
    icon: <Icon icon="lucide:clipboard-check" className="h-5 w-5" />
  },
  {
    step: "PASO 03",
    title: "Lo revisamos juntos",
    description:
      "Afinamos el plan contigo, resolvemos dudas y dejamos todo alineado a tu presupuesto y tiempos.",
    icon: <Icon icon="lucide:messages-square" className="h-5 w-5" />
  },
  {
    step: "PASO 04",
    title: "Manos a la obra (con soporte real)",
    description:
      "Implementamos la solución, la dejamos funcionando y te acompañamos para que le saques provecho.",
    icon: <Icon icon="lucide:rocket" className="h-5 w-5" />
  }
];

const FeaturesGrid: React.FC<FeaturesGridProps> = ({
  features = defaultFeatures,
  eyebrow = "Nuestro proceso",
  heading = "Así trabajamos contigo, paso a paso",
  subheading = "Un proceso simple: te escuchamos, te proponemos mejoras claras y las implementamos contigo para que todo funcione desde el primer día."
}) => {
  const reducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.12,
        delayChildren: reducedMotion ? 0 : 0.08
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: reducedMotion ? 0 : 24
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const hoverShadow =
    "0 24px 48px rgba(14, 116, 144, 0.18), 0 0 0 1px rgba(56, 189, 248, 0.45)";

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-sky-500/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-300">
            <Icon icon="lucide:rocket" className="h-4 w-4" />
            {eyebrow}
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            {heading}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-white/60">
            {subheading}
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.article
              key={`${feature.title}-${index}`}
              variants={itemVariants}
              transition={reducedMotion ? { duration: 0.2 } : { type: "spring", stiffness: 260, damping: 24 }}
              whileHover={reducedMotion ? { boxShadow: hoverShadow } : { y: -8, boxShadow: hoverShadow }}
              className="group relative flex h-full flex-col gap-4 rounded-2xl border border-slate-800/50 bg-white/90 p-6 text-left shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur dark:bg-slate-900/70"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-800/50 bg-slate-100 text-slate-900 shadow-[0_8px_16px_rgba(15,23,42,0.12)] dark:bg-slate-800 dark:text-white">
                {feature.icon}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  {feature.step}
                </p>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </div>
              <div className="mt-auto h-px w-full bg-gradient-to-r from-transparent via-slate-800/50 to-transparent opacity-60" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesGrid;

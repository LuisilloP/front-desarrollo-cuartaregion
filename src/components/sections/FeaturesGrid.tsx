import React from "react";
import { Icon } from "@iconify/react";
import { motion, useReducedMotion } from "framer-motion";

interface Feature {
  title: string;
  description: string;
  step: string;
  imageSrc: string;
  imageAlt: string;
  orderClass?: string;
  offsetClass?: string;
  reverse?: boolean;
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
    title: "Conocemos tu realidad",
    description:
      "Escuchamos tus objetivos y lo que hoy te quita foco para partir con claridad.",
    imageSrc: "/images/hero/hero-coquimbo.webp",
    imageAlt: "Reuni?n de diagn?stico",
    orderClass: "lg:order-1",
    offsetClass: "lg:translate-y-0"
  },
  {
    step: "PASO 02",
    title: "Definimos el foco",
    description:
      "Ordenamos necesidades y resultados esperados para avanzar con orden.",
    imageSrc: "/images/hero/hero-serena.webp",
    imageAlt: "Levantamiento de objetivos",
    orderClass: "lg:order-2",
    offsetClass: "lg:translate-y-6"
  },
  {
    step: "PASO 03",
    title: "Plan y tiempos claros",
    description:
      "Te proponemos un plan simple con hitos, plazos y costos transparentes.",
    imageSrc: "/images/hero/hero-astro.webp",
    imageAlt: "Planificaci?n del proyecto",
    orderClass: "lg:order-3",
    offsetClass: "lg:translate-y-12"
  },
  {
    step: "PASO 04",
    title: "Construcci?n en etapas",
    description:
      "Desarrollamos por bloques y compartimos avances frecuentes para validar a tiempo.",
    imageSrc: "/images/hero/hero-cielo.webp",
    imageAlt: "Trabajo en construcci?n",
    orderClass: "lg:order-6",
    offsetClass: "lg:translate-y-12",
    reverse: true
  },
  {
    step: "PASO 05",
    title: "Validaci?n contigo",
    description:
      "Revisamos cada hito y ajustamos lo necesario antes de avanzar.",
    imageSrc: "/images/portfolio/cases/inventario-sistemas.webp",
    imageAlt: "Revisi?n de avances",
    orderClass: "lg:order-5",
    offsetClass: "lg:translate-y-6",
    reverse: true
  },
  {
    step: "PASO 06",
    title: "Entrega y acompa?amiento",
    description:
      "Dejamos todo funcionando y te apoyamos despu?s para que la soluci?n rinda.",
    imageSrc: "/images/portfolio/cases/turismo-coquimbo.webp",
    imageAlt: "Entrega y seguimiento",
    orderClass: "lg:order-4",
    offsetClass: "lg:translate-y-0",
    reverse: true
  }
];

const FeaturesGrid: React.FC<FeaturesGridProps> = ({
  features = defaultFeatures,
  eyebrow = "Nuestro proceso",
  heading = "Nuestro proceso contigo",
  subheading = "Seis pasos claros para entender tu negocio, ordenar prioridades y acompañarte de principio a fin."
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
          className="grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          {features.map((feature, index) => (
            <motion.article
              key={`${feature.title}-${index}`}
              variants={itemVariants}
              transition={
                reducedMotion
                  ? { duration: 0.2 }
                  : { type: "spring", stiffness: 260, damping: 24 }
              }
              whileHover={reducedMotion ? {} : { y: -6 }}
              className={`group h-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow-[0_18px_50px_rgba(15,23,42,0.35)] backdrop-blur ${
                feature.orderClass ?? ""
              } ${feature.offsetClass ?? ""}`}
            >
              <div
                className={`flex h-full flex-col ${
                  feature.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                <div className="relative w-full overflow-hidden lg:w-5/12">
                  <img
                    src={feature.imageSrc}
                    alt={feature.imageAlt}
                    loading="lazy"
                    className="h-56 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 lg:h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/50 via-slate-900/10 to-transparent" />
                </div>
                <div
                  className={`flex w-full flex-col justify-center gap-3 p-6 lg:w-7/12 lg:p-8 ${
                    feature.reverse ? "lg:text-right lg:items-end" : "lg:text-left"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    {feature.step}
                  </p>
                  <h3 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesGrid;

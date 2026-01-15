"use client";

import {
  faEye,
  faMapLocationDot,
  faArrowTrendUp,
} from "@fortawesome/pro-solid-svg-icons";
import StepItem from "@/components/ui/StepItem";
import { motion } from "framer-motion";

const steps = [
  {
    step: 1,
    icon: faEye,
    title: "Spot a problem",
    description:
      "See an issue in your neighborhood? Roads, lighting, drainage, waste, or safety concerns – we cover it all.",
  },
  {
    step: 2,
    icon: faMapLocationDot,
    title: "Drop a pin & snap a photo",
    description:
      "Use our Mapbox-powered location picker to mark the exact spot. Add a photo to help authorities understand the issue.",
  },
  {
    step: 3,
    icon: faArrowTrendUp,
    title: "Track progress",
    description:
      'Follow your report from "Submitted" to "In Progress" to "Resolved". Get notified when action is taken.',
  },
];

const HowItWorksSection = () => {
  const easeOut = [0.16, 1, 0.3, 1] as const;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance font-[family-name:var(--font-heading)]">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Reporting a city issue takes less than a minute. Here&apos;s how
            WahalaFix makes it simple.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-8 md:gap-12"
        >
          {steps.map((step) => (
            <motion.div key={step.step} variants={itemVariants}>
              <StepItem {...step} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

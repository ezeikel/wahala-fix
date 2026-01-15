"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldCheck,
  faHandshake,
  faGlobe,
  faLock,
} from "@fortawesome/pro-regular-svg-icons";
import { motion } from "framer-motion";

const trustPoints = [
  {
    icon: faHandshake,
    title: "Working with Local Authorities",
    description:
      "We partner directly with Lagos State government agencies to ensure reports reach the right departments.",
  },
  {
    icon: faGlobe,
    title: "Expanding Across Nigeria",
    description:
      "Starting with Lagos, we plan to roll out WahalaFix to other major Nigerian cities in 2026.",
  },
  {
    icon: faShieldCheck,
    title: "Data Privacy First",
    description:
      "Your personal information is protected. We only share location and issue details with authorities.",
  },
  {
    icon: faLock,
    title: "Responsible Handling",
    description:
      "All citizen reports are handled with care and transparency. Track every step of the process.",
  },
];

const TrustSection = () => {
  const easeOut = [0.16, 1, 0.3, 1] as const;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance font-[family-name:var(--font-heading)]">
            Building trust, one fix at a time
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            WahalaFix is committed to transparent, responsible civic engagement.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {trustPoints.map((point) => {
            return (
              <motion.div
                key={point.title}
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon
                    icon={point.icon}
                    className="text-primary"
                    size="lg"
                  />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {point.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;

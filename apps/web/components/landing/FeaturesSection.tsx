"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLandmark,
  faBell,
  faUserSlash,
  faChartColumn,
  faMapLocationDot,
  faClipboardList,
  faFire,
} from "@fortawesome/pro-regular-svg-icons";
import Card from "@/components/ui/Card";
import { motion } from "framer-motion";

const residentFeatures = [
  {
    icon: faClipboardList,
    title: "Simple Reporting",
    description:
      "Report issues in under 60 seconds with our streamlined mobile-first form.",
  },
  {
    icon: faBell,
    title: "Status Tracking",
    description:
      "Real-time updates on your reports from submission to resolution.",
  },
  {
    icon: faUserSlash,
    title: "Optional Anonymity",
    description:
      "Choose to report anonymously if you prefer to protect your identity.",
  },
];

const governmentFeatures = [
  {
    icon: faChartColumn,
    title: "Cleaner Data",
    description:
      "Structured, validated reports with consistent categorization.",
  },
  {
    icon: faMapLocationDot,
    title: "Geotagged Reports",
    description: "Every report comes with precise GPS coordinates and photos.",
  },
  {
    icon: faFire,
    title: "Hotspot Analysis",
    description:
      "Identify problem areas with clustered map views and analytics.",
  },
];

const FeaturesSection = () => {
  const featureItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <section id="features" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance font-[family-name:var(--font-heading)]">
            Built for everyone
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            WahalaFix bridges the gap between residents who spot problems and
            authorities who can fix them.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* For Residents - Card slides in from left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-primary"
                    size="xl"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                  For Residents
                </h3>
              </div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {residentFeatures.map((feature, i) => {
                  return (
                    <motion.div
                      key={feature.title}
                      custom={i}
                      variants={featureItemVariants}
                      className="flex gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <FontAwesomeIcon
                          icon={feature.icon}
                          className="text-primary"
                          size="lg"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </Card>
          </motion.div>

          {/* For Government - Card slides in from right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faLandmark}
                    className="text-accent-foreground"
                    size="xl"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                  For Government
                </h3>
              </div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {governmentFeatures.map((feature, i) => {
                  return (
                    <motion.div
                      key={feature.title}
                      custom={i}
                      variants={featureItemVariants}
                      className="flex gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <FontAwesomeIcon
                          icon={feature.icon}
                          className="text-primary"
                          size="lg"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

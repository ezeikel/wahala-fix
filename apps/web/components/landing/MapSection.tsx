"use client";

import MapPreview from "@/components/ui/MapPreview";
import { motion } from "framer-motion";

const MapSection = () => {
  return (
    <section id="map" className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance font-[family-name:var(--font-heading)]">
            See what&apos;s happening in your city
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore reported issues across Lagos. Filter by category to find
            specific problems in your area.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <MapPreview />
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;

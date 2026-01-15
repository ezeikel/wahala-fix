"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faRoad,
  faLightbulb,
  faTrash,
} from "@fortawesome/pro-regular-svg-icons";
import SecondaryButton from "@/components/ui/SecondaryButton";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import AppStoreButtons from "@/components/ui/AppStoreButtons";
import { motion } from "framer-motion";
import Map, { Marker } from "react-map-gl/mapbox";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
const LAGOS_CENTER = { latitude: 6.5244, longitude: 3.3792 };

const HeroSection = () => {
  const easeOut = [0.16, 1, 0.3, 1] as const;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  const mapCardVariants = {
    hidden: { opacity: 0, scale: 0.95, x: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.6, ease: easeOut, delay: 0.3 },
    },
  };

  const heroMarkers = [
    {
      id: "construction",
      latitude: 6.4281,
      longitude: 3.4219,
      icon: faRoad,
      className: "bg-orange-500",
      delay: 0.8,
    },
    {
      id: "light",
      latitude: 6.5151,
      longitude: 3.3763,
      icon: faLightbulb,
      className: "bg-yellow-500",
      delay: 1.0,
    },
    {
      id: "waste",
      latitude: 6.4474,
      longitude: 3.472,
      icon: faTrash,
      className: "bg-red-500",
      delay: 1.2,
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance font-[family-name:var(--font-heading)]"
            >
              Report city problems{" "}
              <span className="text-primary">in seconds.</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
            >
              WahalaFix lets residents snap a photo, drop a pin, and notify the
              right authorities about issues like potholes, broken streetlights,
              flooding, and waste.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <AppStoreButtons />
              <SecondaryButton href="#map">See live issues</SecondaryButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-12 grid grid-cols-3 gap-6"
            >
              <div>
                <p className="text-3xl font-bold text-primary">
                  <AnimatedCounter
                    value={2.4}
                    decimals={1}
                    suffix="K+"
                    duration={2.5}
                  />
                </p>
                <p className="text-sm text-muted-foreground">Issues Reported</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">
                  <AnimatedCounter value={78} suffix="%" duration={2} />
                </p>
                <p className="text-sm text-muted-foreground">Resolution Rate</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">
                  <AnimatedCounter value={48} suffix="h" duration={2} />
                </p>
                <p className="text-sm text-muted-foreground">Avg Response</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Map Card */}
          <motion.div
            variants={mapCardVariants}
            initial="hidden"
            animate="visible"
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="relative bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
                <div className="relative aspect-[4/3] bg-muted">
                  <Map
                    initialViewState={{
                      latitude: LAGOS_CENTER.latitude,
                      longitude: LAGOS_CENTER.longitude,
                      zoom: 11.5,
                    }}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    mapboxAccessToken={MAPBOX_TOKEN}
                    interactive={false}
                    className="absolute inset-0"
                  >
                    {heroMarkers.map((marker) => {
                      return (
                        <Marker
                          key={marker.id}
                          latitude={marker.latitude}
                          longitude={marker.longitude}
                          anchor="bottom"
                        >
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              delay: marker.delay,
                              duration: 0.4,
                              type: "spring",
                              stiffness: 200,
                            }}
                          >
                            <div
                              className={`w-10 h-10 rounded-full ${marker.className} flex items-center justify-center shadow-lg animate-pulse`}
                            >
                              <FontAwesomeIcon
                                icon={marker.icon}
                                className="text-white"
                                size="lg"
                              />
                            </div>
                          </motion.div>
                        </Marker>
                      );
                    })}
                  </Map>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />

                {/* Location Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm rounded-xl p-4 shadow-lg"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="text-primary"
                        size="lg"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        Lagos, Nigeria
                      </p>
                      <p className="text-sm text-muted-foreground">
                        6 active issues nearby
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="absolute -z-10 -top-4 -right-4 w-full h-full rounded-2xl bg-primary/10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

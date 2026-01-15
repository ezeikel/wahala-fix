"use client";

import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/pro-regular-svg-icons";
import MapPreview from "@/components/ui/MapPreview";
import { motion } from "framer-motion";

type FilterType = "roads" | "light" | "flooding" | "waste";

type CityMarker = {
  type: FilterType;
  latitude: number;
  longitude: number;
  label: string;
};

type CityConfig = {
  name: string;
  label: string;
  center: { latitude: number; longitude: number };
  zoom: number;
  markers: CityMarker[];
};

const cityConfigs: CityConfig[] = [
  {
    name: "Lagos",
    label: "Lagos",
    center: { latitude: 6.5244, longitude: 3.3792 },
    zoom: 11.8,
    markers: [
      {
        type: "roads",
        latitude: 6.4966,
        longitude: 3.3499,
        label: "Pothole - Surulere",
      },
      {
        type: "light",
        latitude: 6.4541,
        longitude: 3.4351,
        label: "Broken Light - Ikoyi",
      },
      {
        type: "flooding",
        latitude: 6.4474,
        longitude: 3.472,
        label: "Flooding - Lekki Phase 1",
      },
      {
        type: "waste",
        latitude: 6.451,
        longitude: 3.3609,
        label: "Waste Dump - Apapa",
      },
      {
        type: "roads",
        latitude: 6.6018,
        longitude: 3.3515,
        label: "Road Damage - Ikeja",
      },
      {
        type: "light",
        latitude: 6.5151,
        longitude: 3.3763,
        label: "Light Outage - Yaba",
      },
    ],
  },
  {
    name: "Abuja",
    label: "Abuja (FCT)",
    center: { latitude: 9.0765, longitude: 7.3986 },
    zoom: 12,
    markers: [
      {
        type: "roads",
        latitude: 9.0337,
        longitude: 7.493,
        label: "Pothole - Garki",
      },
      {
        type: "light",
        latitude: 9.076,
        longitude: 7.463,
        label: "Broken Light - Wuse",
      },
      {
        type: "flooding",
        latitude: 9.0636,
        longitude: 7.421,
        label: "Flooding - Jabi",
      },
      {
        type: "waste",
        latitude: 9.095,
        longitude: 7.495,
        label: "Waste Dump - Maitama",
      },
      {
        type: "roads",
        latitude: 9.1075,
        longitude: 7.4017,
        label: "Road Damage - Gwarimpa",
      },
      {
        type: "light",
        latitude: 8.9919,
        longitude: 7.436,
        label: "Light Outage - Lugbe",
      },
    ],
  },
  {
    name: "Kano",
    label: "Kano",
    center: { latitude: 12.0022, longitude: 8.592 },
    zoom: 12,
    markers: [
      {
        type: "roads",
        latitude: 12.0036,
        longitude: 8.5176,
        label: "Pothole - Fagge",
      },
      {
        type: "light",
        latitude: 12.0118,
        longitude: 8.5317,
        label: "Broken Light - Nassarawa",
      },
      {
        type: "flooding",
        latitude: 12.0019,
        longitude: 8.56,
        label: "Flooding - Tarauni",
      },
      {
        type: "waste",
        latitude: 12.0319,
        longitude: 8.4882,
        label: "Waste Dump - Dala",
      },
      {
        type: "roads",
        latitude: 12.0113,
        longitude: 8.4877,
        label: "Road Damage - Gwale",
      },
      {
        type: "light",
        latitude: 12.0086,
        longitude: 8.5406,
        label: "Light Outage - Sabon Gari",
      },
    ],
  },
  {
    name: "Port Harcourt",
    label: "Port Harcourt",
    center: { latitude: 4.8156, longitude: 7.0498 },
    zoom: 12.2,
    markers: [
      {
        type: "roads",
        latitude: 4.818,
        longitude: 7.038,
        label: "Pothole - GRA",
      },
      {
        type: "light",
        latitude: 4.8066,
        longitude: 7.0345,
        label: "Broken Light - Trans Amadi",
      },
      {
        type: "flooding",
        latitude: 4.8169,
        longitude: 7.0322,
        label: "Flooding - Diobu",
      },
      {
        type: "waste",
        latitude: 4.8902,
        longitude: 7.0371,
        label: "Waste Dump - Rumuokoro",
      },
      {
        type: "roads",
        latitude: 4.8077,
        longitude: 7.0246,
        label: "Road Damage - Mile 3",
      },
      {
        type: "light",
        latitude: 4.8105,
        longitude: 7.0111,
        label: "Light Outage - Rumuola",
      },
    ],
  },
  {
    name: "Ibadan",
    label: "Ibadan",
    center: { latitude: 7.3775, longitude: 3.947 },
    zoom: 12,
    markers: [
      {
        type: "roads",
        latitude: 7.4295,
        longitude: 3.9289,
        label: "Pothole - Bodija",
      },
      {
        type: "light",
        latitude: 7.3964,
        longitude: 3.8977,
        label: "Broken Light - Agodi",
      },
      {
        type: "flooding",
        latitude: 7.3897,
        longitude: 3.949,
        label: "Flooding - Iwo Road",
      },
      {
        type: "waste",
        latitude: 7.4058,
        longitude: 3.9149,
        label: "Waste Dump - Mokola",
      },
      {
        type: "roads",
        latitude: 7.3546,
        longitude: 3.9125,
        label: "Road Damage - Challenge",
      },
      {
        type: "light",
        latitude: 7.351,
        longitude: 3.9096,
        label: "Light Outage - Apata",
      },
    ],
  },
  {
    name: "Enugu",
    label: "Enugu",
    center: { latitude: 6.4402, longitude: 7.4943 },
    zoom: 12.3,
    markers: [
      {
        type: "roads",
        latitude: 6.4479,
        longitude: 7.5116,
        label: "Pothole - Independence Layout",
      },
      {
        type: "light",
        latitude: 6.4525,
        longitude: 7.5031,
        label: "Broken Light - GRA",
      },
      {
        type: "flooding",
        latitude: 6.4511,
        longitude: 7.5321,
        label: "Flooding - Abakpa",
      },
      {
        type: "waste",
        latitude: 6.4529,
        longitude: 7.4949,
        label: "Waste Dump - New Haven",
      },
      {
        type: "roads",
        latitude: 6.4583,
        longitude: 7.4957,
        label: "Road Damage - Ogui",
      },
      {
        type: "light",
        latitude: 6.4394,
        longitude: 7.4873,
        label: "Light Outage - Uwani",
      },
    ],
  },
  {
    name: "Kaduna",
    label: "Kaduna",
    center: { latitude: 10.5105, longitude: 7.4165 },
    zoom: 12,
    markers: [
      {
        type: "roads",
        latitude: 10.5268,
        longitude: 7.4388,
        label: "Pothole - Kaduna North",
      },
      {
        type: "light",
        latitude: 10.4846,
        longitude: 7.4404,
        label: "Broken Light - Tudun Wada",
      },
      {
        type: "flooding",
        latitude: 10.3842,
        longitude: 7.4867,
        label: "Flooding - Sabon Tasha",
      },
      {
        type: "waste",
        latitude: 10.4746,
        longitude: 7.416,
        label: "Waste Dump - Kakuri",
      },
      {
        type: "roads",
        latitude: 10.5639,
        longitude: 7.4524,
        label: "Road Damage - Kawo",
      },
      {
        type: "light",
        latitude: 10.4781,
        longitude: 7.4182,
        label: "Light Outage - Barnawa",
      },
    ],
  },
  {
    name: "Benin City",
    label: "Benin City",
    center: { latitude: 6.335, longitude: 5.6037 },
    zoom: 12.1,
    markers: [
      {
        type: "roads",
        latitude: 6.3994,
        longitude: 5.6105,
        label: "Pothole - Ugbowo",
      },
      {
        type: "light",
        latitude: 6.3381,
        longitude: 5.6278,
        label: "Broken Light - Ring Road",
      },
      {
        type: "flooding",
        latitude: 6.3004,
        longitude: 5.6372,
        label: "Flooding - Ikpoba Hill",
      },
      {
        type: "waste",
        latitude: 6.3493,
        longitude: 5.5954,
        label: "Waste Dump - GRA",
      },
      {
        type: "roads",
        latitude: 6.3878,
        longitude: 5.617,
        label: "Road Damage - Uselu",
      },
      {
        type: "light",
        latitude: 6.3208,
        longitude: 5.6796,
        label: "Light Outage - Aduwawa",
      },
    ],
  },
];

const MapSection = () => {
  const [selectedCity, setSelectedCity] = useState(cityConfigs[0].name);
  const city = useMemo(
    () =>
      cityConfigs.find((item) => item.name === selectedCity) ?? cityConfigs[0],
    [selectedCity],
  );

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
            See what&apos;s happening in {city.label}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Switch cities to explore reported issues across Nigeria. Filter by
            category to find specific problems in your area.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-center">
              <label className="inline-flex items-center gap-3 text-sm font-medium text-foreground">
                City
                <div className="relative">
                  <select
                    value={selectedCity}
                    onChange={(event) => setSelectedCity(event.target.value)}
                    className="appearance-none rounded-lg border border-border bg-card px-3 py-2 pr-10 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {cityConfigs.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <FontAwesomeIcon icon={faChevronDown} size="sm" />
                  </span>
                </div>
              </label>
            </div>
            <MapPreview key={city.name} city={city} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;

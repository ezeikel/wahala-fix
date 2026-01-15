"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faRoad,
  faLightbulb,
  faDroplet,
  faTrashCan,
} from "@fortawesome/pro-regular-svg-icons";
import Map, { Marker as MapMarker } from "react-map-gl/mapbox";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
const LAGOS_CENTER = { latitude: 6.5244, longitude: 3.3792 };

type FilterType = "all" | "roads" | "light" | "flooding" | "waste";

type MarkerProps = {
  type: FilterType;
  latitude: number;
  longitude: number;
  label: string;
  active: boolean;
};

const markers: Omit<MarkerProps, "active">[] = [
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
];

const filterConfig: Record<
  FilterType,
  { icon: IconDefinition; label: string }
> = {
  all: { icon: faLocationDot, label: "All Issues" },
  roads: { icon: faRoad, label: "Roads" },
  light: { icon: faLightbulb, label: "Lighting" },
  flooding: { icon: faDroplet, label: "Flooding" },
  waste: { icon: faTrashCan, label: "Waste" },
};

const IssueMarker = ({
  type,
  latitude,
  longitude,
  label,
  active,
}: MarkerProps) => {
  return (
    <MapMarker longitude={longitude} latitude={latitude} anchor="bottom">
      <div
        className={cn(
          "relative transform transition-all duration-300 group cursor-pointer",
          active ? "scale-100 opacity-100" : "scale-75 opacity-40",
        )}
      >
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center shadow-lg",
            type === "roads" && "bg-orange-500",
            type === "light" && "bg-yellow-500",
            type === "flooding" && "bg-blue-500",
            type === "waste" && "bg-red-500",
          )}
        >
          <FontAwesomeIcon
            icon={filterConfig[type].icon}
            className="text-white"
            size="sm"
          />
        </div>
        <div
          className="absolute w-0 h-0 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-current"
          style={{
            color:
              type === "roads"
                ? "#f97316"
                : type === "light"
                  ? "#eab308"
                  : type === "flooding"
                    ? "#3b82f6"
                    : "#ef4444",
          }}
        />
        <div
          className={cn(
            "absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-card rounded text-xs font-medium whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity",
            !active && "hidden",
          )}
        >
          {label}
        </div>
      </div>
    </MapMarker>
  );
};

const MapPreview = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  if (!MAPBOX_TOKEN) {
    return (
      <div className="w-full">
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {(Object.keys(filterConfig) as FilterType[]).map((filter) => {
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80",
                )}
              >
                <FontAwesomeIcon icon={filterConfig[filter].icon} size="sm" />
                {filterConfig[filter].label}
              </button>
            );
          })}
        </div>
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden bg-muted border border-border flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Mapbox token missing.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {(Object.keys(filterConfig) as FilterType[]).map((filter) => {
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
            >
              <FontAwesomeIcon icon={filterConfig[filter].icon} size="sm" />
              {filterConfig[filter].label}
            </button>
          );
        })}
      </div>

      {/* Map Container */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden bg-muted border border-border">
        <Map
          initialViewState={{
            latitude: LAGOS_CENTER.latitude,
            longitude: LAGOS_CENTER.longitude,
            zoom: 11.8,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={MAPBOX_TOKEN}
          scrollZoom
          dragPan
          doubleClickZoom
          touchZoomRotate
          cooperativeGestures
          dragRotate={false}
          pitchWithRotate={false}
          minZoom={10}
          maxZoom={16}
          className="absolute inset-0"
        >
          {/* Markers */}
          {markers.map((marker, index) => (
            <IssueMarker
              key={index}
              {...marker}
              active={activeFilter === "all" || activeFilter === marker.type}
            />
          ))}
        </Map>

        {/* Map Overlay */}
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />

        {/* Lagos Label */}
        <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
          <p className="text-xs text-muted-foreground">Viewing</p>
          <p className="font-semibold text-foreground">Lagos, Nigeria</p>
        </div>

        {/* Issue Count */}
        <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
          <p className="text-xs text-muted-foreground">Active Issues</p>
          <p className="font-bold text-2xl text-primary">
            {activeFilter === "all"
              ? markers.length
              : markers.filter((m) => m.type === activeFilter).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapPreview;

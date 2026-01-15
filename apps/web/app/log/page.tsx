"use client";

import type React from "react";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Map, { NavigationControl, GeolocateControl } from "react-map-gl/mapbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCamera,
  faXmark,
  faChevronLeft,
  faChevronRight,
  faCheck,
  faArrowUpFromBracket,
  faCrosshairs,
  faMagnifyingGlass,
  faClock,
  faEye,
} from "@fortawesome/pro-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import type mapboxgl from "mapbox-gl"; // Import mapboxgl

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

const CATEGORIES = [
  { id: "roads", label: "Roads", icon: "🛣️" },
  { id: "streetlights", label: "Streetlights", icon: "💡" },
  { id: "flooding", label: "Flooding", icon: "🌊" },
  { id: "waste", label: "Waste", icon: "🗑️" },
  { id: "safety", label: "Safety", icon: "⚠️" },
  { id: "other", label: "Other", icon: "📝" },
];

// Lagos coordinates as default
const DEFAULT_CENTER = { latitude: 6.5244, longitude: 3.3792 };

type FormData = {
  category: string;
  title: string;
  description: string;
  location: { lat: number; lng: number } | null;
  address: string;
  photos: File[];
  photoPreviewUrls: string[];
  name: string;
  email: string;
  phone: string;
  anonymous: boolean;
};

const LogProblemPage = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    Array<{ place_name: string; center: [number, number] }>
  >([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    category: "",
    title: "",
    description: "",
    location: null,
    address: "",
    photos: [],
    photoPreviewUrls: [],
    name: "",
    email: "",
    phone: "",
    anonymous: false,
  });

  const [viewState, setViewState] = useState({
    latitude: DEFAULT_CENTER.latitude,
    longitude: DEFAULT_CENTER.longitude,
    zoom: 14,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const geolocateControlRef = useRef<mapboxgl.GeolocateControl>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reverse geocode current map center
  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    if (!MAPBOX_TOKEN) return;
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`,
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        setFormData((prev) => ({
          ...prev,
          address: data.features[0].place_name,
          location: { lat, lng },
        }));
      }
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
    }
  }, []);

  // Search for locations
  const searchLocations = useCallback(async (query: string) => {
    if (!query.trim() || !MAPBOX_TOKEN) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_TOKEN}&country=ng&limit=5`,
      );
      const data = await response.json();
      setSearchResults(data.features || []);
      setShowSearchResults(true);
    } catch (error) {
      console.error("Search failed:", error);
    }
  }, []);

  // Handle search input with debounce
  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      searchLocations(value);
    }, 300);
  };

  // Select a search result
  const selectSearchResult = (result: {
    place_name: string;
    center: [number, number];
  }) => {
    setViewState({
      latitude: result.center[1],
      longitude: result.center[0],
      zoom: 16,
    });
    setFormData((prev) => ({
      ...prev,
      address: result.place_name,
      location: { lat: result.center[1], lng: result.center[0] },
    }));
    setSearchQuery("");
    setShowSearchResults(false);
  };

  // Handle map move end
  const handleMoveEnd = useCallback(() => {
    reverseGeocode(viewState.latitude, viewState.longitude);
  }, [viewState.latitude, viewState.longitude, reverseGeocode]);

  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.photos.length > 3) {
      setErrors((prev) => ({ ...prev, photos: "Maximum 3 photos allowed" }));
      return;
    }
    const newPhotos = [...formData.photos, ...files].slice(0, 3);
    const newPreviewUrls = newPhotos.map((file) => URL.createObjectURL(file));

    // Cleanup old preview URLs
    formData.photoPreviewUrls.forEach((url) => URL.revokeObjectURL(url));

    setFormData((prev) => ({
      ...prev,
      photos: newPhotos,
      photoPreviewUrls: newPreviewUrls,
    }));
    setErrors((prev) => ({ ...prev, photos: "" }));
  };

  // Remove a photo
  const removePhoto = (index: number) => {
    URL.revokeObjectURL(formData.photoPreviewUrls[index]);
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
      photoPreviewUrls: prev.photoPreviewUrls.filter((_, i) => i !== index),
    }));
  };

  // Validate current step
  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.category) newErrors.category = "Please select a category";
      if (!formData.title.trim()) newErrors.title = "Please enter a title";
    }

    if (step === 2) {
      if (!formData.location)
        newErrors.location = "Please select a location on the map";
    }

    if (step === 3) {
      if (!formData.description.trim() && formData.photos.length === 0) {
        newErrors.photos = "Please add a description or at least one photo";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle step navigation
  const goToNextStep = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const goToPrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateStep()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate reference ID
    const refId = `WFX-${Date.now().toString(36).toUpperCase()}`;
    setReferenceId(refId);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  // Try to get user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setViewState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 16,
          });
          reverseGeocode(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Geolocation denied, stay on Lagos
          reverseGeocode(DEFAULT_CENTER.latitude, DEFAULT_CENTER.longitude);
        },
      );
    }
  }, [reverseGeocode]);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      formData.photoPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [formData.photoPreviewUrls]);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="sticky top-0 z-50 bg-card border-b border-border px-4 py-4">
          <Link
            href="/"
            className="text-xl font-bold text-primary font-[family-name:var(--font-heading)]"
          >
            WahalaFix
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-card rounded-2xl shadow-lg p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FontAwesomeIcon
                icon={faCheck}
                className="w-10 h-10 text-primary"
              />
            </motion.div>

            <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)] mb-2">
              Report Submitted
            </h1>
            <p className="text-muted-foreground mb-6">
              Thank you for helping improve your community.
            </p>

            <div className="bg-muted rounded-xl p-4 mb-6">
              <p className="text-sm text-muted-foreground mb-1">Reference ID</p>
              <p className="text-lg font-mono font-bold text-foreground">
                {referenceId}
              </p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Submitted
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/#map"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
              >
                <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                View on map
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border-2 border-border text-foreground font-semibold hover:border-primary hover:text-primary transition-all"
              >
                Back to home
              </Link>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-primary font-[family-name:var(--font-heading)]"
          >
            WahalaFix
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Step {step}</span>
            <span>of 4</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-28">
        <div className="p-4 md:p-6 max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Category & Details */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-heading)] mb-2">
                  Log a problem
                </h1>
                <p className="text-muted-foreground mb-6">
                  {
                    "Tell us what's wrong and where it is. We'll route it to the right team."
                  }
                </p>

                {/* Category Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Category <span className="text-destructive">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            category: cat.id,
                          }));
                          setErrors((prev) => ({ ...prev, category: "" }));
                        }}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          formData.category === cat.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground"
                        }`}
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <span className="text-sm font-medium text-foreground">
                          {cat.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  {errors.category && (
                    <p className="mt-2 text-sm text-destructive">
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* Title Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Short title <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value.slice(0, 80),
                      }));
                      setErrors((prev) => ({ ...prev, title: "" }));
                    }}
                    placeholder="e.g. Broken streetlight on Lekki Road"
                    className="w-full px-4 py-3 rounded-lg border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    maxLength={80}
                  />
                  <p className="mt-1 text-xs text-muted-foreground text-right">
                    {formData.title.length}/80
                  </p>
                  {errors.title && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description (optional)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Add any extra details that might help..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-xl font-bold text-foreground font-[family-name:var(--font-heading)] mb-2">
                  Where is the issue?
                </h2>
                <p className="text-muted-foreground mb-4">
                  Move the map to position the crosshair on the exact location.
                </p>

                {/* Search Bar */}
                <div className="relative mb-4">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchInput(e.target.value)}
                    onFocus={() => searchQuery && setShowSearchResults(true)}
                    placeholder="Search street or area"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                  {/* Search Results Dropdown */}
                  <AnimatePresence>
                    {showSearchResults && searchResults.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10 overflow-hidden"
                      >
                        {searchResults.map((result, index) => (
                          <button
                            key={index}
                            onClick={() => selectSearchResult(result)}
                            className="w-full px-4 py-3 text-left hover:bg-muted transition-colors border-b border-border last:border-b-0"
                          >
                            <p className="text-sm text-foreground line-clamp-2">
                              {result.place_name}
                            </p>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Map Container */}
                <div className="relative rounded-xl overflow-hidden shadow-lg border border-border">
                  <div className="h-[300px] md:h-[400px]">
                    <Map
                      {...viewState}
                      onMove={(evt) => setViewState(evt.viewState)}
                      onMoveEnd={handleMoveEnd}
                      mapboxAccessToken={MAPBOX_TOKEN}
                      mapStyle="mapbox://styles/mapbox/streets-v12"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <NavigationControl position="bottom-right" />
                      <GeolocateControl
                        ref={geolocateControlRef}
                        position="bottom-right"
                        trackUserLocation={false}
                        showUserHeading={false}
                      />
                    </Map>
                  </div>

                  {/* Fixed Crosshair */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faCrosshairs}
                        className="w-10 h-10 text-primary drop-shadow-lg"
                      />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Address Display */}
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Near:
                      </p>
                      <p className="text-sm text-foreground">
                        {formData.address ||
                          "Move the map to select a location"}
                      </p>
                    </div>
                  </div>
                </div>

                {errors.location && (
                  <p className="mt-2 text-sm text-destructive">
                    {errors.location}
                  </p>
                )}
              </motion.div>
            )}

            {/* Step 3: Photos */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-xl font-bold text-foreground font-[family-name:var(--font-heading)] mb-2">
                  Add photos
                </h2>
                <p className="text-muted-foreground mb-6">
                  Photos help authorities understand and prioritize your report.
                </p>

                {/* Photo Upload Area */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors mb-4"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faCamera}
                        className="w-7 h-7 text-muted-foreground"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Tap to add photos
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Camera or gallery (max 3)
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FontAwesomeIcon
                        icon={faArrowUpFromBracket}
                        className="w-4 h-4"
                      />
                      <span>Upload up to 3 photos</span>
                    </div>
                  </div>
                </div>

                {/* Photo Previews */}
                {formData.photoPreviewUrls.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {formData.photoPreviewUrls.map((url, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden"
                      >
                        <Image
                          src={url || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute top-2 right-2 w-7 h-7 bg-foreground/80 rounded-full flex items-center justify-center hover:bg-foreground transition-colors"
                        >
                          <FontAwesomeIcon
                            icon={faXmark}
                            className="w-4 h-4 text-background"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {errors.photos && (
                  <p className="mt-2 text-sm text-destructive">
                    {errors.photos}
                  </p>
                )}

                {/* Description reminder if no photos */}
                {formData.photos.length === 0 &&
                  !formData.description.trim() && (
                    <div className="p-4 bg-accent/20 rounded-lg">
                      <p className="text-sm text-foreground">
                        {
                          "Tip: If you don't have photos, make sure to add a description in Step 1."
                        }
                      </p>
                    </div>
                  )}
              </motion.div>
            )}

            {/* Step 4: Contact */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-xl font-bold text-foreground font-[family-name:var(--font-heading)] mb-2">
                  Contact details (optional)
                </h2>
                <p className="text-muted-foreground mb-6">
                  Leave your details if you want updates on this report.
                </p>

                {/* Anonymous Toggle */}
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg mb-6">
                  <div>
                    <p className="font-medium text-foreground">
                      Report anonymously
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {"You won't receive updates"}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        anonymous: !prev.anonymous,
                      }))
                    }
                    className={`relative w-12 h-7 rounded-full transition-colors ${
                      formData.anonymous ? "bg-primary" : "bg-border"
                    }`}
                  >
                    <motion.div
                      className="absolute top-1 w-5 h-5 bg-card rounded-full shadow-sm"
                      animate={{ left: formData.anonymous ? 26 : 4 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  </button>
                </div>

                {/* Contact Fields */}
                <AnimatePresence>
                  {!formData.anonymous && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 overflow-hidden"
                    >
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Your name"
                          className="w-full px-4 py-3 rounded-lg border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-lg border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          placeholder="+234 xxx xxx xxxx"
                          className="w-full px-4 py-3 rounded-lg border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 safe-area-bottom">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                onClick={goToPrevStep}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5" />
                <span className="font-medium">Back</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
                <span>Takes less than 1 minute</span>
              </div>
            )}

            {step < 4 ? (
              <button
                onClick={goToNextStep}
                className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all active:scale-[0.98]"
              >
                <span>Continue</span>
                <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCheck} className="w-5 h-5" />
                    <span>Submit report</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogProblemPage;

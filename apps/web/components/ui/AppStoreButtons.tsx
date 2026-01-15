"use client";

import { motion } from "framer-motion";

type AppStoreButtonsProps = {
  variant?: "light" | "dark";
  className?: string;
};

const AppStoreButtons = ({
  variant = "dark",
  className = "",
}: AppStoreButtonsProps) => {
  const bgClass = variant === "dark" ? "bg-foreground" : "bg-background";
  const textClass = variant === "dark" ? "text-background" : "text-foreground";
  const subtextClass =
    variant === "dark" ? "text-background/70" : "text-muted-foreground";

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {/* App Store Button */}
      <motion.a
        href="#"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg ${bgClass} border border-border/20 transition-shadow hover:shadow-md`}
      >
        <svg
          className={`w-6 h-6 ${textClass}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        <div className="flex flex-col">
          <span className={`text-[10px] leading-tight ${subtextClass}`}>
            Download on the
          </span>
          <span className={`text-sm font-semibold leading-tight ${textClass}`}>
            App Store
          </span>
        </div>
      </motion.a>

      {/* Google Play Button */}
      <motion.a
        href="#"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg ${bgClass} border border-border/20 transition-shadow hover:shadow-md`}
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M3.609 1.814L13.792 12 3.61 22.186a2.269 2.269 0 0 1-.264-.386c-.22-.39-.346-.87-.346-1.405V3.605c0-.535.126-1.016.345-1.405a2.27 2.27 0 0 1 .264-.386z"
          />
          <path
            fill="#FBBC04"
            d="M16.326 15.596l-2.534-2.534L3.609 22.186c.393.412.93.664 1.547.664.393 0 .796-.104 1.192-.313l10.048-5.694-.07-1.247z"
          />
          <path
            fill="#4285F4"
            d="M20.873 10.445l-4.547-2.577-2.534 4.132 2.534 2.534 4.547-2.577c.596-.338.927-.83.927-1.506s-.33-1.168-.927-1.506z"
          />
          <path
            fill="#34A853"
            d="M3.609 1.814c.393-.412.93-.664 1.547-.664.393 0 .796.104 1.192.313l10.048 5.694.038 1.248-2.642 1.658L3.609 1.814z"
          />
        </svg>
        <div className="flex flex-col">
          <span className={`text-[10px] leading-tight ${subtextClass}`}>
            Get it on
          </span>
          <span className={`text-sm font-semibold leading-tight ${textClass}`}>
            Google Play
          </span>
        </div>
      </motion.a>
    </div>
  );
};

export default AppStoreButtons;

"use client";

import type React from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/lib/utils";

type SecondaryButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  icon?: IconDefinition;
  className?: string;
};

const SecondaryButton = ({
  children,
  onClick,
  href,
  icon,
  className,
}: SecondaryButtonProps) => {
  const baseStyles = cn(
    "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg",
    "bg-transparent text-foreground font-semibold text-base",
    "border-2 border-border hover:border-primary hover:text-primary",
    "transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    "active:scale-[0.98]",
    className,
  );

  if (href) {
    return (
      <a href={href} className={baseStyles}>
        {icon && <FontAwesomeIcon icon={icon} className="w-4 h-4" />}
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseStyles}>
      {icon && <FontAwesomeIcon icon={icon} className="w-4 h-4" />}
      {children}
    </button>
  );
};

export default SecondaryButton;

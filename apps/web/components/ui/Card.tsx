import type React from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground rounded-xl border border-border p-6 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;

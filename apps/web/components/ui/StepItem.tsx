import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type StepItemProps = {
  step: number;
  icon: IconDefinition;
  title: string;
  description: string;
};

const StepItem = ({ step, icon, title, description }: StepItemProps) => {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <FontAwesomeIcon icon={icon} className="text-primary" size="lg" />
        </div>
        <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
          {step}
        </span>
      </div>
      <div>
        <h3 className="font-semibold text-lg text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StepItem;

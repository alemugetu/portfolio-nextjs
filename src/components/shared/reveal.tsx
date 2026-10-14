import { cn } from "@/lib/utils";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export function Reveal({ children, className, ...props }: RevealProps) {
  return (
    <div className={cn("transition-all duration-300", className)} {...props}>
      {children}
    </div>
  );
}

export function StaggerContainer({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("transition-all duration-300", className)} {...props}>
      {children}
    </div>
  );
}

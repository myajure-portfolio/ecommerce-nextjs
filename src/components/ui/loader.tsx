import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "spinner" | "dots" | "pulse" | "bars";
  className?: string;
}

export function Loader({
  size = "md",
  variant = "spinner",
  className,
}: LoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  if (variant === "spinner") {
    return (
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 dark:border-gray-600 dark:border-t-blue-400",
          sizeClasses[size],
          className
        )}
      />
    );
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex space-x-1", className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse",
              size === "sm"
                ? "w-1 h-1"
                : size === "md"
                ? "w-2 h-2"
                : size === "lg"
                ? "w-3 h-3"
                : "w-4 h-4"
            )}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1s",
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div
        className={cn(
          "rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse",
          sizeClasses[size],
          className
        )}
      />
    );
  }

  if (variant === "bars") {
    return (
      <div className={cn("flex space-x-1", className)}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "bg-blue-600 dark:bg-blue-400 animate-pulse",
              size === "sm"
                ? "w-1 h-4"
                : size === "md"
                ? "w-1 h-6"
                : size === "lg"
                ? "w-2 h-8"
                : "w-2 h-10"
            )}
            style={{
              animationDelay: `${i * 0.15}s`,
              animationDuration: "1.2s",
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}

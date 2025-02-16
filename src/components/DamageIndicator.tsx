import { useState, useEffect } from "react";
import { cn } from "~/utils/cn";

export const DamageIndicator = ({ damage }: { damage: number }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1000);
    return () => clearTimeout(timer);
  }, [damage]);

  if (!show) return null;

  return (
    <div className="absolute right-0 top-0 -translate-y-full">
      <span
        className={cn(
          "inline-block animate-bounce-once font-bold",
          damage === 3
            ? "animate-pulse text-2xl text-red-500"
            : "text-lg text-yellow-500",
        )}
      >
        -{damage}
      </span>
    </div>
  );
};

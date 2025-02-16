import { cn } from "~/utils/cn";

interface HealthBarProps {
  currentHP: number;
  maxHP: number;
  player: "one" | "two";
}

export const HealthBar = ({ currentHP, maxHP, player }: HealthBarProps) => {
  const percentage = (currentHP / maxHP) * 100;
  const isFlipped = player === "two";

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "text-sm font-bold uppercase text-white",
          isFlipped ? "text-right" : "text-left",
        )}
      >
        Player {player}
      </div>
      <div className="h-8 w-full rounded-md bg-white/10 p-1">
        <div
          className={cn(
            "h-full rounded transition-all duration-500 ease-out",
            isFlipped && "ml-auto",
            percentage > 70
              ? "bg-green-500"
              : percentage > 30
                ? "bg-yellow-500"
                : "bg-red-500",
          )}
          style={{ width: `${Math.max(0, percentage)}%` }}
        />
      </div>
    </div>
  );
};

import { cn } from "~/utils/cn";
import { type ActionLog } from "~/machines/gameMachine";

interface ArenaProps {
  lastAction: ActionLog | null;
  isResolving: boolean;
  canFight: boolean;
  onFight: () => void;
  onReset: () => void;
  isGameOver: boolean;
}

export const Arena = ({
  lastAction,
  isResolving,
  canFight,
  onFight,
  onReset,
  isGameOver,
}: ArenaProps) => (
  <div className="flex min-h-[300px] max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white">
    <h3 className="text-center text-2xl font-bold">arena</h3>
    {!isGameOver && !isResolving && (
      <button
        onClick={onFight}
        disabled={!canFight}
        className={cn(
          "w-full rounded-md px-4 py-2 font-semibold transition-colors",
          canFight
            ? "bg-green-100 text-green-700 hover:bg-green-200"
            : "cursor-not-allowed bg-gray-100 text-gray-400",
        )}
      >
        Fight!
      </button>
    )}
    {lastAction && !isResolving && (
      <div className="text-center text-sm">
        {lastAction.winner && (
          <p
            className={cn(
              "mt-2 font-bold",
              lastAction.damage.isCritical && "text-red-400",
            )}
          >
            {lastAction.winner === "draw"
              ? "Draw! Both take 1 damage"
              : `Player ${lastAction.winner} wins with a critical hit!`}
          </p>
        )}
      </div>
    )}
    {isGameOver && (
      <button
        onClick={onReset}
        className="mt-4 w-full rounded-md bg-violet-50 font-semibold text-violet-700 hover:bg-violet-100"
      >
        Play Again
      </button>
    )}
  </div>
);

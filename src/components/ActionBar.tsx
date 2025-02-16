import { type ActionLog } from "~/machines/gameMachine";

interface ActionBarProps {
  isGameOver: boolean;
  isResolving: boolean;
  canFight: boolean;
  onFight: () => void;
  onReset: () => void;
  lastAction: ActionLog | null;
}

export const ActionBar = ({
  isGameOver,
  isResolving,
  canFight,
  onFight,
  onReset,
  lastAction,
}: ActionBarProps) => (
  <div className="col-span-4 flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-xl bg-white/10 p-4 text-white">
    <div className="min-h-[24px] text-center text-sm">
      {lastAction?.winner && !isResolving && (
        <p
          className={
            "font-bold " + (lastAction.damage.isCritical ? "text-red-400" : "")
          }
        >
          {lastAction.winner === "draw"
            ? "Draw! Both take 1 damage"
            : `Player ${lastAction.winner} wins with a critical hit!`}
        </p>
      )}
      {isResolving && <p className="font-bold text-yellow-400">Fighting...</p>}
    </div>

    {isGameOver ? (
      <button
        onClick={onReset}
        className="w-48 rounded-md bg-violet-50 px-4 py-2 font-semibold text-violet-700 hover:bg-violet-100"
      >
        Play Again
      </button>
    ) : (
      <button
        onClick={onFight}
        disabled={!canFight || isResolving}
        className={
          "w-48 rounded-md px-4 py-2 font-semibold transition-colors " +
          (!isResolving
            ? canFight
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "cursor-not-allowed bg-gray-100 text-gray-400"
            : "cursor-not-allowed bg-gray-100 text-gray-400 opacity-50")
        }
      >
        {isResolving ? "Fighting..." : "Fight!"}
      </button>
    )}
  </div>
);

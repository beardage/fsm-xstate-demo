import { cn } from "~/utils/cn";
import { type NonNullMove, MOVE_EMOJIS } from "~/utils/game";

export const MoveButton = ({
  move,
  onClick,
  disabled,
}: {
  move: NonNullMove;
  onClick: () => void;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "flex w-full items-center justify-center gap-2 rounded-md bg-violet-50 px-4 py-2 font-semibold text-violet-700 hover:bg-violet-100 disabled:opacity-50",
      "transition-all duration-200 ease-in-out",
    )}
  >
    <span className="text-2xl">{MOVE_EMOJIS[move]}</span>
    <span>{move}</span>
  </button>
);

import { cn } from "~/utils/cn";
import { type Move, type NonNullMove, getEmojiForMove } from "~/utils/game";

interface PlayerCardProps {
  onMove: (move: NonNullMove) => void;
  selectedMove: Move;
  disabled?: boolean;
}

export const PlayerCard = ({
  onMove,
  selectedMove,
  disabled,
}: PlayerCardProps) => (
  <div className="relative col-span-2 flex min-h-[300px] max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white">
    <div className="flex min-h-[48px] items-center justify-center">
      <p className="text-center italic">
        {selectedMove ? (
          <span className="flex items-center justify-center gap-2">
            Selected:{" "}
            <span className="text-3xl">{getEmojiForMove(selectedMove)}</span>
          </span>
        ) : (
          "Choose your move"
        )}
      </p>
    </div>
    <div className="grid min-h-[200px] grid-cols-1 gap-2">
      {(["rock", "paper", "scissors"] as const).map((move) => (
        <button
          key={move}
          onClick={() => onMove(move)}
          disabled={disabled}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold transition-colors",
            "bg-violet-50 text-violet-700 hover:bg-violet-100 disabled:opacity-50",
          )}
        >
          <span className="text-2xl">{getEmojiForMove(move)}</span>
          <span>{move}</span>
        </button>
      ))}
    </div>
  </div>
);

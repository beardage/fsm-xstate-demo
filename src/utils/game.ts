export type Move = "rock" | "paper" | "scissors" | null;
export type NonNullMove = Exclude<Move, null>;
export type Player = "one" | "two";

export const MOVE_EMOJIS: Record<NonNullMove, string> = {
  rock: "🪨",
  paper: "📜",
  scissors: "✂️",
} as const;

export const getEmojiForMove = (move: Move) => {
  if (!move) return null;
  return MOVE_EMOJIS[move];
};

export const getWinner = (
  p1Move: Move,
  p2Move: Move,
): Player | "draw" | null => {
  if (!p1Move || !p2Move) return null;
  if (p1Move === p2Move) return "draw";

  const wins = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  return wins[p1Move] === p2Move ? "one" : "two";
};

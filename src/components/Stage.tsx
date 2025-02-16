import { type Move, type Player, getEmojiForMove } from "../utils/game";
import { motion, AnimatePresence } from "framer-motion";
import { Victory } from "./Victory";

interface StageProps {
  playerOneMove: Move;
  playerTwoMove: Move;
  isResolving: boolean;
  isGameOver: boolean;
  winner: Player;
}

export const Stage = ({
  playerOneMove,
  playerTwoMove,
  isResolving,
  isGameOver,
  winner,
}: StageProps) => (
  <div className="col-span-4 flex min-h-[300px] min-w-full flex-col gap-4 rounded-xl bg-white/10 px-8 py-4 text-white">
    <div className="relative flex flex-1 items-center justify-center gap-16">
      <div className="relative flex min-h-[200px] min-w-[200px] flex-col items-center justify-center">
        <motion.div
          className="absolute bottom-4 h-8 w-48 rounded-full bg-black/20 blur-md"
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <AnimatePresence mode="wait">
          {playerOneMove && (
            <motion.div
              key={playerOneMove}
              initial={{ x: -100, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                y: isResolving ? [-10, 10] : 0,
              }}
              exit={{ x: -100, opacity: 0 }}
              transition={{
                type: "spring",
                bounce: 0.4,
                y: isResolving
                  ? {
                      repeat: Infinity,
                      duration: 0.6,
                      repeatType: "reverse",
                    }
                  : {},
              }}
              className="text-9xl"
            >
              {getEmojiForMove(playerOneMove)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {!isGameOver && (
        <motion.div
          className="min-w-[60px] text-center text-4xl"
          animate={
            isResolving
              ? {
                  scale: [1, 1.2, 1],
                  rotate: [-5, 5, -5, 5, 0],
                }
              : {}
          }
          transition={{ duration: 0.5 }}
        >
          {isResolving ? "⚔️" : "VS"}
        </motion.div>
      )}
      <div className="relative flex min-h-[200px] min-w-[200px] flex-col items-center justify-center">
        <motion.div
          className="absolute bottom-4 h-8 w-48 rounded-full bg-black/20 blur-md"
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <AnimatePresence mode="wait">
          {playerTwoMove && (
            <motion.div
              key={playerTwoMove}
              initial={{ x: 100, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                y: isResolving ? [-10, 10] : 0,
              }}
              exit={{ x: 100, opacity: 0 }}
              transition={{
                type: "spring",
                bounce: 0.4,
                y: isResolving
                  ? {
                      repeat: Infinity,
                      duration: 0.6,
                      repeatType: "reverse",
                    }
                  : {},
              }}
              className="text-9xl"
            >
              {getEmojiForMove(playerTwoMove)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {isGameOver && <Victory winner={winner} />}
    </div>
  </div>
);

import { motion } from "framer-motion";
import { type Player } from "~/utils/game";

interface VictoryProps {
  winner: Player;
}

export const Victory = ({ winner }: VictoryProps) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.2, 1, 0.2],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    }}
    className="absolute inset-0 flex items-center justify-center"
  >
    <div className="flex flex-col items-center gap-4">
      <div className="text-6xl font-bold text-yellow-400">🏆</div>
      <div className="text-4xl font-bold uppercase text-yellow-400">
        Player {winner} Wins!
      </div>
    </div>
  </motion.div>
);

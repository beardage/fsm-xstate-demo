import { HealthBar } from "./HealthBar";

interface HealthBarsProps {
  playerOneHP: number;
  playerTwoHP: number;
  maxHP: number;
}

export const HealthBars = ({
  playerOneHP,
  playerTwoHP,
  maxHP,
}: HealthBarsProps) => (
  <div className="col-span-4">
    <div className="grid grid-cols-2 gap-4">
      <HealthBar currentHP={playerOneHP} maxHP={maxHP} player="one" />
      <HealthBar currentHP={playerTwoHP} maxHP={maxHP} player="two" />
    </div>
  </div>
);

"use client";

import { gameMachine } from "~/machines/gameMachine";
import { useMachine } from "@xstate/react";
import { type ReactNode, useEffect, useState } from "react";
import { cn } from "~/utils/cn";

const DamageIndicator = ({ damage, isCrit }: { damage: number; isCrit: boolean }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1000);
    return () => clearTimeout(timer);
  }, [damage]);

  if (!show) return null;

  return (
    <div className="absolute top-0 right-0 -translate-y-full">
      <span
        className={cn(
          "inline-block animate-bounce-once font-bold",
          isCrit 
            ? "text-2xl text-red-500 animate-pulse" 
            : "text-lg text-yellow-500"
        )}
      >
        -{damage}
      </span>
    </div>
  );
};

const PlayerCard = ({ 
  player,
  hp,
  onAttack,
  lastAction,
  children,
}: { 
  player: "one" | "two";
  hp: number;
  onAttack: () => void;
  lastAction: { damage: number; isCrit: boolean } | null;
  children?: ReactNode;
}) => (
  <div className="relative flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white">
    {lastAction && <DamageIndicator {...lastAction} />}
    <h3 className="text-xl font-semibold text-center uppercase">
      player {player}
    </h3>
    <div className="grid grid-cols-1 gap-2 text-sm">
      <p className={cn(
        "italic text-center transition-colors",
        hp < 4 ? "text-red-400" : hp < 7 ? "text-yellow-400" : ""
      )}>
        HP: {hp}
      </p>
      <button
        onClick={onAttack}
        className="w-full rounded-md font-semibold bg-violet-50 hover:bg-violet-100 text-violet-700"
      >
        attack
      </button>
      <button className="w-full rounded-md font-semibold bg-violet-50 hover:bg-violet-100 text-violet-700">
        defend
      </button>
    </div>
    {children}
  </div>
);

export const GameUI = () => {
  const [state, send] = useMachine(gameMachine);

  if (state.matches("idle")) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Ready to Fight?</h2>
        <button
          onClick={() => send({ type: "START_GAME" })}
          className="rounded-md bg-violet-50 px-8 py-3 font-semibold text-violet-700 hover:bg-violet-100"
        >
          Start Game
        </button>
      </div>
    );
  }

  const lastAction = state.context.lastAction;

  return (
    <div className="grid grid-cols-3 gap-4">
      <PlayerCard
        player="one"
        hp={state.context.playerOneHP}
        onAttack={() => send({ type: "ATTACK", player: "one" })}
        lastAction={lastAction?.player === "two" ? lastAction : null}
      >
        {lastAction?.player === "one" && (
          <div className={cn(
            "text-sm text-center mt-2",
            lastAction.isCrit && "text-red-400 font-bold animate-pulse"
          )}>
            <p className="font-semibold">
              {lastAction.isCrit ? "Critical hit!" : "Hit!"} 
            </p>
            <p>Dealt {lastAction.damage} damage</p>
          </div>
        )}
      </PlayerCard>

      <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
        <h3 className="text-2xl font-bold text-center">podium</h3>
        {lastAction && (
          <p className={cn(
            "text-center text-sm italic",
            lastAction.isCrit && "text-red-400 font-bold"
          )}>
            Player {lastAction.player} {lastAction.action}ed
            {lastAction.isCrit && " with a critical hit"}!
          </p>
        )}
        {state.hasTag("winner") && (
          <p className="text-center">Winner: {state.context.winner}</p>
        )}
        {state.hasTag("draw") && <p className="text-center">Draw!</p>}
        {(state.hasTag("winner") || state.hasTag("draw")) && (
          <button
            onClick={() => send({ type: "reset" })}
            className="w-full rounded-md font-semibold bg-violet-50 hover:bg-violet-100 text-violet-700"
          >
            Play Again
          </button>
        )}
      </div>

      <PlayerCard
        player="two"
        hp={state.context.playerTwoHP}
        onAttack={() => send({ type: "ATTACK", player: "two" })}
        lastAction={lastAction?.player === "one" ? lastAction : null}
      >
        {lastAction?.player === "two" && (
          <div className={cn(
            "text-sm text-center mt-2",
            lastAction.isCrit && "text-red-400 font-bold animate-pulse"
          )}>
            <p className="font-semibold">
              {lastAction.isCrit ? "Critical hit!" : "Hit!"} 
            </p>
            <p>Dealt {lastAction.damage} damage</p>
          </div>
        )}
      </PlayerCard>
    </div>
  );
};

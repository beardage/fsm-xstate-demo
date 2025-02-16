"use client";

import { gameMachine } from "~/machines/gameMachine";
import { useMachine } from "@xstate/react";
import { Stage } from "./Stage";
import { PlayerCard } from "./PlayerCard";
import { HealthBars } from "./HealthBars";
import { type NonNullMove } from "~/utils/game";
import { ActionBar } from "./ActionBar";

export const GameUI = () => {
  const [state, send] = useMachine(gameMachine);

  if (state.matches("IDLE")) {
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
  const isResolving = state.matches("RESOLVING");
  const canFight =
    !!state.context.playerOneMove && !!state.context.playerTwoMove;

  return (
    <div className="grid min-h-[600px] min-w-[650px] grid-cols-4 gap-4">
      <HealthBars
        playerOneHP={state.context.playerOneHP}
        playerTwoHP={state.context.playerTwoHP}
        maxHP={10}
      />

      <Stage
        playerOneMove={state.context.playerOneMove}
        playerTwoMove={state.context.playerTwoMove}
        isResolving={isResolving}
        isGameOver={state.hasTag("GAME_OVER")}
        winner={state.context.playerOneHP <= 0 ? "two" : "one"}
      />

      <PlayerCard
        onMove={(move: NonNullMove) =>
          send({ type: "SELECT_MOVE", player: "one", move })
        }
        selectedMove={state.context.playerOneMove}
        disabled={state.hasTag("GAME_OVER") || isResolving}
      />

      <PlayerCard
        onMove={(move: NonNullMove) =>
          send({ type: "SELECT_MOVE", player: "two", move })
        }
        selectedMove={state.context.playerTwoMove}
        disabled={state.hasTag("GAME_OVER") || isResolving}
      />

      <ActionBar
        isGameOver={state.hasTag("GAME_OVER")}
        isResolving={isResolving}
        canFight={canFight}
        onFight={() => send({ type: "FIGHT" })}
        onReset={() => send({ type: "RESET" })}
        lastAction={lastAction}
      />
    </div>
  );
};

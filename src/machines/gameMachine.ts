import { assign, setup } from "xstate";
import { type Move, type Player, getWinner } from "~/utils/game";

export interface ActionLog {
  playerOne: Move;
  playerTwo: Move;
  winner: Player | "draw" | null;
  damage: {
    toPlayerOne: number;
    toPlayerTwo: number;
    isCritical: boolean;
  };
}

const initialContext = {
  playerOneMove: null as Move,
  playerTwoMove: null as Move,
  playerOneHP: 10,
  playerTwoHP: 10,
  lastAction: null as ActionLog | null,
  started: false,
};

const calculateDamage = (winner: Player | "draw" | null, forPlayer: Player) => {
  if (!winner) return 0;
  if (winner === "draw") return 1;
  return winner === forPlayer ? 0 : 3;
};

export const gameMachine = setup({
  types: {
    context: {} as typeof initialContext,
    events: {} as
      | { type: "START_GAME" }
      | { type: "SELECT_MOVE"; player: Player; move: Move }
      | { type: "FIGHT" }
      | { type: "RESET" },
  },
}).createMachine({
  context: initialContext,
  id: "game",
  initial: "IDLE",
  states: {
    IDLE: {
      on: {
        START_GAME: {
          target: "PLAYING",
          actions: assign({ ...initialContext, started: true }),
        },
      },
    },
    PLAYING: {
      on: {
        SELECT_MOVE: {
          actions: assign({
            playerOneMove: ({ event, context }) =>
              event.player === "one" ? event.move : context.playerOneMove,
            playerTwoMove: ({ event, context }) =>
              event.player === "two" ? event.move : context.playerTwoMove,
          }),
        },
        FIGHT: {
          target: "RESOLVING",
          guard: ({ context }) =>
            !!context.playerOneMove && !!context.playerTwoMove,
        },
      },
      always: {
        target: "GAME_OVER",
        guard: ({ context }) =>
          context.playerOneHP <= 0 || context.playerTwoHP <= 0,
      },
    },
    RESOLVING: {
      entry: assign(({ context }) => {
        const winner = getWinner(context.playerOneMove, context.playerTwoMove);
        const isCritical = winner !== "draw";
        const toPlayerOne = calculateDamage(winner, "one");
        const toPlayerTwo = calculateDamage(winner, "two");

        return {
          lastAction: {
            playerOne: context.playerOneMove,
            playerTwo: context.playerTwoMove,
            winner,
            damage: { toPlayerOne, toPlayerTwo, isCritical },
          },
          playerOneHP: context.playerOneHP - toPlayerOne,
          playerTwoHP: context.playerTwoHP - toPlayerTwo,
        };
      }),
      after: {
        1000: {
          target: "PLAYING",
          actions: assign({
            playerOneMove: null,
            playerTwoMove: null,
          }),
        },
      },
    },
    GAME_OVER: {
      tags: ["GAME_OVER"],
      on: {
        RESET: {
          target: "PLAYING",
          actions: assign(initialContext),
        },
      },
    },
  },
});

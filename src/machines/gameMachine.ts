import { assign, setup } from "xstate";

const damageValues = [0.5, 1, 1.5];
const critDamage = 2.5;
const isRandomCrit = () => Math.random() > 0.9;
const getDamage = (defending: boolean, crit: boolean) => {
  return crit
    ? critDamage
    : (damageValues[
      defending ? 0 : Math.floor(Math.random() * damageValues.length)
    ] ?? 0);
};

const initialState = {
  playerOneHP: 10,
  playerOneState: "idle",
  playerTwoHP: 10,
  playerTwoState: "idle",
  winner: null as string | null,
};

export const gameMachine = setup({
  types: {
    context: {} as typeof initialState,
    events: {} as { type: "play" } | { type: "reset" },
  },
  actions: {
    setWinner: assign({
      winner: ({ context }) => {
        return context.playerOneHP <= 0 ? "playerTwo" : "playerOne";
      },
    }),
    updateGame: assign({
      playerOneHP: ({ context }) => {
        const isCrit = isRandomCrit();
        const playerTwoDamage = getDamage(
          context.playerTwoState === "defending",
          isCrit,
        );
        return context.playerOneHP - playerTwoDamage;
      },
      playerTwoHP: ({ context }) => {
        const isCrit = isRandomCrit();
        const playerOneDamage = getDamage(
          context.playerOneState === "defending",
          isCrit,
        );
        return context.playerTwoHP - playerOneDamage;
      },
    }),
    resetGame: assign(initialState),
  },
  guards: {
    checkWinner: function ({ context }) {
      return context.playerOneHP <= 0 || context.playerTwoHP <= 0;
    },
    checkDraw: function ({ context }) {
      return context.playerOneHP <= 0 && context.playerTwoHP <= 0;
    },
  },
}).createMachine({
  context: initialState,
  id: "(machine)",
  initial: "idle",
  states: {
    playing: {
      on: {
        play: {
          target: "playing",
          actions: {
            type: "updateGame",
          },
        },
      },
      always: [
        {
          target: "#(machine).gameOver.winner",
          guard: {
            type: "checkWinner",
          },
        },
        {
          target: "#(machine).gameOver.draw",
          guard: {
            type: "checkDraw",
          },
        },
      ],
    },
    gameOver: {
      initial: "winner",
      on: {
        reset: {
          target: "playing",
          actions: {
            type: "resetGame",
          },
        },
      },
      states: {
        winner: {
          entry: {
            type: "setWinner",
          },
          tags: "winner",
        },
        draw: {
          tags: "draw",
        },
      },
    },
  },
});

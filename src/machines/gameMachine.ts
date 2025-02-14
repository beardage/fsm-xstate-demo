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

type ActionLog = {
  player: "one" | "two";
  action: "attack";
  damage: number;
  isCrit: boolean;
};

const initialState = {
  playerOneHP: 10,
  playerOneState: "idle",
  playerTwoHP: 10,
  playerTwoState: "idle",
  winner: null as string | null,
  started: false,
  lastAction: null as ActionLog | null,
};

export const gameMachine = setup({
  types: {
    context: {} as typeof initialState,
    events: {} as
      | { type: "START_GAME" }
      | { type: "ATTACK"; player: "one" | "two" }
      | { type: "reset" },
  },
  actions: {
    setWinner: assign({
      winner: ({ context }) => {
        return context.playerOneHP <= 0 ? "playerTwo" : "playerOne";
      },
    }),
    updateGame: assign({
      playerOneHP: ({ context, event }) => {
        if (!context.started || event.type !== "ATTACK") return context.playerOneHP;
        if (event.player === "two") {
          const isCrit = isRandomCrit();
          const damage = getDamage(context.playerOneState === "defending", isCrit);
          return context.playerOneHP - damage;
        }
        return context.playerOneHP;
      },
      playerTwoHP: ({ context, event }) => {
        if (!context.started || event.type !== "ATTACK") return context.playerTwoHP;
        if (event.player === "one") {
          const isCrit = isRandomCrit();
          const damage = getDamage(context.playerTwoState === "defending", isCrit);
          return context.playerTwoHP - damage;
        }
        return context.playerTwoHP;
      },
      lastAction: ({ context, event }) => {
        if (!context.started || event.type !== "ATTACK") return null;
        const isCrit = isRandomCrit();
        const damage = getDamage(
          event.player === "one" 
            ? context.playerTwoState === "defending"
            : context.playerOneState === "defending",
          isCrit
        );
        return {
          player: event.player,
          action: "attack",
          damage,
          isCrit,
        };
      },
    }),
    startGame: assign({
      started: () => true,
      lastAction: () => null,
    }),
    resetGame: assign({
      ...initialState,
      started: true,
      lastAction: null,
    }),
  },
  guards: {
    checkWinner: ({ context }) => {
      return (
        context.started &&
        (context.playerOneHP <= 0 || context.playerTwoHP <= 0)
      );
    },
    checkDraw: ({ context }) => {
      return (
        context.started && context.playerOneHP <= 0 && context.playerTwoHP <= 0
      );
    },
  },
}).createMachine({
  context: initialState,
  id: "(machine)",
  initial: "idle",
  states: {
    idle: {
      on: {
        START_GAME: {
          target: "playing",
          actions: ["startGame", "resetGame"],
        },
      },
    },
    playing: {
      on: {
        ATTACK: {
          target: "playing",
          actions: "updateGame",
        },
      },
      always: [
        {
          target: "gameOver.winner",
          guard: "checkWinner",
        },
        {
          target: "gameOver.draw",
          guard: "checkDraw",
        },
      ],
    },
    gameOver: {
      initial: "winner",
      on: {
        reset: {
          target: "playing",
          actions: "resetGame",
        },
      },
      states: {
        winner: {
          entry: "setWinner",
          tags: ["winner"],
        },
        draw: {
          tags: ["draw"],
        },
      },
    },
  },
});

"use client";

import { gameMachine } from "~/machines/gameMachine";
import { useMachine } from "@xstate/react";

export const GameUI = () => {
  const [state, send] = useMachine(gameMachine);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white">
        <h3 className="text-xl font-semibold text-center uppercase">
          player 1
        </h3>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <p className="italic text-center">state</p>
          <button className="w-full rounded-md font-semibold bg-violet-50 hover:bg-violet-100 text-violet-700">
            attack
          </button>
          <button className="w-full rounded-md font-semibold bg-violet-50 hover:bg-violet-100 text-violet-700">
            defend
          </button>
        </div>
      </div>
      <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
        <h3 className="text-2xl font-bold text-center">podium</h3>
      </div>
      <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
        <h3 className="text-xl font-semibold text-center uppercase">
          player 2
        </h3>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <p className="italic text-center">state</p>
          <button className="w-full rounded-md font-semibold bg-violet-50 hover:bg-violet-100 text-violet-700">
            attack
          </button>
          <button className="w-full rounded-md font-semibold bg-violet-50 hover:bg-violet-100 text-violet-700">
            defend
          </button>
        </div>
      </div>
    </div>
  );
};

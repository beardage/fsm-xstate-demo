import { GameUI } from "~/components/GameUI";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="text-5xl font-extrabold uppercase tracking-wider text-white sm:text-[5rem]">
        RPS Machine
      </h1>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <GameUI />
      </div>
    </main>
  );
}

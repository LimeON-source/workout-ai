import type { Metadata } from "next";
import WorkoutTimer from "@/app/ui/workout-timer";
import { sampleWorkout } from "@/lib/sampleWorkout";

export const metadata: Metadata = {
  title: "Workout",
};

export default function WorkoutPage() {
  const workout = sampleWorkout;

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-8 px-4 py-8">
      <h1 className="text-2xl font-bold">{workout.title}</h1>

      <section>
        <h2 className="mb-2 text-lg font-semibold">Warm-up</h2>
        <ul className="list-disc space-y-1 pl-5">
          {workout.warmUp.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </section>

      <WorkoutTimer workout={workout} />

      <section>
        <h2 className="mb-2 text-lg font-semibold">Cool-down</h2>
        <ul className="list-disc space-y-1 pl-5">
          {workout.coolDown.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

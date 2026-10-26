import type { Metadata } from "next";
import Link from "next/link";
import WorkoutTimer from "@/app/ui/workout-timer";
import { sampleWorkout } from "@/lib/sampleWorkout";
import type { Exercise, WorkoutType } from "@/lib/types";

export const metadata: Metadata = {
  title: "Workout",
};

function setsAndReps(exercise: Exercise) {
  const amount =
    exercise.reps !== undefined ? `${exercise.reps} reps` : `${exercise.durationSeconds} s`;
  return `${exercise.sets} × ${amount}`;
}

function rest(exercise: Exercise, type: WorkoutType) {
  if (exercise.restSeconds > 0) return `Rest ${exercise.restSeconds} s`;
  return type === "EMOM" ? "Rest for the rest of the minute" : "No rest";
}

export default function WorkoutPage() {
  // TODO: generate from the request in the search params; the sample stands in for now.
  const workout = sampleWorkout;

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-8 px-4 py-8">
      <div className="flex flex-col gap-2">
        <Link
          href="/"
          className="-ml-2 inline-flex min-h-11 items-center self-start px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400"
        >
          ← New workout
        </Link>
        <h1 className="text-2xl font-bold">{workout.title}</h1>
      </div>

      <section>
        <h2 className="mb-2 text-lg font-semibold">Warm-up</h2>
        <ul className="list-disc space-y-1 pl-5">
          {workout.warmUp.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Exercises</h2>
        <ol className="flex flex-col gap-3">
          {workout.exercises.map((exercise) => (
            <li
              key={exercise.name}
              className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800"
            >
              <h3 className="font-semibold">{exercise.name}</h3>
              <p className="mt-1 text-lg tabular-nums">{setsAndReps(exercise)}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {rest(exercise, workout.type)}
              </p>
            </li>
          ))}
        </ol>
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

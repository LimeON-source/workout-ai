import Form from "next/form";
import EquipmentChips from "@/app/ui/equipment-chips";
import SegmentedControl from "@/app/ui/segmented-control";
import {
  WORKOUT_GOALS,
  WORKOUT_MINUTES,
  WORKOUT_TYPES,
  type WorkoutGoal,
} from "@/lib/types";

const GOAL_LABELS: Record<WorkoutGoal, string> = {
  strength: "Strength",
  "fat-loss": "Fat loss",
  endurance: "Endurance",
  mobility: "Mobility",
};

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-xl px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Build your workout</h1>

      {/* Bottom padding on phones keeps the last field clear of the fixed button. */}
      <Form action="/workout" className="flex flex-col gap-8 pb-28 md:pb-0">
        <SegmentedControl
          name="minutes"
          legend="Minutes"
          options={WORKOUT_MINUTES.map((m) => ({ value: m, label: `${m}` }))}
          defaultValue={30}
          className="grid-cols-4"
        />
        <SegmentedControl
          name="goal"
          legend="Goal"
          options={WORKOUT_GOALS.map((g) => ({ value: g, label: GOAL_LABELS[g] }))}
          defaultValue="strength"
          className="grid-cols-2 sm:grid-cols-4"
        />
        <EquipmentChips name="equipment" />
        <SegmentedControl
          name="type"
          legend="Format"
          options={WORKOUT_TYPES.map((t) => ({ value: t, label: t }))}
          defaultValue="EMOM"
          className="grid-cols-2"
        />

        <div className="fixed inset-x-0 bottom-0 border-t border-zinc-200 bg-background/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:static md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none dark:border-zinc-800">
          <button
            type="submit"
            className="mx-auto block h-12 w-full max-w-xl rounded-full bg-foreground font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Generate
          </button>
        </div>
      </Form>
    </main>
  );
}

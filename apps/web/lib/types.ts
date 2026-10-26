export const WORKOUT_MINUTES = [15, 30, 45, 60] as const;
export type WorkoutMinutes = (typeof WORKOUT_MINUTES)[number];

export const WORKOUT_GOALS = ["strength", "fat-loss", "endurance", "mobility"] as const;
export type WorkoutGoal = (typeof WORKOUT_GOALS)[number];

export const EQUIPMENT = [
  "none",
  "dumbbells",
  "kettlebell",
  "bands",
  "pull-up-bar",
  "full-gym",
] as const;
export type Equipment = (typeof EQUIPMENT)[number];

export const WORKOUT_TYPES = ["AMRAP", "EMOM"] as const;
export type WorkoutType = (typeof WORKOUT_TYPES)[number];

export type WorkoutRequest = {
  minutes: WorkoutMinutes;
  goal: WorkoutGoal;
  equipment: Equipment[];
  type: WorkoutType;
};

type ExerciseBase = {
  name: string;
  sets: number;
  restSeconds: number;
  notes?: string;
};

// An exercise is prescribed either by reps or by time, never both.
export type Exercise = ExerciseBase &
  (
    | { reps: number; durationSeconds?: never }
    | { durationSeconds: number; reps?: never }
  );

export type WorkoutResponse = {
  title: string;
  type: WorkoutType;
  // Length of the timed main block: the AMRAP time cap, or the EMOM's total minutes.
  durationMinutes: number;
  warmUp: string[];
  exercises: Exercise[];
  coolDown: string[];
};

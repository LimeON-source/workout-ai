import type { WorkoutRequest, WorkoutResponse } from "./types";

// Example only: the request this workout answers.
export const sampleWorkoutRequest: WorkoutRequest = {
  minutes: 30,
  goal: "strength",
  equipment: ["dumbbells", "pull-up-bar"],
  type: "EMOM",
};

export const sampleWorkout: WorkoutResponse = {
  title: "30-Minute Dumbbell & Pull-Up Strength EMOM",
  type: "EMOM",
  durationMinutes: 20,
  warmUp: [
    "2 min easy jumping jacks or marching in place",
    "10 arm circles each direction",
    "10 bodyweight squats",
    "8 inchworms with a shoulder tap",
    "20 s dead hang from the pull-up bar",
  ],
  exercises: [
    {
      name: "Goblet Squat",
      sets: 4,
      reps: 10,
      restSeconds: 0,
      notes: "Minute 1 of each round. Rest for whatever is left of the minute.",
    },
    {
      name: "Pull-Up",
      sets: 4,
      reps: 6,
      restSeconds: 0,
      notes: "Minute 2. Swap for slow negatives if you can't hit 6 clean reps.",
    },
    {
      name: "Dumbbell Floor Press",
      sets: 4,
      reps: 10,
      restSeconds: 0,
      notes: "Minute 3. Pause briefly with elbows on the floor.",
    },
    {
      name: "Dumbbell Romanian Deadlift",
      sets: 4,
      reps: 10,
      restSeconds: 0,
      notes: "Minute 4. Hinge at the hips and keep the dumbbells close to your legs.",
    },
    {
      name: "Hollow Body Hold",
      sets: 4,
      durationSeconds: 30,
      restSeconds: 0,
      notes: "Minute 5. Keep your lower back pressed into the floor, then rest for the rest of the minute.",
    },
  ],
  coolDown: [
    "60 s child's pose",
    "45 s hamstring stretch each side",
    "45 s doorway chest stretch",
    "30 s lat stretch hanging or against a wall, each side",
    "1 min slow nasal breathing",
  ],
};

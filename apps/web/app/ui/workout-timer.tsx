"use client";

import { useEffect, useRef, useState } from "react";
import type { Exercise, WorkoutResponse } from "@/lib/types";

type Status = "idle" | "running" | "paused" | "done";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function prescription(exercise: Exercise) {
  return exercise.reps !== undefined
    ? `${exercise.reps} reps`
    : `${exercise.durationSeconds} s`;
}

function beep(ctx: AudioContext, frequency: number, ms: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = frequency;
  gain.gain.value = 0.2;
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + ms / 1000);
}

export default function WorkoutTimer({ workout }: { workout: WorkoutResponse }) {
  const { type, durationMinutes, exercises } = workout;
  const totalMs = durationMinutes * 60_000;

  const [status, setStatus] = useState<Status>("idle");
  const [elapsedMs, setElapsedMs] = useState(0);
  const [rounds, setRounds] = useState(0);

  // Date.now() at which elapsed time would have been zero; shifted on resume
  // so pauses don't count. Deriving from the clock avoids interval drift.
  const startedAtRef = useRef(0);
  const lastMinuteRef = useRef(-1);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (status !== "running") return;
    const id = setInterval(() => {
      const elapsed = Date.now() - startedAtRef.current;
      const audio = audioRef.current;
      if (elapsed >= totalMs) {
        setElapsedMs(totalMs);
        setStatus("done");
        if (audio) beep(audio, 440, 800);
        return;
      }
      const minute = Math.floor(elapsed / 60_000);
      if (minute !== lastMinuteRef.current) {
        lastMinuteRef.current = minute;
        if (type === "EMOM" && audio) beep(audio, 880, 200);
      }
      setElapsedMs(elapsed);
    }, 200);
    return () => clearInterval(id);
  }, [status, totalMs, type]);

  function start() {
    // Audio must be unlocked from a user gesture.
    audioRef.current ??= new AudioContext();
    void audioRef.current.resume();
    startedAtRef.current = Date.now() - elapsedMs;
    setStatus("running");
  }

  function pause() {
    setElapsedMs(Date.now() - startedAtRef.current);
    setStatus("paused");
  }

  function reset() {
    setStatus("idle");
    setElapsedMs(0);
    setRounds(0);
    lastMinuteRef.current = -1;
  }

  const remainingSeconds = Math.ceil((totalMs - elapsedMs) / 1000);

  // EMOM: each minute is one exercise, cycling through the list.
  const minute = Math.min(Math.floor(elapsedMs / 60_000), durationMinutes - 1);
  const current = exercises[minute % exercises.length];
  const next =
    minute + 1 < durationMinutes ? exercises[(minute + 1) % exercises.length] : null;
  const round = Math.floor(minute / exercises.length) + 1;
  const totalRounds = Math.ceil(durationMinutes / exercises.length);
  const secondsLeftInMinute = Math.ceil((60_000 - (elapsedMs % 60_000)) / 1000);

  return (
    <section className="flex flex-col gap-6 rounded-2xl bg-zinc-100 p-5 dark:bg-zinc-900">
      <div className="flex items-baseline justify-between text-sm text-zinc-600 dark:text-zinc-400">
        <span className="font-semibold uppercase tracking-wide">{type}</span>
        <span>{durationMinutes} min</span>
      </div>

      {status === "done" ? (
        <p className="text-center text-4xl font-bold">Done!</p>
      ) : type === "EMOM" ? (
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Minute {minute + 1} of {durationMinutes} · Round {round} of {totalRounds}
          </p>
          <p className="font-mono text-7xl font-bold tabular-nums">
            {formatTime(secondsLeftInMinute)}
          </p>
          <p className="text-2xl font-semibold">{current.name}</p>
          <p className="text-lg">{prescription(current)}</p>
          {current.notes && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{current.notes}</p>
          )}
          {next && (
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Next: {next.name} · {prescription(next)}
            </p>
          )}
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Total left {formatTime(remainingSeconds)}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-mono text-7xl font-bold tabular-nums">
            {formatTime(remainingSeconds)}
          </p>
          <ol className="w-full space-y-1 text-left">
            {exercises.map((exercise) => (
              <li key={exercise.name} className="flex justify-between gap-4">
                <span>{exercise.name}</span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {prescription(exercise)}
                </span>
              </li>
            ))}
          </ol>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setRounds((r) => Math.max(0, r - 1))}
              className="h-12 w-12 rounded-full border border-zinc-300 text-xl dark:border-zinc-700"
              aria-label="Remove a round"
            >
              −
            </button>
            <span className="text-lg">
              Rounds: <span className="font-bold tabular-nums">{rounds}</span>
            </span>
            <button
              type="button"
              onClick={() => setRounds((r) => r + 1)}
              className="h-12 w-12 rounded-full border border-zinc-300 text-xl dark:border-zinc-700"
              aria-label="Add a round"
            >
              +
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        {status === "running" ? (
          <button
            type="button"
            onClick={pause}
            className="h-12 flex-1 rounded-full bg-foreground font-medium text-background"
          >
            Pause
          </button>
        ) : (
          status !== "done" && (
            <button
              type="button"
              onClick={start}
              className="h-12 flex-1 rounded-full bg-foreground font-medium text-background"
            >
              {status === "paused" ? "Resume" : "Start"}
            </button>
          )
        )}
        <button
          type="button"
          onClick={reset}
          className="h-12 flex-1 rounded-full border border-zinc-300 font-medium dark:border-zinc-700"
        >
          Reset
        </button>
      </div>
    </section>
  );
}

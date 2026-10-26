"use client";

import { useState } from "react";
import { EQUIPMENT, type Equipment } from "@/lib/types";

const LABELS: Record<Equipment, string> = {
  none: "None",
  dumbbells: "Dumbbells",
  kettlebell: "Kettlebell",
  bands: "Bands",
  "pull-up-bar": "Pull-up bar",
  "full-gym": "Full gym",
};

// "None" is exclusive: picking it clears the rest, picking anything else clears it.
function toggle(selected: Equipment[], item: Equipment): Equipment[] {
  if (item === "none") return ["none"];
  const next = selected.includes(item)
    ? selected.filter((e) => e !== item)
    : [...selected.filter((e) => e !== "none"), item];
  return next.length > 0 ? next : ["none"];
}

export default function EquipmentChips({ name }: { name: string }) {
  const [selected, setSelected] = useState<Equipment[]>(["none"]);

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-sm font-semibold">Equipment</legend>
      <div className="flex flex-wrap gap-2">
        {EQUIPMENT.map((item) => (
          <label
            key={item}
            className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-zinc-300 px-4 text-sm font-medium transition-colors has-checked:border-foreground has-checked:bg-foreground has-checked:text-background has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-foreground dark:border-zinc-700"
          >
            <input
              type="checkbox"
              name={name}
              value={item}
              checked={selected.includes(item)}
              onChange={() => setSelected((s) => toggle(s, item))}
              className="sr-only"
            />
            {LABELS[item]}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

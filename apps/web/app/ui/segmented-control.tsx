type Option<T extends string | number> = { value: T; label: string };

// Radio group styled as a segmented control. Pure CSS, so it stays a server component.
export default function SegmentedControl<T extends string | number>({
  name,
  legend,
  options,
  defaultValue,
  className = "",
}: {
  name: string;
  legend: string;
  options: Option<T>[];
  defaultValue: T;
  className?: string;
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-sm font-semibold">{legend}</legend>
      <div className={`grid gap-1 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-900 ${className}`}>
        {options.map((option) => (
          <label
            key={option.value}
            className="flex min-h-11 cursor-pointer items-center justify-center rounded-lg px-2 text-sm font-medium text-zinc-600 transition-colors has-checked:bg-white has-checked:text-foreground has-checked:shadow-sm has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-foreground dark:text-zinc-400 dark:has-checked:bg-zinc-700"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              defaultChecked={option.value === defaultValue}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

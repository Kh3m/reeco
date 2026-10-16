"use client";

import { useId, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import {
  readThemePreference,
  setThemePreference,
  subscribeThemePreference,
  type ThemePreference,
} from "@/lib/theme";
import { IconMonitor, IconMoon, IconSun } from "./icons";

const OPTIONS: {
  value: ThemePreference;
  label: string;
  icon: typeof IconSun;
}[] = [
  { value: "light", label: "Light", icon: IconSun },
  { value: "dark", label: "Dark", icon: IconMoon },
  { value: "system", label: "System", icon: IconMonitor },
];

/**
 * Light / Dark / System theme switch. Built on native radio inputs, so arrow
 * keys and screen readers work without extra ARIA wiring. "System" (follow the
 * OS) is the default until the visitor picks otherwise.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const name = useId();
  // Server snapshot is "system"; the client snapshot reads what the inline
  // <head> script resolved, so hydration never mismatches.
  const pref = useSyncExternalStore(
    subscribeThemePreference,
    readThemePreference,
    () => "system" as const,
  );

  return (
    <fieldset
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-border bg-surface p-0.5",
        className,
      )}
    >
      <legend className="sr-only">Colour theme</legend>
      {OPTIONS.map(({ value, label, icon: Icon }) => {
        const checked = pref === value;
        return (
          <label
            key={value}
            title={label}
            className={cn(
              "relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold",
              checked
                ? "bg-foreground text-background"
                : "text-faint hover:text-foreground",
            )}
          >
            <input
              type="radio"
              name={name}
              value={value}
              checked={checked}
              onChange={() => setThemePreference(value)}
              className="sr-only"
            />
            <Icon className="h-3.5 w-3.5" />
            <span className="sr-only">{label}</span>
          </label>
        );
      })}
    </fieldset>
  );
}

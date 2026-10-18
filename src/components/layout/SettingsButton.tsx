"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function SettingsButton() {
  const pathname = usePathname();
  const isActive = pathname.startsWith("/settings");

  return (
    <Link
      href="/settings"
      aria-label="Settings"
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex h-9 w-12 items-center justify-center rounded-lg border-2 transition-all duration-200 shadow-sm",
        isActive
          ? "border-amber-600 bg-amber-600 text-white hover:bg-amber-700 dark:border-amber-500 dark:bg-amber-500 dark:text-stone-950 dark:hover:bg-amber-400"
          : "border-stone-300 bg-[#faf8f5] text-stone-700 hover:border-amber-500 hover:text-amber-700 dark:border-stone-700 dark:bg-[#161924] dark:text-stone-300 dark:hover:border-amber-400 dark:hover:text-amber-400"
      )}
    >
      <Settings className="h-[1.2rem] w-[1.5rem]" />
    </Link>
  );
}

export default SettingsButton;

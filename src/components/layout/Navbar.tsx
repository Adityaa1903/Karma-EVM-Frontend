"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ModeToggle } from "../darkModeToggle";
import { SettingsButton } from "./SettingsButton";
import WalletButton from "../ui/walletButton";
import BottomNavigation from "./BottomNavigation";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = "" }) => {
  const { resolvedTheme } = useTheme();
  
  const pathname = usePathname();
  const [isThemeReady, setIsThemeReady] = useState(false);

  useEffect(() => {
    if (resolvedTheme) {
      setIsThemeReady(true);
    }
  }, [resolvedTheme]);

  if (!isThemeReady) return null;

  const navItems = [
    { name: "Explore", href: "/explorePools" },
    { name: "Create", href: "/createPool" },
    { name: "Submit Price", href: "/submitPrice" },
    { name: "Portfolio", href: "/portfolio" },
  ];

  return (
    <>
      <header className={cn("justify-between z-50", className)}>
        <div className="mx-auto flex items-center justify-between relative dark:bg-[#0f1219] px-5 py-2">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="text-center">
                <Image
                  src="/logo.png"
                  alt="Karma Protocol bull and bear logo"
                  width={64}
                  height={64}
                  className="rounded-lg bg-[#fdfcee] p-1"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Mobile Mode Toggle */}
          <div className="hidden max-[900px]:flex items-center space-x-4">
            <SettingsButton />
            <ModeToggle />
          </div>

          {/* Desktop Navigation */}
          <nav
            className={cn(
              "hidden min-[900px]:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 text-sm md:text-base font-medium text-center px-8 py-2 rounded-full",
              "bg-stone-100/90 dark:bg-[#161924]/90 text-stone-800 dark:text-stone-200 backdrop-blur-md border border-stone-200/70 dark:border-amber-900/25 shadow-sm",
            )}
          >
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative pb-1 transition-colors duration-200",
                    isActive
                      ? "text-amber-700 dark:text-amber-400 font-semibold"
                      : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200",
                  )}
                >
                  {item.name}

                  {/* Active underline indicator */}
                  {isActive && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-amber-600 dark:bg-amber-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Controls */}
          <div className="hidden min-[900px]:flex items-center space-x-4">
            <ModeToggle />
            <SettingsButton />
            <WalletButton />
          </div>
        </div>
      </header>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </>
  );
};

export default Navbar;

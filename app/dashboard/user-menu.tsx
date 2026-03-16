"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, User } from "lucide-react";

type UserMenuProps = {
  displayName: string;
  logoutAction: () => Promise<void>;
};

export function UserMenu({ displayName, logoutAction }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex items-center space-x-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium transition hover:bg-white/30"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <User className="h-4 w-4" />
        <span>{displayName}</span>
        <ChevronDown
          className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen ? (
        <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl bg-white py-2 text-sm text-gray-700 shadow-xl">
          <form action={logoutAction}>
            <button
              type="submit"
              className="block w-full px-4 py-2 text-left font-medium transition hover:bg-gray-100"
            >
              Logout
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

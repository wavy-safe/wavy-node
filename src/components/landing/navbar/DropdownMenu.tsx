"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownItem {
  label: string;
  href?: string;
}

interface DropdownMenuProps {
  label: string;
  items: DropdownItem[];
}

export default function DropdownMenu({ label, items }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center space-x-1 text-sm font-medium text-[#1A2E44] hover:text-black dark:text-gray-100 dark:hover:text-white transition"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{label}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div
          className="absolute top-full mt-2 w-48 rounded-xl bg-white/70 backdrop-blur-md 
                     shadow-xl border border-white/30 z-50 py-2
                     dark:bg-white/10 dark:border-white/20"
        >
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href || "#"}
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-white/60 
                         hover:text-black transition
                         dark:text-gray-100 dark:hover:bg-white/20 dark:hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

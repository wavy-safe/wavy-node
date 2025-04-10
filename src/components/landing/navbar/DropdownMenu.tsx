"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownMenuProps {
  label: string;
  items: { label: string; href?: string }[];
}

export default function DropdownMenu({ label, items }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cierra el menú si se hace clic fuera
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
        className="flex items-center space-x-1 text-sm font-medium text-[#1A2E44] hover:text-black transition"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{label}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-48 rounded-lg bg-white shadow-xl border border-gray-200 z-50 py-2">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href || "#"}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

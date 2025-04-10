"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TallyModal } from "@/components/landing/TallyModal";
import { useNavbarLogic } from "@/components/landing/navbar/useNavbarLogic";
import DropdownMenu from "./DropdownMenu";


export default function Navbar() {
  const {
    isModalOpen,
    setIsModalOpen,
    loginOrRedirect,
    ready,
    dropdownMenus,
  } = useNavbarLogic();

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/wavyNode.svg"
              alt="Wavy Node Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="ml-2 text-base font-semibold text-[#1A2E44] sm:text-xl">
              Wavy Node
            </span>
          </div>

          {/* Menú principal */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-8 bg-gray-100/80 rounded-full px-6 py-2 backdrop-blur-sm">
              {dropdownMenus.map((menu) => (
                <DropdownMenu key={menu.label} label={menu.label} items={menu.items} />
              ))}
            </div>

            <div className="flex items-center ml-8 space-x-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-lg border border-[#1A2E44] bg-transparent px-3 py-1.5 text-xs font-medium text-[#1A2E44] transition-colors hover:bg-[#1A2E44] hover:text-white sm:px-4 sm:py-2 sm:text-sm"
              >
                Book a demo
              </button>
              <Button disabled={!ready} onClick={loginOrRedirect}>
                Launch App
              </Button>
            </div>
          </div>
        </div>
      </div>

      <TallyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
}

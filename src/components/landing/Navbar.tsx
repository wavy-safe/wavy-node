"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { TallyModal } from '@/components/landing/TallyModal';	

export default function Navbar() {
  const router = useRouter();
  const { authenticated, ready } = usePrivy();
  const { login } = useLogin({
    onComplete: (_user, _isNewUser, wasAlreadyAuthenticated, _loginMethod, _linkedAccount) => {
      if (wasAlreadyAuthenticated) return;
      router.push("/search");
    },
  });

  const loginOrRedirect = () => {
    if (!authenticated) return login();
    router.push("/search");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="border-b bg-[#F8FAFC]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
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
          <div className="flex items-center gap-2">
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

      {/* Modal de Tally */}
      <TallyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
}


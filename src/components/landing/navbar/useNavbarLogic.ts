"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLogin, usePrivy } from "@privy-io/react-auth";

interface DropdownItem {
  label: string;
  href?: string;
}

interface DropdownGroup {
  label: string;
  items: DropdownItem[];
}

export function useNavbarLogic() {
  const router = useRouter();
  const { authenticated, ready } = usePrivy();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { login } = useLogin({
    onComplete: ({ wasAlreadyAuthenticated }) => {
      if (!wasAlreadyAuthenticated) {
        router.push("/search");
      }
    },
  });

  const loginOrRedirect = useCallback(() => {
    if (!authenticated) return login();
    router.push("/search");
  }, [authenticated, login, router]);

  const dropdownMenus: DropdownGroup[] = [
    // {
    //   label: "For developers",
    //   items: [
    //     { label: "API Documentation", href: "" },
    //   ],
    // },
    {
      label: "For businesses",
      items: [
        { label: "Enterprise", href: "/enterprise" },
        { label: "Teams", href: "/teams" },
        { label: "Security", href: "/security" },
        { label: "Compliance", href: "/compliance" },
      ],
    },
    {
      label: "About",
      items: [
        { label: "Team", href: "/team" },
        { label: "Advisors", href: "/advisors" },
      ],
    },
  ];

  return {
    isModalOpen,
    setIsModalOpen,
    loginOrRedirect,
    ready,
    dropdownMenus,
  };
}

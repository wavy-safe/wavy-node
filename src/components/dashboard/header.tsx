'use client'

import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

export function Header({ children }: { children: React.ReactNode }) {
	const { user, authenticated, ready, logout } = usePrivy()
	const router = useRouter()

	const handleLogout = async () => {
		await logout()
		router.replace('/')
	}

	const username = useMemo<string>(() => {
		if (!ready || (ready && !user)) return ''

		// check linked accounts
		if (user?.email) return user.email.address
		if (user?.wallet) return user.wallet.address

		return ''
	}, [ready, user])

	if (!ready) return null
	if (!authenticated) {
		router.replace('/')
		return null
	}

	return <>
		<header className="flex items-center justify-between p-4 border-b">

			<div className="flex items-center gap-2">
				<Image
					src="./wavyNode.svg"
					alt="Wavy Node Logo"
					width={40}
					height={40} className="dark:invert" />
				<span className="text-xl font-medium">Wavy Node</span>
			</div>

			<DropdownMenu>
				<DropdownMenuTrigger>
					{username}
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem style={{ cursor: 'pointer' }} onClick={handleLogout}>Log out</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
		{children}
	</>
}
'use client'

import { PrivyProvider } from "@privy-io/react-auth";


export default function Providers({ children }: { children: React.ReactNode }) {
	const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID!

	return (
		<PrivyProvider
			appId={appId}
			config={{
				appearance: {
					theme: 'light',
					accentColor: '#676FFF',
					logo: '/wavyNode.svg',
					landingHeader: 'Log in to continue',
				},
				embeddedWallets: {
					createOnLogin: 'users-without-wallets',
				},
			}}
		>
			{children}
		</PrivyProvider>
	);
}

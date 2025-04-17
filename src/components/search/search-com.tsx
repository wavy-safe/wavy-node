"use client";

import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ENS_REGEX, EVM_ADDRESS_REGEX } from "@/utils/regex";

const isValidEthereumAddressOrENS = (input: string) => {
	return EVM_ADDRESS_REGEX.test(input) || ENS_REGEX.test(input);
};

export function Search() {
	const router = useRouter();
	const [query, setQuery] = useState("");
	const [error, setError] = useState<string | null>(null);

	const handleSearch = async () => {
		if (!query.trim()) {
			setError("Please enter a valid address or ENS.");
			return;
		}

		if (!isValidEthereumAddressOrENS(query)) {
			setError("Invalid Ethereum address or ENS (must end with .eth).");
			return;
		}

		setError(null); 
		router.push(`/search/address/${query}`);
	};

	return (
		<div className="w-full min-h-[120px] from-white">
			<div className="mx-auto px-4 py-8 space-y-6">
				{/* Input de búsqueda */}
				<div className="flex justify-center flex-col items-center mb-5">
					<Image src="/wavyNode.svg" alt="Wavy Node Logo" width={150} height={40} className="dark:invert" />
					<p className="text-3xl font-medium my-3">Wavy Node</p>
				</div>
				<div className="relative w-2/3 mx-auto">
					<Input
						type="search"
						placeholder="Search Wallet"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleSearch()}
						className="w-full h-12 pl-6 pr-12 rounded-full border border-gray-300 bg-white text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
					/>
					<div
						className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 cursor-pointer"
						onClick={handleSearch}
					>
						<SearchIcon className="h-5 w-5" />
					</div>
				</div>
				{/* Mensaje de error */}
				{error && (
					<p className="text-center text-red-500 text-sm font-medium">
						{error}
					</p>
				)}

				{/* Título descriptivo */}
				<p className="text-center text-gray-600 text-sm font-light">
					Search the status of a wallet or ENS
				</p>
				<div className="pt-4">
					<Separator className="bg-gradient-to-r from-transparent to-transparent h-[1px]" />
				</div>
				{/* Resultados o Exploits */}
				<div className="pt-6">	
				</div>
			</div>
		</div>
	);
}

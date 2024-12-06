import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
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
            <Link
              href="#"
              className="rounded-lg border border-[#1A2E44] bg-transparent px-3 py-1.5 text-xs font-medium text-[#1A2E44] transition-colors hover:bg-[#1A2E44] hover:text-white sm:px-4 sm:py-2 sm:text-sm"
            >
              Book a demo
            </Link>
            <Link
              href="./dashboard"
              className="rounded-lg bg-[#1A2E44] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#1A2E44]/90 sm:px-4 sm:py-2 sm:text-sm"
            >
              Launch App
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

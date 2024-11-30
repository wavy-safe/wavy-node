import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="bg-[#F8FAFC] px-4 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1 className="text-left text-3xl font-bold tracking-tight text-[#1A2E44] sm:text-4xl md:text-5xl lg:text-6xl">
              AI-powered threat detection and identification of transactions
            </h1>
            <p className="mt-6 text-left text-base text-[#64748B] sm:text-lg md:text-xl">
              We monitor, identify and track malicious wallets, alerting dApps
              and exchanges generating detailed activity reports, preventing
              interaction with high-risk users.
            </p>
            <div className="mt-8 sm:mt-10">
              <Link
                href="#"
                className="inline-flex items-center rounded-lg bg-[#1A2E44] px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-[#1A2E44]/90"
              >
                Book a demo
              </Link>
            </div>
          </div>
          <div className="relative mt-20 lg:col-span-5 lg:mt-0">
            <div className="absolute right-0 top-0 rounded-lg border border-[#1A2E44]/10 bg-white p-4 shadow-sm">
              <div className="text-sm font-medium text-[#1A2E44]">Networks</div>
              <div className="mt-2">
                <Image
                  src="/network-icon.svg"
                  alt="Network icon"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
              </div>
            </div>
            <div className="mt-16 rounded-2xl bg-[#1A2E44]/5 px-6 py-8 sm:mt-24 sm:px-8 sm:py-12">
              {/* Placeholder for additional content */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function ExploreProduct() {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC]">
      <div className="absolute left-0 top-0 h-full w-full bg-[#1A2E44] lg:w-[60%]" />

      <div className="relative px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4 text-left text-white">
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl lg:text-4xl">
                Explore our Public Good
              </h2>
              <p className="text-sm text-gray-200 sm:text-base md:text-lg">
                Our public good alerts protocols and users about exploits,
                provide public RPCs in every network that we support. We also
                offer an on-chain data scanner and wallet portfolio viewer.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 lg:mt-0 lg:items-end lg:justify-end">
              <Link
                href="#"
                className="w-full rounded-lg bg-[#F8FAFC] px-4 py-2 text-center text-sm font-medium text-[#1A2E44] transition-colors hover:bg-white lg:w-auto"
              >
                Launch App
              </Link>
              <Link
                href="#"
                className="w-full rounded-lg border border-white bg-transparent px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-white/10 lg:w-auto"
              >
                Wallet Extension
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative px-4 pb-8 text-center sm:px-6 lg:px-8">
        <p className="text-xs text-[#64748B] sm:text-sm">@wavynode</p>
        <button className="mt-4 rounded-lg bg-[#1A2E44] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#1A2E44]/90 sm:text-sm">
          Feedback
        </button>
      </div>
    </section>
  );
}

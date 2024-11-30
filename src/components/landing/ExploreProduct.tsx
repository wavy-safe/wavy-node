import Link from "next/link";

export default function ExploreProduct() {
  return (
    <section className="relative overflow-hidden bg-[#1A2E44]">
      <div className="relative px-4 py-16 sm:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2 space-y-6 text-left text-white">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Explore our Public Good
            </h2>
            <p className="text-lg text-gray-200 sm:text-xl md:text-2xl">
              Our public good alerts protocols and users about exploits, provide
              public RPCs in every network that we support. We also offer an
              on-chain data scanner and wallet portfolio viewer.
            </p>
          </div>
          <div className="mt-12 lg:mt-0 lg:w-1/2 lg:flex lg:justify-center lg:items-center">
            <div className="flex flex-col items-center gap-6 lg:items-end">
              <Link
                href="#"
                className="rounded-lg bg-[#F8FAFC] px-8 py-4 text-center text-lg font-medium text-[#1A2E44] transition-colors hover:bg-white shadow-md lg:w-auto"
              >
                Launch App
              </Link>
              <Link
                href="#"
                className="rounded-lg border border-white bg-transparent px-8 py-4 text-center text-lg font-medium text-white transition-colors hover:bg-white/10 lg:w-auto"
              >
                Wallet Extension
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative px-4 pb-16 text-center sm:px-6 lg:px-8">
        <button className="mt-8 rounded-lg bg-[#1A2E44] px-8 py-4 text-base font-medium text-white transition-colors hover:bg-[#1A2E44]/90 sm:text-lg">
          Feedback
        </button>
      </div>
    </section>
  );
}

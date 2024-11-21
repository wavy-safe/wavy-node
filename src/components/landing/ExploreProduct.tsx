import { Button } from "@/components/ui/button";

export default function ExploreProduct() {
  return (
    <section className="relative w-full py-32">
      {/* Top diagonal stripe */}
      <div className="absolute top-0 left-0 w-full h-48 bg-[#2D2E89] transform -skew-y-6" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mt-32">
          <h2 className="text-4xl font-bold text-[#2F2F2F] mb-6">
            Explore our Public Good
          </h2>
          <p className="text-xl text-[#545454] mb-12">
            Our public good alerts protocols and users about exploits, provide
            public RPCs in every network that we support. We also offer an
            on-chain data scanner and wallet portfolio viewer.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-[#2D2E89] text-white hover:bg-[#394754]">
              Launch App
            </Button>
            <Button
              variant="outline"
              className="border-[#2D2E89] text-[#2D2E89] hover:bg-[#C8E1EE] hover:text-[#2D2E89] hover:border-[#2D2E89]"
            >
              Wallet Extension
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom diagonal stripe */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-[#2D2E89] transform skew-y-6" />
    </section>
  );
}

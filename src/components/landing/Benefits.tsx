import { Button } from "@/components/ui/button";

export default function ExploreProduct() {
  return (
    <section className="relative w-full py-32 overflow-hidden">
      {/* Top Diagonal Divider */}
      <div className="absolute top-0 left-0 w-full h-32 bg-[#2D2E89] transform skew-y-3 origin-top-right" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center mt-20">
        <h2 className="text-4xl font-bold text-[#2F2F2F] mb-6">
          Explore our Public Good
        </h2>
        <p className="text-xl text-[#545454] mb-12 max-w-3xl mx-auto">
          Our public good alerts protocols and users about exploits, provide
          public RPCs in every network that we support. We also offer an
          on-chain data scanner and wallet portfolio viewer.
        </p>
        <div className="flex justify-center gap-4">
          <Button className="bg-[#2D2E89] text-[#F9F9F9] hover:bg-[#394754] px-8 py-6">
            Launch App
          </Button>
          <Button
            variant="outline"
            className="border-[#2D2E89] text-[#2D2E89] hover:bg-[#C8E1EE] hover:text-[#2D2E89] hover:border-[#2D2E89] px-8 py-6"
          >
            Wallet Extension
          </Button>
        </div>
      </div>

      {/* Bottom Diagonal Divider */}
      <div className="absolute bottom-0 right-0 w-full h-32 bg-[#2D2E89] transform -skew-y-3 origin-bottom-left" />
    </section>
  );
}

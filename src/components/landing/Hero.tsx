import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen pb-32">
      {/* Header */}
      <header className="container mx-auto px-4 py-8 flex justify-between items-center">
        <Image
          src="/wavyNode.svg"
          alt="Wavy Node Logo"
          width={150}
          height={40}
          className="h-10 w-auto"
        />
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="border-[#2D2E89] text-[#2D2E89] hover:bg-[#C8E1EE] hover:text-[#2D2E89] hover:border-[#2D2E89]"
          >
            Book a demo
          </Button>
          <Button className="bg-[#2D2E89] text-[#F9F9F9] hover:bg-[#394754]">
            Launch App
          </Button>
        </div>
      </header>

      {/* Hero Content */}
      <div className="container mx-auto px-4 mt-20 relative">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-[#2F2F2F] mb-8">
            AI-powered threat detection and identification of transactions
          </h1>
          <p className="text-xl text-[#545454] mb-12 max-w-2xl">
            We monitor, identify and track malicious wallets, alerting dApps and
            exchanges generating detailed activity reports, preventing
            interaction with high-risk users.
          </p>
          <Button className="bg-[#2D2E89] text-[#F9F9F9] hover:bg-[#394754] text-lg px-8 py-6">
            Book a demo
          </Button>
        </div>

        {/* Networks Card */}
        <div className="absolute right-4 top-0 bg-[#F9F9F9] rounded-lg shadow-lg p-6 border border-[#D6D6ED]">
          <span className="block text-sm font-medium text-[#545454] mb-4">
            Networks
          </span>
          <Image
            src="/arB.svg"
            alt="Networks Icon"
            width={80}
            height={80}
            className="w-20 h-20"
          />
        </div>
      </div>

      {/* Diagonal Divider */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-[#2D2E89] transform -skew-y-3 origin-bottom-right" />
    </section>
  );
}

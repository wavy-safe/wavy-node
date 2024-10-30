import FeatureBox from "./FeatureBox";
import Header from "./Header";

export default function MainContent() {
  return (
    <main className="p-8">
      {/* Container for the main content */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        {/* Section for heading and introductory text */}
        <div className="max-w-lg text-center">
          <h2 className="text-2xl font-bold mb-2">
            Stay Protected: Real-Time Exploit Detection and On-Chain Data
            Insights
          </h2>
          <p className="text-gray-700 p-4">
            Our platform is a public good for the blockchain community,
            providing critical exploit alerts to protocols and users alike. With
            a commitment to security, we offer public RPCs across every
            supported network, ensuring rapid and reliable access to real-time
            data.
          </p>
        </div>

        {/* FeatureBox component */}
        <div className="mt-6">
          <FeatureBox title="Accurate Detection of Connections with dApps" />
        </div>

        {/* Secondary heading */}
        <div className="text-center mt-8">
          <h2 className="text-lg font-bold">
            We warn of possible dangerous connections to dApps.
          </h2>
        </div>

        {/* Networks section */}
        <div className="flex justify-center md:justify-end mt-8">
          <div className="bg-gray-700 p-8 rounded-md text-center">
            <span className="text-white block text-sm font-bold">Networks</span>
            <img src="ethL.svg" alt="Networks Icon" className="mx-auto mt-2" />
          </div>
        </div>
      </div>
    </main>
  );
}

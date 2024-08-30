import FeatureBox from "./FeatureBox";
import Header from "./Header";

export default function MainContent() {
  return (
    <main className="p-8">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
        <div className="max-w-lg">
          <h2 className="text-2xl font-bold mb-2">
            Total monitoring of Tornado Cash, Blocked Wallets and Exploits
          </h2>
          <p className="text-gray-700">
            We monitor Tornado Cash, identify blacklisted wallets and track
            illegal EVM protocols.
          </p>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="bg-gray-700 p-8 rounded-md text-center">
            <span className="text-white block text-sm font-bold">Networks</span>
            <img src="arB.svg" alt="Networks Icon" className="mx-auto mt-2" />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <FeatureBox
          title="Accurate Detection of Connections with dApps"
          description="We identify illicit funds and analyze their route to dApps, ensuring comprehensive, real-time monitoring."
        />
      </div>

      <div className="text-center mt-8">
        <h2 className="text-lg font-bold">
          We warn of possible dangerous connections to dApps.
        </h2>
      </div>
    </main>
  );
}

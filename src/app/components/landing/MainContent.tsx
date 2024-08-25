import FeatureBox from './FeatureBox';

export default function MainContent() {
  return (
    <main className="flex flex-col items-center p-8">
      <h2 className="text-3xl font-bold mb-4">
        Total monitoring of Tornado Cash, Blocked Wallets and Exploits
      </h2>
      <p className="mb-4">
        We monitor Tornado Cash, identify blacklisted wallets and track
        illegal EVM protocols.
      </p>

      <FeatureBox 
        title="Accurate Detection of Connections with dApps"
        description="We identify illicit funds and analyze their route to dApps, ensuring comprehensive, real-time monitoring."
      />

      <h2 className="text-lg font-bold mt-4">
        We warn of possible dangerous connections to dApps.
      </h2>
    </main>
  );
}

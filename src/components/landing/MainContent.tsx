<<<<<<< HEAD
import Header from './Header';
import FeatureBox from './FeatureBox';
=======
import FeatureBox from "./FeatureBox";
import Header from "./Header";
>>>>>>> origin/main

export default function MainContent() {
  return (
    <main className="p-8">
<<<<<<< HEAD
      <div className="flex flex-col items-center justify-center main-h-screen bg-gray-50">
        <div className="max-w-lg">
          <h2 className="text-2xl font-bold mb-2">
            Total monitoring of Tornado Cash, Blocked Wallets and Exploits
          </h2>
          <p className="text-gray-700">
            We monitor Tornado Cash, identify blacklisted wallets and track
            illegal EVM protocols.
          </p>
        </div>

        <div className="mt-6">
          <FeatureBox
            title="Accurate Detection of Connections with dApps"
            description="We identify illicit funds and analyze their route to dApps, ensuring comprehensive, real-time monitoring."
          />
        </div>

=======
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
>>>>>>> origin/main
        <div className="text-center mt-8">
          <h2 className="text-lg font-bold">
            We warn of possible dangerous connections to dApps.
          </h2>
        </div>

<<<<<<< HEAD
        <div className="flex justify-center md:justify-end mt-4 ">
          <div className="bg-gray-700 p-8 rounded-md text-center">
            <span className="text-white block text-sm font-bold">Networks</span>
            <img src="ethL.svg" alt="Networks Icon" className="mx-1 mt-2" />
=======
        {/* Networks section */}
        <div className="flex justify-center md:justify-end mt-8">
          <div className="bg-gray-700 p-8 rounded-md text-center">
            <span className="text-white block text-sm font-bold">Networks</span>
            <img src="ethL.svg" alt="Networks Icon" className="mx-auto mt-2" />
>>>>>>> origin/main
          </div>
        </div>
      </div>
    </main>
  );
}

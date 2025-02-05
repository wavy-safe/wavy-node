import React, { useState } from 'react';
import { ethers } from 'ethers';

interface WalletPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (connectionInfo: {
    provider: ethers.providers.Web3Provider;
    signer: ethers.Signer;
    address: string;
    network: {
      name: string;
      chainId: number;
    };
  }) => void;
}

const WalletPopup: React.FC<WalletPopupProps> = ({ isOpen, onClose, onConnect }) => {
  const [error, setError] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const connectWallet = async () => {
    try {
      setError('');
      setIsConnecting(true);

      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();
      
      // Enhanced network info
      const networkInfo = {
        name: network.name,
        chainId: network.chainId
      };

      onConnect({ provider, signer, address, network: networkInfo });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isConnecting ? (
            <>
              <svg 
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Connecting...
            </>
          ) : (
            'Connect MetaMask'
          )}
        </button>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Connect your wallet to interact with the application
        </p>
      </div>
    </div>
  );
};

export default WalletPopup;
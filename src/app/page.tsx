'use client'

import Hero from "@/components/landing/Hero";
import ExploreProduct from "@/components/landing/ExploreProduct";
import Footer from "@/components/landing/Footer";
import Navbar from "../components/landing/Navbar";


// Import restapi for function calls
// Import socket for listening for real time messages
import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';

// Ethers or Viem, both are supported
import { ethers } from 'ethers';
import { useState } from 'react';


export default function Home() {
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [address, setAddress] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("Gm gm! It's a me... Mario");
  const [pushUser, setPushUser] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const WAVY_NODE_HELP_ADDRESS = "0xbe5F169a321ADaA76649a381f7dF6b63c7CCb335";

  async function connectWallet() {
    try {
      if (typeof window.ethereum === "undefined") {
        alert("Please install MetaMask!");
        return;
      }

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Get provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const newSigner = provider.getSigner();
      const userAddress = await newSigner.getAddress();
      
      setSigner(newSigner);
      setAddress(userAddress);
      setIsConnected(true);
      
      console.log("Wallet connected:", userAddress);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  }
  
  async function initialize() {
    try {
      if (!signer) {
        alert("Please connect your wallet first!");
        return;
      }

      // Initialize wallet user with connected signer
      const user = await PushAPI.initialize(signer, {
        env: CONSTANTS.ENV.PROD,
      });
      
      setPushUser(user);
      setIsInitialized(true);
      console.log("Push User initialized:", user);

      // Initialize Stream
      const stream = await user.initStream([CONSTANTS.STREAM.CHAT]);

      // Configure stream listen events and what to do
      stream.on(CONSTANTS.STREAM.CHAT, (message: any) => {
        console.log("New message received:", message);
      });

      // Connect Stream
      await stream.connect();
      console.log("Stream connected successfully");

    } catch (error) {
      console.error("Error initializing Push:", error);
      alert("Error initializing Push. Check console for details.");
    }
  }

  async function sendMessage() {
    try {
      if (!pushUser) {
        alert("Please initialize Push first!");
        return;
      }

      if (!message.trim()) {
        alert("Please enter a message!");
        return;
      }

      // Send a message to recipient
      const sendMessage = await pushUser.chat.send(WAVY_NODE_HELP_ADDRESS, {
        content: message,
        type: 'Text',
      });
      console.log("Message sent:", sendMessage);
      
      // Clear message input after sending
      setMessage("");

    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message. Check console for details.");
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />

      <div className="flex flex-col items-center justify-center space-y-4 py-20">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center mb-4">PUSH_CHAT</h2>

          <div className="space-y-4">
            <button 
              onClick={connectWallet}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              {isConnected ? `Connected: ${address.slice(0,6)}...${address.slice(-4)}` : 'Connect Wallet'}
            </button>

            <button 
              onClick={initialize}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
              disabled={!isConnected}
            >
              {isInitialized ? 'Initialized' : 'Initialize Push'}
            </button>

            <div className="border-t pt-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                className="w-full p-2 border rounded mb-2"
              />

              <button 
                onClick={sendMessage}
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full"
                disabled={!isInitialized}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>

      <ExploreProduct />
      <Footer />
    </main>
  );
}

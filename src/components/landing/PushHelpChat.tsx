"use client";

import { useState, useRef, useEffect } from "react";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, MessageCircle } from "lucide-react"; 

export default function PushHelpChat() {
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [address, setAddress] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [pushUser, setPushUser] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const WAVY_NODE_HELP_ADDRESS = "0xbe5F169a321ADaA76649a381f7dF6b63c7CCb335";
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (pushUser && isConnected) {
      loadLatestMessages();
      intervalRef.current = setInterval(loadLatestMessages, 3000);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [pushUser, isConnected]);

  const loadLatestMessages = async () => {
    try {
      if (pushUser) {
        const chatHistory = await pushUser.chat.history(WAVY_NODE_HELP_ADDRESS);
        setMessages(chatHistory);
      }
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  async function connectWallet() {
    try {
      if (typeof window.ethereum === "undefined") {
        alert("Please install MetaMask!");
        return;
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const newSigner = provider.getSigner();
      const userAddress = await newSigner.getAddress();

      setSigner(newSigner);
      setAddress(userAddress);
      setIsConnected(true);

      const user = await PushAPI.initialize(newSigner, {
        env: CONSTANTS.ENV.PROD,
      });

      setPushUser(user);
      setIsInitialized(true);

      const chatHistory = await user.chat.history(WAVY_NODE_HELP_ADDRESS);
      setMessages(chatHistory);
    } catch (error) {
      console.error("Error in connection flow:", error);
      alert("Error in connection flow. Check console for details.");
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

      await pushUser.chat.send(WAVY_NODE_HELP_ADDRESS, {
        content: message,
        type: "Text",
      });

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message. Check console for details.");
    }
  }

  return (
    <div className={`relative ${isChatOpen ? "pb-24" : ""}`}>
      <Button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-4 right-4 bg-[#1A2E44] hover:bg-[#16324A] text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-all"
        size="icon"
      >
        {isChatOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {isChatOpen && (
        <Card className="fixed bottom-16 right-4 w-80 shadow-lg border border-gray-200 bg-white rounded-lg z-50">
          <CardHeader className="relative bg-[#1A2E44] text-white flex justify-between items-center p-4 rounded-t-lg">
            <CardTitle className="text-lg">Wavy Node Chat</CardTitle>

            
            <Button
              variant="ghost"
              onClick={() => setIsChatOpen(false)}
              className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
              size="icon"
            >
              <X size={18} className="text-white" />
            </Button>
          </CardHeader>

          <CardContent>
            <div className="p-4 max-h-80 overflow-y-auto space-y-2" ref={messageContainerRef}>
              {messages.slice().reverse().map((message, index) => {
                const isUserMessage = message.fromDID.replace("eip155:", "") === address;
                return (
                  <div
                    key={index}
                    className={`flex ${isUserMessage ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] w-auto break-words rounded-lg px-3 py-2 text-sm ${
                        isUserMessage ? "bg-[#1A2E44] text-white" : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {message.messageContent}
                    </div>
                  </div>
                );
              })}
            </div>

            {isConnected ? (
              <div className="border-t p-3 flex">
                <Input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a message..."
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  className="ml-2 bg-[#1A2E44] hover:bg-[#16324A] text-white"
                >
                  Send
                </Button>
              </div>
            ) : (
              <Button
                onClick={connectWallet}
                className="w-full bg-[#1A2E44] hover:bg-[#16324A] text-white"
              >
                Connect Wallet
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

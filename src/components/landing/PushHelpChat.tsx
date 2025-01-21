'use client'

import { useState, useRef, useEffect } from 'react'
import { PushAPI, CONSTANTS } from '@pushprotocol/restapi'
import { ethers } from 'ethers'

export default function PushHelpChat() {
  const [signer, setSigner] = useState<ethers.Signer | null>(null)
  const [address, setAddress] = useState<string>("")
  const [isConnected, setIsConnected] = useState(false)
  const [message, setMessage] = useState("Type help message here...")
  const [messages, setMessages] = useState<any[]>([])
  const messageContainerRef = useRef<HTMLDivElement>(null)
  const [pushUser, setPushUser] = useState<any>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const WAVY_NODE_HELP_ADDRESS = "0xbe5F169a321ADaA76649a381f7dF6b63c7CCb335"
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (pushUser && isConnected) {
      loadLatestMessages()
      intervalRef.current = setInterval(loadLatestMessages, 1000)
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [pushUser, isConnected])

  const loadLatestMessages = async () => {
    try {
      if (pushUser) {
        const chatHistory = await pushUser.chat.history(WAVY_NODE_HELP_ADDRESS)
        setMessages(chatHistory)
      }
    } catch (error) {
      console.error("Error loading messages:", error)
    }
  }

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  async function connectWallet() {
    try {
      if (typeof window.ethereum === "undefined") {
        alert("Please install MetaMask!")
        return
      }

      await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const newSigner = provider.getSigner()
      const userAddress = await newSigner.getAddress()
      
      setSigner(newSigner)
      setAddress(userAddress)
      setIsConnected(true)
      
      console.log("Wallet connected:", userAddress)

      const user = await PushAPI.initialize(newSigner, {
        env: CONSTANTS.ENV.PROD,
      })
      
      setPushUser(user)
      setIsInitialized(true)
      console.log("Push User initialized:", user)

      const stream = await user.initStream([CONSTANTS.STREAM.CHAT])
      stream.on(CONSTANTS.STREAM.CHAT, (message: any) => {
        console.log("New message received:", message)
      })
      await stream.connect()
      console.log("Stream connected successfully")

      const chatHistory = await user.chat.history(WAVY_NODE_HELP_ADDRESS)
      console.log("Chat history loaded:", chatHistory)
      setMessages(chatHistory)

    } catch (error) {
      console.error("Error in connection flow:", error)
      alert("Error in connection flow. Check console for details.")
    }
  }

  async function sendMessage() {
    try {
      if (!pushUser) {
        alert("Please initialize Push first!")
        return
      }

      if (!message.trim()) {
        alert("Please enter a message!")
        return
      }

      await pushUser.chat.send(WAVY_NODE_HELP_ADDRESS, {
        content: message,
        type: 'Text',
      })
      setMessage("")

    } catch (error) {
      console.error("Error sending message:", error)
      alert("Error sending message. Check console for details.")
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4">PUSH_CHAT</h2>

      <div className="space-y-4">
        <button 
          onClick={connectWallet}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          {isConnected ? `Connected: ${address.slice(0,6)}...${address.slice(-4)}` : 'Connect wallet to chat'}
        </button>

        {isConnected && (
          <>
            <div className="space-y-2 max-h-[400px] overflow-y-auto p-4 border rounded"
                 ref={messageContainerRef}>
              {messages.slice().reverse().map((message, index) => {
                const isUserMessage = message.fromDID.replace('eip155:', '') === address
                const isWavyHelp = message.fromDID.replace('eip155:', '') === WAVY_NODE_HELP_ADDRESS
                const cleanAddress = message.fromDID.replace('eip155:', '')
                const shortAddress = `${cleanAddress.slice(0,6)}...${cleanAddress.slice(-4)}`
                
                let displayName = shortAddress
                if (isUserMessage) {
                  displayName = `YOU (${shortAddress})`
                } else if (isWavyHelp) {
                  displayName = `WAVY HELP (${shortAddress})`
                }

                return (
                  <div 
                    key={index} 
                    className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        isUserMessage 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      <p className="text-sm opacity-75 mb-1">
                        {displayName}
                      </p>
                      <p>{message.messageContent}</p>
                    </div>
                  </div>
                )
              })}
            </div>

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
          </>
        )}
      </div>
    </div>
  )
} 
"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, Moon, Star, Eye } from "lucide-react"
import { getRandomCards } from '../lib/utils'
import { getTarotReadingFromGemini } from '../lib/geminiApi'

let dummyWalletData = { // Made it a let to update address
  address: '0xABCD...',
  balance: 0.72,
  nftCount: 3
};

interface TarotCard {
  name: string;
  filename: string;
}

interface Reading {
  past: { card: string; text: string };
  present: { card: string; text: string };
  future: { card: string; text: string };
}

export default function CosmicWalletTarot() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");
  const [showReading, setShowReading] = useState(true)
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [reading, setReading] = useState<Reading | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        setIsConnected(true);
        setError(""); // Clear previous errors

        // Update dummyWalletData with the connected address
        dummyWalletData = {
          ...dummyWalletData,
          address: address,
        };

        await handleDrawCards(); // Proceed with drawing cards
      } catch (err: any) {
        console.error("User denied account access or error occurred:", err);
        setError(
          "Failed to connect wallet. User denied access or an error occurred."
        );
        setIsConnected(false);
      }
    } else {
      console.log("MetaMask not installed");
      setError("MetaMask is not installed. Please install it to connect.");
      setIsConnected(false);
    }
  };

  const handleNewReading = () => {
    handleDrawCards();
  };

  const handleDrawCards = async () => {
    setIsLoading(true);
    setError(""); // Clear previous errors
    setReading(null); // Clear previous reading
    try {
      const cards = getRandomCards();
      setSelectedCards(cards);
      const readingResponse = await getTarotReadingFromGemini(cards, dummyWalletData);
      setReading(readingResponse);
    } catch (err: any) { // Changed to err: any for consistency and to access message
      console.error("Error fetching tarot reading:", err);
      setReading(null);
      setError(err.message || "An error occurred while fetching your tarot reading.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="stars"></div>
        <div className="floating-particles"></div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-start px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Moon className="w-8 h-8 text-yellow-400 mr-4 animate-pulse" />
            <Sparkles className="w-6 h-6 text-purple-300" />
            <Star className="w-8 h-8 text-yellow-400 ml-4 animate-pulse" />
          </div>

          <h1 className="text-5xl md:text-7xl font-serif mb-6 bg-gradient-to-r from-purple-300 via-yellow-400 to-purple-300 bg-clip-text text-transparent leading-tight">
            <span className="mystic-flicker">Unlock the Mysteries of Your Wallet's Past, Present & Future</span>
          </h1>

          <p className="text-xl md:text-2xl text-purple-200 mb-12 font-light">
            A 3-Card Tarot Reading Inspired by Your Web3 Energy
          </p>

          {!isConnected ? (
            <Button
              onClick={handleConnect}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 border border-purple-400/30"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Connect Wallet
            </Button>
          ) : (
            <div className="text-purple-300 text-lg">
              {isLoading ? (
                <>
                  <Eye className="w-6 h-6 inline mr-2 animate-pulse" />
                  Loading reading...
                </>
              ) : walletAddress ? (
                <div className="text-center">
                  <p className="text-xl font-semibold break-all">Connected: {walletAddress}</p>
                </div>
              ) : (
                <>
                  <Eye className="w-6 h-6 inline mr-2" />
                  Your cosmic energy is awakening...
                </>
              )}
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 text-red-400 bg-red-900/50 p-3 rounded-md max-w-md mx-auto">
            <p>{error}</p>
          </div>
        )}

        {/* Floating Tarot Card Preview */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div className="w-16 h-24 bg-gradient-to-b from-purple-800 to-indigo-900 rounded-lg border border-purple-400/30 shadow-lg animate-float">
            <div className="w-full h-full bg-gradient-to-b from-purple-600/20 to-transparent rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Reading Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-purple-200">Your Cosmic Reading</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[0, 1, 2].map((index) => (
              <Card
                key={index}
                className="bg-gradient-to-b from-slate-800/50 to-purple-900/30 border border-purple-400/30 backdrop-blur-sm hover:border-purple-300/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 reading-card"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="p-6 text-center">
                  {/* Period Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-script text-yellow-400 mb-2">
                      {index === 0 ? "Past" : index === 1 ? "Present" : "Future"}
                    </h3>
                    <div className="flex items-center justify-center">
                      <div className="w-8 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                      <Star className="w-4 h-4 text-purple-300 mx-2" />
                      <div className="w-8 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                    </div>
                  </div>

                  {/* Tarot Card Image */}
                  <div className="mb-6 relative group">
                    <div className="w-48 h-72 mx-auto rounded-lg overflow-hidden border-2 border-purple-400/30 shadow-lg group-hover:shadow-purple-400/40 transition-all duration-300">
                      <img
                        src={selectedCards[index]?.filename ? `/tarot-deck/${selectedCards[index].filename}` : "/placeholder.svg"}
                        alt={selectedCards[index]?.name || "Placeholder Card"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
                    </div>
                  </div>

                  {/* Card Name */}
                  <h4 className="text-2xl font-script text-yellow-400 mb-4 glow-text">
                    {selectedCards[index]?.name || ""}
                  </h4>

                  {/* Mystical Heading and Content/Interpretation */}
                  <p className="text-purple-100 mb-4 leading-relaxed">
                    {reading && index === 0 && reading.past ? reading.past.text :
                     reading && index === 1 && reading.present ? reading.present.text :
                     reading && index === 2 && reading.future ? reading.future.text :
                     ""}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      {showReading && !isLoading && (
        <section className="py-20 px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>

            <h3 className="text-3xl md:text-4xl font-serif mb-6 text-purple-200">
              Draw New Cards and Discover What the Universe Reveals Next
            </h3>

            <Button
              onClick={handleDrawCards}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-slate-900 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Draw Again
            </Button>

            <p className="text-sm text-purple-400 mt-6">Powered by Gemini AI and your cosmic Web3 essence</p>
          </div>
        </section>
      )}
    </div>
  );
}

import { GoogleGenerativeAI } from '@google/generative-ai';
import tarotCards from './tarotCards';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);

interface WalletData {
  address: string;
  balance: number;
  nftCount: number;
}

export async function getTarotReadingFromGemini(cards: typeof tarotCards, walletData: WalletData) {
  const prompt = `You are a mystical tarot reader.
A user connected with the following Web3 wallet data:
- Address: ${walletData.address}
- ETH Balance: ${walletData.balance}
- NFT Count: ${walletData.nftCount}

They drew the following tarot cards:
1. ${cards[0].name}
2. ${cards[1].name}
3. ${cards[2].name}

Give them a poetic tarot reading in three parts (Past, Present, Future), interpreting one card per section. Each should include the card name and mystical text.`;

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Parse the response to extract past, present, and future readings
  const sections = text.split('\n\n');
  return {
    past: { card: cards[0].name, text: sections[0] },
    present: { card: cards[1].name, text: sections[1] },
    future: { card: cards[2].name, text: sections[2] }
  };
} 
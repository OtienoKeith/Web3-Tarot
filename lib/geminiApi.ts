import { GoogleGenerativeAI } from '@google/generative-ai';
import tarotCards from './tarotCards';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

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
1. ${cards[0].name} (Past)
2. ${cards[1].name} (Present)
3. ${cards[2].name} (Future)

Give them a poetic tarot reading in three distinct sections: Past, Present, and Future.
For each section, clearly state the card name followed by its interpretation.
Format each section like this:
**Past: [Card Name]**
[Interpretation]

**Present: [Card Name]**
[Interpretation]

**Future: [Card Name]**
[Interpretation]`;

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response to extract past, present, and future readings
    const sections = text.split(/\r?\n\r?\n/).filter(section => section.trim() !== ''); // Split by one or more newlines and remove empty sections

    if (!sections || sections.length < 3) {
      console.error("Invalid response structure from Gemini API:", text);
      throw new Error("Invalid response structure from Gemini API. Expected 3 sections.");
    }

    // Helper to extract card name and text from a section
    const parseSection = (sectionText: string, expectedCardName: string) => {
        // Remove the "**Past/Present/Future: [Card Name]**" part to get the interpretation
        // Regex tries to match "**Word: Card Name** text" and extract "text"
        const match = sectionText.match(/^\*\*(?:Past|Present|Future):\s*.*?\*\*\s*([\s\S]*)/);
        return {
            card: expectedCardName, // Use the expected card name for consistency
            text: match ? match[1].trim() : sectionText.trim() // Fallback to full text if regex fails
        };
    };

    return {
      past: parseSection(sections[0], cards[0].name),
      present: parseSection(sections[1], cards[1].name),
      future: parseSection(sections[2], cards[2].name)
    };

  } catch (error: any) {
    console.error("Error generating tarot reading from Gemini API:", error);
    throw new Error(`Error generating tarot reading from Gemini API: ${error.message}`);
  }
}
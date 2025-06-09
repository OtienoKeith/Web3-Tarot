# Cosmic Wallet Tarot

Project Summary — Mystic Web3 Tarot Reader
An interactive one-page React app that uses real wallet connection to perform a mystical 3-card tarot reading, blending AI-generated insight (via Gemini) with Web3 elements like wallet address and balance. It provides poetic, mystic interpretations of your Past, Present, and Future — all based on a random tarot spread and wallet "energy."

## Features ✨ What We Did

*   🎴 Created a 3-card tarot reading experience using static images of the Major Arcana cards
*   🤖 Integrated Gemini AI to generate custom tarot interpretations based on the drawn cards + dummy wallet data
*   🌐 Connected real crypto wallets (MetaMask) using Wagmi and RainbowKit to make it feel like a real Web3 experience
*   🧙‍♂️ Designed the app to be mystical, poetic, and magical, with a focus on user vibes over data-heavy logic
*   🔒 Used dummy balance and NFT info to keep the AI interaction simple, stress-free, and bug-resistant

## How We Did It 🛠️

### Frontend:
*   React + Vite for fast, simple one-pager development
*   Tarot images stored locally in `/public/tarot-deck/` and rendered dynamically
*   Styled with Tailwind CSS and subtle visual enhancements (card glows, font pairings) for a mystical aesthetic

### Wallet Connection:
*   Integrated Wagmi + RainbowKit to enable wallet connection with MetaMask
*   Used `useAccount()` to get the user's connected wallet address
*   Replaced actual wallet data (like ETH balance or NFTs) with dummy values (e.g. 0.72 ETH, 3 NFTs) to avoid external API dependencies

### AI Integration:
*   Used Gemini API (via REST or Node SDK) to send structured prompts based on:
    *   Drawn tarot card names
    *   Dummy wallet data
*   Parsed AI response into 3 sections: Past, Present, Future

## Challenges We Faced 🚧

1.  **AI Prompting**
    Getting Gemini to respond in a poetic, structured way was tricky — we had to refine the prompt to clearly specify:
    *   Format: 3 parts for past/present/future
    *   Tone: poetic, mystical, insightful
    *   Inputs: card names + fake wallet stats

2.  **Real Wallet, Fake Logic**
    We wanted the user to connect a real wallet (for Web3 authenticity) but avoid dealing with balance lookups and rate limits.
    Solved this by reading the address but using hardcoded balance/NFT values in the prompt.

3.  **Image Handling**
    Ensuring tarot card images were lightweight and loaded reliably required organizing the `/public/tarot-deck` folder carefully and matching filenames with card metadata.

4.  **Keeping It Vibe-Coded**
    AI integrations often break when rushed. We prioritized simplicity and vibe over complexity — no backend, no blockchain transactions, just smooth Web3 flavor with creative magic.

## Outcome ✅

A beautiful, mystical experience that:
*   Feels like a real Web3 dApp
*   Uses AI to generate thoughtful tarot readings
*   Runs fast, avoids flaky APIs, and stays lightweight for easy hacking and shipping
*   Perfectly fits the Charisma, Uniqueness, Nerve, and Talent track ✨

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](YOUR_VERCEL_DEPLOYMENT_URL) <!-- Update this URL after deployment -->

## Overview

This is a React one-pager tarot application built with Next.js and styled using Tailwind CSS. It leverages Radix UI for accessible components and integrates with the Gemini API to generate poetic tarot readings based on randomly drawn cards and dummy Web3 wallet data.

## Technologies Used

*   Next.js
*   React
*   TypeScript
*   Tailwind CSS
*   Radix UI
*   Google Gemini API (`@google/generative-ai`)

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or pnpm (pnpm is used in `pnpm-lock.yaml`)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/Web3-Tarot.git
    cd Web3-Tarot
    ```
    (Replace `https://github.com/your-username/Web3-Tarot.git` with your actual repository URL if it's different.)

2.  **Install dependencies:**
    ```bash
    npm install # or pnpm install
    ```

### Environment Variables

This project uses the Google Gemini API for generating tarot readings. You need to set up your API key as an environment variable.

1.  **Obtain a Gemini API Key:**
    If you don't have one, get your Gemini API key from the Google AI Studio: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

2.  **Create `.env.local` file:**
    In the root directory of your project, create a new file named `.env.local`.

3.  **Add your API key:**
    Open `.env.local` and add the following line, replacing `YOUR_ACTUAL_GEMINI_API_KEY` with your key:
    ```
    GEMINI_API_KEY=YOUR_ACTUAL_GEMINI_API_KEY
    ```
    **Important:**
    *   Ensure there are **no spaces** before or after the `=` sign.
    *   Do **not** put quotes around your API key.

### Running the Development Server

After setting up your environment variables, run the development server:

```bash
npm run dev # or pnpm dev
```

The application will typically run on `http://localhost:3000` (or another available port like `3001`, `3002`, etc., if 3000 is in use, as indicated in your terminal).

## Project Structure Highlights

*   `/app`: Contains Next.js app router pages, including `page.tsx` (main application logic) and `layout.tsx`.
*   `/components`: Reusable React components, including `ui/` for Shadcn UI components.
*   `/lib`: Utility functions and data.
    *   `tarotCards.js`: Full list of Major Arcana card metadata.
    *   `utils.ts`: Helper functions like `getRandomCards`.
    *   `geminiApi.ts`: Integration with the Gemini API for readings.
*   `/public/tarot-deck`: Stores all tarot card image files.

## Deployment to Vercel

This project is configured for easy deployment to Vercel.

1.  **Install Vercel CLI (if you haven't already):**
    ```bash
    npm install -g vercel
    ```

2.  **Log in to Vercel:**
    ```bash
    vercel login
    ```

3.  **Deploy from your project root:**
    ```bash
    vercel
    ```
    Follow the prompts, and remember to add your `GEMINI_API_KEY` as an environment variable during the Vercel deployment process when prompted.

---
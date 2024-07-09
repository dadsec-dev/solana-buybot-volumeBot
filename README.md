
# SIMPLE SCRIPT TO SWAP TOKEN ON RAYDIUM WITH TYPESCRIPT USING MULTIPLE ADDRESSES

This project demonstrates how to perform a token swap on the Solana blockchain using Raydium and Chainstack. 


## Features

- Utilizes the Raydium SDK for interacting with the Solana blockchain.
- Supports both versioned and legacy transactions.
- Allows simulation of swap transactions before execution.
- Easy configuration for swap parameters through a dedicated config file.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (v18 or above recommended)
- Yarn
- A Solana wallet with some SOL for testing the swap
- An environment file (.env) with your RPC URL and WALLET_PRIVATE_KEY

## Chainstack Solana node


## Environment variables

Add your RPC endoint and private key to a `.env` file:

```env
RPC_URL=YOUR_RPC_URL
WALLET_PRIVATE_KEY=YOUR_PRIVATE_KEY ALL
```

## Installation

Clone the repository locally and install the dependencies:




## Usage

Edit the configuration in `src/swapConfig.ts` editing:

- Select if you want to send the transaction or only simulate
- The amount to swap
- The tokens to swap
- The liquidity file to pull the pool info from

```ts
export const swapConfig = {
  executeSwap: false, // Send tx when true, simulate tx when false
  useVersionedTransaction: true,
  tokenAAmount: 0.01, // Swap 0.01 SOL for USDT in this example
  tokenAAddress: "So11111111111111111111111111111111111111112", // Token to swap for the other, SOL in this case
  tokenBAddress: "", // other token address
  maxLamports: 1000000, // Max lamports allowed for fees
  direction: "in" as "in" | "out", // Swap direction: 'in' or 'out'
  liquidityFile: "https://api.raydium.io/v2/sdk/liquidity/mainnet.json",
  maxRetries: 10
};
```

Then run:

```sh
yarn swap
```

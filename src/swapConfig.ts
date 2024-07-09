export const swapConfig = {
  executeSwap: true, 
  useVersionedTransaction: true,
  tokenAAmount: 6, 
  tokenAAddress: "So11111111111111111111111111111111111111112", 
  tokenBAddress: "coonf3CWh5zRayCU1M2EHXsWABLeTJbSnXa5HMPfHf1",
  maxLamports: 5000000, 
  direction: "in" as "in" | "out", 
  liquidityFile: "https://api.raydium.io/v2/sdk/liquidity/mainnet.json",
  maxRetries: 20,
};

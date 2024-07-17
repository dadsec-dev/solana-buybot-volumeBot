import { Telegraf } from 'telegraf';
import { config } from 'dotenv';
import RaydiumSwap from './RaydiumSwap';
import { swapConfig } from './swapConfig';
import { Transaction, VersionedTransaction } from '@solana/web3.js';

// Load environment variables
config();

// Initialize the Telegram bot
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Command to start the bot
bot.start((ctx) => ctx.reply('Welcome!, vortex is the fastest volume bot on solana. Create volume for your token from upto 20 wallet addresses at the same time! Use /swap <amount> <tokenA> <tokenB> to perform a swap.'));

// Command to perform a swap
bot.command('swap', async (ctx) => {
  const args = ctx.message.text.split(' ');
  if (args.length !== 4) {
    ctx.reply('Usage: /swap <amount> <tokenA> <tokenB>');
    return;
  }

  const amount = parseFloat(args[1]);
  const tokenAAddress = args[2];
  const tokenBAddress = args[3];

  if (isNaN(amount)) {
    ctx.reply('Invalid amount.');
    return;
  }

  const raydiumSwap = new RaydiumSwap(process.env.RPC_URL, process.env.WALLET_PRIVATE_KEY);
  await raydiumSwap.loadPoolKeys(swapConfig.liquidityFile);

  const poolInfo = raydiumSwap.findPoolInfoForTokens(tokenAAddress, tokenBAddress);
  if (!poolInfo) {
    ctx.reply('Pool info not found.');
    return;
  }

  try {
    const tx = await raydiumSwap.getSwapTransaction(
      tokenBAddress,
      amount,
      poolInfo,
      swapConfig.maxLamports,
      swapConfig.useVersionedTransaction,
      swapConfig.direction
    );

    if (swapConfig.executeSwap) {
      const txid = swapConfig.useVersionedTransaction
        ? await raydiumSwap.sendVersionedTransaction(tx as VersionedTransaction, swapConfig.maxRetries)
        : await raydiumSwap.sendLegacyTransaction(tx as Transaction, swapConfig.maxRetries);

      ctx.reply(`Swap successful: https://solscan.io/tx/${txid}`);
    } else {
      const simRes = swapConfig.useVersionedTransaction
        ? await raydiumSwap.simulateVersionedTransaction(tx as VersionedTransaction)
        : await raydiumSwap.simulateLegacyTransaction(tx as Transaction);

      ctx.reply(`Simulation result: ${JSON.stringify(simRes)}`);
    }
  } catch (error) {
    ctx.reply(`Error during swap: ${error.message}`);
  }
});

// Launch the bot
bot.launch();

console.log('Telegram bot is running...');

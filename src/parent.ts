import { fork } from 'child_process';
import path from 'path';
import dotenv from 'dotenv';


dotenv.config();


const privateKeys = [
  process.env.WALLET_PRIVATE_KEY1!,
  process.env.WALLET_PRIVATE_KEY2!,
  process.env.WALLET_PRIVATE_KEY3!,
  process.env.WALLET_PRIVATE_KEY4!,
  process.env.WALLET_PRIVATE_KEY5!,
  process.env.WALLET_PRIVATE_KEY6!,
  process.env.WALLET_PRIVATE_KEY7!,
  process.env.WALLET_PRIVATE_KEY8!,
  process.env.WALLET_PRIVATE_KEY9!,
  process.env.WALLET_PRIVATE_KEY10!,
  process.env.WALLET_PRIVATE_KEY11!,
  process.env.WALLET_PRIVATE_KEY12!,
  process.env.WALLET_PRIVATE_KEY13!,
  process.env.WALLET_PRIVATE_KEY14!,
  process.env.WALLET_PRIVATE_KEY15!,
  process.env.WALLET_PRIVATE_KEY16!,
  process.env.WALLET_PRIVATE_KEY17!,
  process.env.WALLET_PRIVATE_KEY18!,
  process.env.WALLET_PRIVATE_KEY19!,
  process.env.WALLET_PRIVATE_KEY20!,
  process.env.WALLET_PRIVATE_KEY21!,
  process.env.WALLET_PRIVATE_KEY22!,
  process.env.WALLET_PRIVATE_KEY23!,
  process.env.WALLET_PRIVATE_KEY24!,
  process.env.WALLET_PRIVATE_KEY25!,
  process.env.WALLET_PRIVATE_KEY26!,
  process.env.WALLET_PRIVATE_KEY27!,
  process.env.WALLET_PRIVATE_KEY28!,
  process.env.WALLET_PRIVATE_KEY29!,
  process.env.WALLET_PRIVATE_KEY30!,
];


const scriptPath = path.resolve(__dirname, './index.ts');


const startProcesses = () => {
  privateKeys.forEach((privateKey, index) => {
    const env = Object.assign({}, process.env, {
      WALLET_PRIVATE_KEY: privateKey,
    });

    const child = fork(scriptPath, { env });

    child.on('message', (message) => {
      console.log(`Instance ${index + 1}:`, message);
    });

    child.on('exit', (code) => {
      console.log(`Instance ${index + 1} exited with code ${code}`);
    });
  });
};

startProcesses();

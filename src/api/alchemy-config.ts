import { Network, Alchemy, AlchemySettings } from "alchemy-sdk";

const settings: AlchemySettings = {
  apiKey: "<YOUR_API_KEY_HERE>", // Reemplaza con tu Alchemy API Key.
  network: Network.ETH_MAINNET, // Red Ethereum Mainnet
  // network: Network.<OTHER_NETWORK> // Reemplaza con tu red si es necesario.
};

const alchemy = new Alchemy(settings);

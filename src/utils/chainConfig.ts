import { Chain } from "viem";
import { mainnet, sepolia } from "viem/chains";

export interface ChainConfig {
  chain: Chain;
  name: string;
}

export const getChainConfig = (chainId: number): ChainConfig | null => {
  switch (chainId) {
    case mainnet.id:
      return { chain: mainnet, name: "Ethereum Mainnet" };
    case sepolia.id: // 11155111
      return { chain: sepolia, name: "Sepolia Testnet" };
    default:
      return null;
  }
};

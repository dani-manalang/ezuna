import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

const coinbaseWallet = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  appName: "Ezuna",
  supportedChainIds: [1, 3, 4, 5, 42],
});

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

export const connectors = {
  injected: injected,
  coinbaseWallet: coinbaseWallet
}
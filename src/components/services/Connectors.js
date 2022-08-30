import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { chain } from 'wagmi'
const APP_NAME = 'Wagmi Test'
const APP_LOGO_URL = 'https://example.com/logo.png'
const chains = [chain.mainnet, chain.rinkeby, chain.goerli]
export const connectors = [
    new CoinbaseWalletConnector({
        chains,
        options: {
            appName: APP_NAME,
            appLogoURL: APP_LOGO_URL,
    }}),
    new MetaMaskConnector({
        chains,
        options: {
            shimChainChangedDisconnect: false,
        },
    }),
    new InjectedConnector({
        chains,
        options: {
          name: 'Injected',
          shimDisconnect: true,
        },
    }),
    new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
    }),
]
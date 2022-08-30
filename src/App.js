import './App.css';
import "./styles/main.scss"
import {
  WagmiConfig,
  configureChains,
  chain,
  createClient
} from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import {ChakraProvider } from '@chakra-ui/react'
import { connectors } from './components/services/Connectors'
import Template from './pages/Template'

//Wagmi offers providers for Infura, Alchemy, etc..
const { chains, provider, webSocketProvider } = configureChains(
  [chain.rinkeby, chain.goerli],
  [infuraProvider({ apiKey: process.env.REACT_APP_INFURA_KEY })],
)
const client = createClient({
  connectors,
  provider,
  webSocketProvider,
})

console.log(client)

function App() {
  return (
    <ChakraProvider>
      <WagmiConfig client={client}>
          <Template></Template>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default App;

import WalletModal from '../components/WalletModal';
import {useDisclosure} from '@chakra-ui/react'
import Nav from "./../components/Nav"
import Profile from '../components/Profile';
import {useAccount, useDisconnect} from "wagmi"
import TransactionForm from '../components/TransactionForm';

const Template = () => {

    //useAccount hook keeps state of active account across app
    const { isConnected } = useAccount()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {disconnect} = useDisconnect()
    return (
        <>
            <Nav>
                {!isConnected ?
                    <button onClick={onOpen}>Open Wallet</button>
                    : 
                    <button onClick={() => disconnect()}>Disconnect Wallet</button>
                }
            </Nav>
            <WalletModal isOpen={isOpen} closeModal={onClose} />
            <Profile />
            <TransactionForm />
        </>
    )
}

export default Template
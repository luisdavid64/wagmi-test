import WalletModal from '../components/WalletModal';
import {useDisclosure} from '@chakra-ui/react'
import Nav from "./../components/Nav"
import Profile from '../components/Profile';
import {useAccount, useDisconnect} from "wagmi"
import TransactionForm from '../components/TransactionForm';
import WriteToContract from '../components/WriteToContract';

const Template = () => {

    //useAccount hook keeps state of active account across app
    const { isConnected } = useAccount()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {disconnect} = useDisconnect()
    return (
        <>
            <Nav>
                {!isConnected ?
                    <button className='button white' onClick={onOpen}>Open Wallet</button>
                    : 
                    <button className='button white' onClick={() => disconnect()}>Disconnect Wallet</button>
                }
            </Nav>
            <WalletModal isOpen={isOpen} closeModal={onClose} />
            <Profile />
            <TransactionForm />
            <WriteToContract />
        </>
    )
}

export default Template
import {
    VStack,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
} from '@chakra-ui/react'
import { useConnect, useAccount } from 'wagmi'


function WalletModal({
    isOpen,
    closeModal,
}) {
    const {
        connect,
        connectors,
        error,
        isConnecting,
        pendingConnector,
        isLoading
    } = useConnect();

    const performConnection = (connector) => {
        connect({connector})
        closeModal()
    }

    return (
        <Modal isOpen={isOpen} onClose={closeModal} isCentered>
            <ModalOverlay />
            <ModalContent w='300px'>
                <ModalHeader>Select Wallet</ModalHeader>
                <ModalCloseButton
                    _focus={{
                        boxShadow: 'none',
                    }}
                />
                <ModalBody paddingBottom='1.5rem'>
                    <VStack>
                        {connectors.map( (connector) => (
                            <Button
                                variant='outline'
                                key={connector.id}
                                disabled={!connector.ready || isLoading}
                                onClick={() => performConnection(connector)}
                                w='100%'
                            >
                                <HStack w='100%' justifyContent='center'>
                                  <Text>
                                    {connector.name}{" "}
                                    {isConnecting &&
                                    pendingConnector?.id === connector.id &&
                                    " (connecting)"}
                                   </Text>
                                   </HStack>
                             </Button>
                        ))}
                        {error && <Text>{error.message}</Text>}
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default WalletModal
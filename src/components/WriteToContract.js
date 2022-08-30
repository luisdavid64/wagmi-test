/* Usage of Transaction Hooks. It is good to fetch parameters 
   required for sending a transaction such as the gas estimate.
*/
import {useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'



function WriteToContract() {
    const { isConnected } = useAccount()
    const { config, error: prepareError, isError: isPrepareError, } = usePrepareContractWrite({
        addressOrName: '0xaf0326d92b97df1221759476b072abfd8084f9be',
        contractInterface: ['function mint()'],
        functionName: 'mint',
      })
    const {data, error, isError, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    if(!isConnected) return <></>
    return (
        <>
            <h2 className='large padded'>Write To Contract</h2>
            <div>
                <button className='button' disabled={!write || isLoading} onClick={() => write()}>
                    {isLoading ? 'Minting...' : 'Mint'}
                </button>
                {isSuccess && (
                    <div>
                    Successfully minted your NFT!
                    <div>
                        <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                    </div>
                    </div>
                )}
                {(isPrepareError || isError) && (
                    <div>Error: {(prepareError || error)?.message}</div>
                )}
            </div>
        </>
    )
}

export default WriteToContract;
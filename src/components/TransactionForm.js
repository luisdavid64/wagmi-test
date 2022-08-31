/* Usage of Transaction Hooks. It is good to fetch parameters 
   required for sending a transaction such as the gas estimate.
   One can check fee data using useFeeData
*/
import { useFeeData, useSendTransaction, usePrepareSendTransaction, useAccount, useWaitForTransaction} from 'wagmi'
import {useState} from 'react';
import {useDebounce} from 'use-debounce';
import {utils} from "ethers";



function TransactionForm() {
    const { isConnected } = useAccount()
    const [to, setTo] = useState('')
    //We dont want RPC call on every key stroke
    const [debouncedTo] = useDebounce(to, 500)
    const [amount, setAmount] = useState('')
    const [debouncedAmount] = useDebounce(amount, 500)
    const { config } = usePrepareSendTransaction({
        request: {
          to: debouncedTo,
          value: debouncedAmount ? utils.parseEther(debouncedAmount) : undefined,
        },
      })
    const {data, sendTransaction } = useSendTransaction(config)
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
      })
    const { data: feeData, isError, isLoading: isFeeLoading } = useFeeData()
    const onSubmit = (e) => {
        e.preventDefault()
        sendTransaction?.()
    }
    console.log(feeData)

    if(!isConnected) return <></>
    return (
        <>
            <h2 className='large padded'>Send Transaction</h2>
            <div className='centered flex-v'>
                <form
                    className='bordered padded-border'
                    onSubmit={onSubmit}
                >
                    <div className='flex-v'>
                        <label>Recipient</label>
                        <input 
                            aria-label="Recipient" 
                            placeholder="0xA0Cf…251e" 
                            value={to}
                            className="transaction"
                            onChange={(e) => setTo(e.target.value)}
                        />

                    </div>
                    <div className='flex-v'>
                        <label>Amount (ether)</label>
                        <input 
                            aria-label="Amount (ether)" 
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.05"
                            className="transaction"
                            value={amount}
                        />
                    </div>
                    <div>
                    {isFeeLoading && <p>Fetching fee data…</p>}
                    {isError && <p>Error fetching fee data</p>}
                    {(!isFeeLoading && !isError) && <p className='centered-text padded'>Gas price: {feeData?.formatted.gasPrice} gwei</p>}
                    </div>
                    <button style={{width: "100%"}} className='button' disabled={!sendTransaction || !to || !amount}>
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                    {isSuccess && (
                        <div>
                        Successfully sent {amount} ether to {to}
                        <div>
                            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                        </div>
                        </div>
                    )}
                </form>
            </div>
        </>
    )
}

export default TransactionForm;
/*Signing message: Good way to test connection with wallet */

import * as React from 'react'
import { useSignMessage, useAccount } from 'wagmi'
import { verifyMessage } from 'ethers/lib/utils'

export function SignMessage() {
  const { isConnected } = useAccount()
  const recoveredAddress = React.useRef("")
  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data)
      recoveredAddress.current = address
    },
  })

  if(!isConnected) return <></>
  return (
    <>
        <h2 className='large padded'>Sign Message</h2>
        <div className='centered flex-v'>
            <form
            className='centered flex-v bordered padded-border'
            onSubmit={(event) => {
                event.preventDefault()
                const formData = new FormData(event.target)
                const message = formData.get('message')
                signMessage({ message })
            }}
            >
            <label htmlFor="message">Enter a message to sign</label>
            <textarea
                className='sign'
                id="message"
                name="message"
                placeholder="Enter message…"
            />
            <button className='button' disabled={isLoading}>
                {isLoading ? 'Check Wallet' : 'Sign Message'}
            </button>

            {data && (
                <div className='centered flex-v'>
                    <div>Signature: {data}</div>
                </div>
            )}

            {error && <div>{error.message}</div>}
            </form>
        </div>
    </>
  )
}
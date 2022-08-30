/*Simple Account information Hooks*/
import {useNetwork, useAccount, useEnsName, useBalance, useEnsAvatar } from 'wagmi'


function Profile() {
  const { address, connector, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { ensAvatar } = useEnsAvatar({ addressOrName: address })
  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  })
  const { chain, chains } = useNetwork()

  const formatBalance = (balanceData) => {
    return `${Math.round(parseFloat(balanceData.formatted)*100)/100} ${balanceData.symbol}`
  }

  if (isConnected) {
    return (
      <>
        <h2 className='large padded'>Account</h2>
        <div>
          <table className='center-h margin-v1'>
            <thead>
              <tr>
                <th></th>
                <th>Wallet Data</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Address</td>
                <td>
                  {ensAvatar && <img src={ensAvatar} alt="ENS Avatar" />}
                  <div>{ensName ? `${ensName} (${address})` : address}</div>
                </td>
              </tr>
              <tr>
                <td>Wallet</td>
                <td>
                  Connected to {connector.name}
                </td>
              </tr>
              { !(isError || isLoading) &&
                <tr>
                  <td>Balance</td>
                  <td>
                    {formatBalance(data)}
                  </td>
                </tr>
              }
              {chain && 
                <tr>
                  <td>Chain</td>
                  <td>
                    {chain.name}
                  </td>
                </tr>
              
              }
              {chain && 
                <tr>
                  <td>Available Chains</td>
                  <td>
                    {chains.map((chain) => `${chain.name} `)}
                  </td>
                </tr>
              
              }

            </tbody>
          </table>
        </div>
      </>
    )
  }
  return <h2 className='large centered-text padded'>Please connect your wallet</h2>
}

export default Profile
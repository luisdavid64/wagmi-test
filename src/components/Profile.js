/*Simple Account information Hooks*/
import { useAccount, useEnsName, useDisconnect, useBalance, useEnsAvatar } from 'wagmi'


function Profile() {
  const { address, connector, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { disconnect } = useDisconnect();
  const { ensAvatar } = useEnsAvatar({ addressOrName: address })
  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  })
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
                <th>Wallet Data</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {ensAvatar && <img src={ensAvatar} alt="ENS Avatar" />}
                  <div>{ensName ? `${ensName} (${address})` : address}</div>
                </td>
              </tr>
              <tr>
                <td>
                  Connected to {connector.name}
                </td>
              </tr>
              { !(isError || isLoading) &&
                <tr>
                  <td>
                    {formatBalance(data)}
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
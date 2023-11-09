import { useWeb3React } from '@web3-react/core'
import { asSupportedChain } from 'constants/chains'
import { darkTheme } from 'theme/colors'

import useSelectChain from './useSelectChain'

export const useGasbot = () => {
  const { chainId, account, provider } = useWeb3React()

  const switchChain = useSelectChain()
  const signer = provider?.getSigner(account)

  const switchNetwork = async (chainId?: number) => {
    const supported = asSupportedChain(chainId)

    if (!supported) {
      throw new Error('Unsupported Chain')
    }

    await switchChain(supported)
  }

  const signTypedData = async (typedData: Record<string, unknown>) => {
    const method = 'eth_signTypedData_v4'
    const params = [account, JSON.stringify(typedData)]
    const signature = await signer?.provider.send(method, params).catch((err) => {
      throw new Error(err)
    })

    return signature
  }

  return {
    signer,
    switchNetwork,
    signTypedData,
    address: account,
    accentColor: darkTheme.accent1,
    chainId: asSupportedChain(chainId),
  }
}

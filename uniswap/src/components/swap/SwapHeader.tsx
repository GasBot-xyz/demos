import '@gasbot/widget/style.css'

import { Gasbot, GasbotConfig } from '@gasbot/widget'
import { Trans } from '@lingui/macro'
import { Percent } from '@uniswap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { InterfaceTrade } from 'state/routing/types'
import styled from 'styled-components'
import { darkTheme } from 'theme/colors'
import { ThemedText } from 'theme/components'

import { RowBetween, RowFixed } from '../Row'
import SettingsTab from '../Settings'
import SwapBuyFiatButton from './SwapBuyFiatButton'

const StyledSwapHeader = styled(RowBetween)`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.neutral2};
`

const HeaderButtonContainer = styled(RowFixed)`
  padding: 0 12px;
  gap: 16px;
`

const GasbotWrapper = styled.div`
  .gasbot > button {
    height: fit-content;
    background: transparent;
  }

  .gasbot > button > svg {
    width: 1.4rem;
    height: 1.4rem;
    color: ${({ theme }) => theme.neutral2};
  }
`

export default function SwapHeader({
  autoSlippage,
  chainId,
  trade,
}: {
  autoSlippage: Percent
  chainId?: number
  trade?: InterfaceTrade
}) {
  const { provider } = useWeb3React()
  const signer = provider?.getSigner()

  return (
    <StyledSwapHeader>
      <HeaderButtonContainer>
        <ThemedText.SubHeader>
          <Trans>Swap</Trans>
        </ThemedText.SubHeader>
        <SwapBuyFiatButton />
      </HeaderButtonContainer>
      <RowFixed>
        <GasbotWrapper>
          <Gasbot
            walletClientOrSigner={signer}
            accentColor={darkTheme.accent1}
            limitDestination={chainId as GasbotConfig['limitDestination']}
          />
        </GasbotWrapper>
        <SettingsTab autoSlippage={autoSlippage} chainId={chainId} trade={trade} />
      </RowFixed>
    </StyledSwapHeader>
  )
}

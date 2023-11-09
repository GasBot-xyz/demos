import '@gasbot/widget/style.css'

import { Gasbot } from '@gasbot/widget'
import { InterfacePageName } from '@uniswap/analytics-events'
import { Trace } from 'analytics'
import { PageWrapper } from 'components/swap/styled'
import { useGasbot } from 'hooks/useGasbot'

export default function GasbotPage() {
  const { address, chainId, accentColor, switchNetwork, signTypedData } = useGasbot()

  return (
    <Trace page={InterfacePageName.SWAP_PAGE} shouldLogImpression>
      <PageWrapper>
        <div style={{ width: 'fit-content', margin: 'auto' }}>
          <Gasbot
            renderMode="component"
            switchNetwork={switchNetwork}
            permitSigner={signTypedData}
            accentColor={accentColor}
            chainId={chainId}
            address={address}
          />
        </div>
      </PageWrapper>
    </Trace>
  )
}

import '@flexy.tech/widget/style.css';

import { Flexy } from '@flexy.tech/widget';
import { InterfacePageName } from '@uniswap/analytics-events';
import { useWeb3React } from '@web3-react/core';
import { Trace } from 'analytics';
import { PageWrapper } from 'components/swap/styled';
import { darkTheme } from 'theme/colors';

export default function GasbotPage() {
  const { provider } = useWeb3React();
  const signer = provider?.getSigner();

  return (
    <Trace page={InterfacePageName.SWAP_PAGE} shouldLogImpression>
      <PageWrapper>
        <div style={{ width: 'fit-content', margin: 'auto' }}>
          {signer && (
            <Flexy
              renderMode="component"
              avoidChainSwitching
              accentColor={darkTheme.accent1}
              walletClientOrSigner={signer}
            />
          )}
        </div>
      </PageWrapper>
    </Trace>
  );
}

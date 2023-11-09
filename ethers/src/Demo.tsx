import "@gasbot/widget/style.css";

import { useEffect, useState } from "react";
import { Gasbot } from "@gasbot/widget";
import { BrowserProvider, JsonRpcSigner, ethers } from "ethers";

type SignTypedDataArgs = Parameters<JsonRpcSigner["signTypedData"]>;

export const Demo = () => {
  const [address, setAddress] = useState<string>();
  const [chainId, setChainId] = useState<number>();

  const [signer, setSigner] = useState<ethers.JsonRpcSigner>();
  const [provider, setProvider] = useState<BrowserProvider>();

  const switchNetwork = async (chainId?: number) => {
    await provider?.send("wallet_switchEthereumChain", [
      { chainId: ethers.toQuantity(chainId!) },
    ]);
  };

  const signTypedData = async (...args: SignTypedDataArgs) => {
    const signature = await signer?.signTypedData(...args).catch(err => {
      throw new Error(err);
    });

    return signature as `0x${string}`;
  };

  useEffect(() => {
    if (window.ethereum) {
      const currentprovider = new ethers.BrowserProvider(window.ethereum);

      const init = async () => {
        const currentSigner = await currentprovider?.getSigner();

        const currentAddress = await currentSigner?.getAddress();
        const currentNetwork = await currentprovider?.getNetwork();
        const currentchainId = Number(currentNetwork?.chainId);

        setSigner(currentSigner);
        setAddress(currentAddress);
        setChainId(currentchainId);
      };

      init();
      setProvider(currentprovider);
    }
  }, []);

  return (
    <Gasbot
      address={address}
      chainId={chainId}
      switchNetwork={switchNetwork}
      permitSigner={async ({ domain, types, message }) => {
        return signTypedData(domain, { Permit: types.Permit }, message);
      }}
    />
  );
};

import { useCallback, useEffect, useState } from "react";
import { ethers, JsonRpcSigner } from "ethers";

import "@gasbot/widget/style.css";
import { Gasbot } from "@gasbot/widget";

function App() {
  const [signer, setSigner] = useState<JsonRpcSigner>();

  const ethereum = window.ethereum;
  const connect = useCallback(async () => {
    if (ethereum) {
      const browserProvider = new ethers.BrowserProvider(ethereum);
      const currentSigner = await browserProvider.getSigner();

      setSigner(currentSigner);

      ethereum.on("accountsChanged", async () => {
        setSigner(undefined);
      });
    }
  }, [ethereum]);

  useEffect(() => {
    ethereum?.on("chainChanged", () => {
      connect()
    });
  }, [connect, ethereum]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      {!signer ? (
        <button onClick={connect}>Connect</button>
      ) : (
        <Gasbot walletClientOrSigner={signer} />
      )}
    </div>
  );
}

export default App;

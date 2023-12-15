import { useState } from "react";
import { ethers, JsonRpcSigner } from "ethers";

import "@gasbot/widget/style.css";
import { Gasbot } from "@gasbot/widget";

function App() {
  const [signer, setSigner] = useState<JsonRpcSigner>();

  const connect = async () => {
    const ethereum = window.ethereum;

    if (ethereum) {
      const browserProvider = new ethers.BrowserProvider(ethereum);
      const currentSigner = await browserProvider.getSigner();

      setSigner(currentSigner);

      ethereum.on("accountsChanged", async () => {
        setSigner(undefined);
      });
    }
  };

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

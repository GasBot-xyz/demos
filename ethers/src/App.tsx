import { useEffect, useState } from "react";

import { Demo } from "./Demo";
import { ethers, BrowserProvider } from "ethers";

function App() {
  const [connected, setConnected] = useState(false);
  const [provider, setProvider] = useState<BrowserProvider>();

  useEffect(() => {
    if (window.ethereum) {
      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(browserProvider);
    }
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      {!connected && (
        <button
          onClick={async () => {
            await provider?.send("eth_requestAccounts", []);
            setConnected(true);
          }}
        >
          Connect
        </button>
      )}

      {connected && <Demo />}
    </div>
  );
}

export default App;

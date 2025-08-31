import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ConnectWalletBtn } from "./components/ConnectWalletBtn";

import { ConnectWalletButton } from "./components/old/ConnectWalletButton";
import { WalletInfo } from "./components/WalletInfo";
import { MemoTransactionButton } from "./components/MemoTransactionButton";
import { useWallet } from "./contexts/WalletContext";
import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState(0);
  const { account } = useWallet();

  return (
    <>
      <h1>Kit Wallet Adapter</h1>
      <div className="card">
        <ConnectWalletButton />
        <WalletInfo />
        <ConnectWalletBtn />
        {account && (
          <MemoTransactionButton text="Hello from Kit Wallet Adapter!" />
        )}
      </div>
    </>
  );
}

export default App;

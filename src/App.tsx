import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { ConnectWalletButton } from "./components/ConnectWalletButton";
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
        <Button className="ml-3">Click me</Button>
        {account && (
          <MemoTransactionButton text="Hello from Kit Wallet Adapter!" />
        )}
      </div>
    </>
  );
}

export default App;

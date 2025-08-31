import "./App.css";
import { ConnectWalletBtn } from "./components/ConnectWalletBtn";

import { ConnectWalletButton } from "./components/old/ConnectWalletButton";
import { WalletInfo } from "./components/WalletInfo";
import { MemoTransactionButton } from "./components/MemoTransactionButton";
import { useWallet } from "./contexts/WalletContext";

function App() {
  const { account } = useWallet();

  return (
    <>
      <h1>Kit Wallet Adapter</h1>

      <div className="flex flex-col gap-4 mt-2.5">
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

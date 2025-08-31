import {
  useConnect,
  useDisconnect,
  type UiWallet,
} from "@wallet-standard/react";
import { useEffect } from "react";
import { useWallet } from "../contexts/WalletContext";

interface WalletItemProps {
  wallet: UiWallet;
  onConnect?: () => void;
}

export function WalletItem({ wallet, onConnect }: WalletItemProps) {
  const [isConnecting, connect] = useConnect(wallet);
  const [isDisconnecting, disconnect] = useDisconnect(wallet);
  const { setConnectedWallet, isConnected } = useWallet();

  useEffect(() => {
    if (isDisconnecting) {
      setConnectedWallet(null);
    }
  }, [isDisconnecting, setConnectedWallet]);

  const handleConnect = async () => {
    try {
      const connectedAccount = await connect();
      if (!connectedAccount.length) {
        console.warn(`Connect to ${wallet.name} but there are no accounts.`);
        return connectedAccount;
      }

      const first = connectedAccount[0];
      setConnectedWallet({ account: first, wallet });
      onConnect?.(); // Close modal after successful connection
      return connectedAccount;
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return (
    <button
      className="wallet-item"
      onClick={isConnected ? disconnect : handleConnect}
      disabled={isConnecting}
    >
      <div className="wallet-item-content">
        {wallet.icon && (
          <img
            src={wallet.icon}
            alt={wallet.name}
            className="wallet-item-icon"
          />
        )}
        <div className="wallet-item-info">
          <div className="wallet-item-name">
            {isConnecting ? "Connecting..." : wallet.name}
          </div>
        </div>
      </div>
    </button>
  );
}

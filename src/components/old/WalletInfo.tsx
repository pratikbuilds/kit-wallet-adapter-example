import { useWallet } from "../../contexts/WalletContext";

export function WalletInfo() {
  const { account, wallet, isConnected, setConnectedWallet } = useWallet();

  if (!isConnected || !account || !wallet) {
    return null;
  }

  // Format the public key to show first and last few characters
  const formatPublicKey = (pubkey: string) => {
    if (pubkey.length <= 12) return pubkey;
    return `${pubkey.slice(0, 4)}...${pubkey.slice(-4)}`;
  };

  // Get wallet name from the wallet object
  const getWalletName = () => {
    return wallet.name || "Connected Wallet";
  };

  const handleDisconnect = () => {
    setConnectedWallet(null);
  };

  return (
    <div className="wallet-info">
      <div className="wallet-info-content">
        <div className="wallet-info-details">
          <div className="wallet-info-icon">
            {wallet.icon ? (
              <img
                src={wallet.icon}
                alt={getWalletName()}
                className="wallet-icon"
              />
            ) : (
              <div className="wallet-icon-placeholder">👛</div>
            )}
          </div>
          <div className="wallet-info-text">
            <div className="wallet-name">{getWalletName()}</div>
            <div className="wallet-address">
              {formatPublicKey(account.address)}
            </div>
          </div>
        </div>
        <button className="disconnect-button" onClick={handleDisconnect}>
          Disconnect
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useWallets } from "@wallet-standard/react";
import { WalletModal } from "./WalletModal";
import { useWallet } from "../../contexts/WalletContext";

export function ConnectWalletButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wallets = useWallets();
  const { isConnected } = useWallet();

  const solanaWallets = wallets.filter((wallet) =>
    wallet.chains.some((chain) => chain.startsWith("solana:"))
  );

  if (isConnected) {
    return null; // Don't show connect button when already connected
  }

  return (
    <>
      <button
        className="connect-wallet-button"
        onClick={() => setIsModalOpen(true)}
      >
        Connect Wallet
      </button>
      <WalletModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        wallets={solanaWallets}
      />
    </>
  );
}

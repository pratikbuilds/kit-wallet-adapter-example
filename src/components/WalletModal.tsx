import { useEffect, useRef } from "react";
import type { UiWallet } from "@wallet-standard/react";
import { WalletItem } from "./WalletItem";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallets: readonly UiWallet[];
}

export function WalletModal({ isOpen, onClose, wallets }: WalletModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="wallet-modal-overlay">
      <div className="wallet-modal" ref={modalRef}>
        <div className="wallet-modal-header">
          <h2>Connect Wallet</h2>
          <button className="wallet-modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="wallet-modal-content">
          <p>Choose a wallet to connect:</p>
          <div className="wallet-list">
            {wallets.map((wallet) => (
              <WalletItem
                key={wallet.name}
                wallet={wallet}
                onConnect={onClose}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

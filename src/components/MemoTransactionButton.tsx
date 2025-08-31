import { useState } from "react";
import { useWalletAccountTransactionSendingSigner } from "@solana/react";
import {
  appendTransactionMessageInstruction,
  createSolanaRpc,
  getBase58Decoder,
  pipe,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signAndSendTransactionMessageWithSigners,
  createTransactionMessage,
} from "@solana/kit";
import { useWallet } from "../contexts/WalletContext";
import { getAddMemoInstruction } from "@solana-program/memo";

interface MemoTransactionButtonProps {
  text: string;
  rpcUrl?: string;
}

export function MemoTransactionButton({
  text,
  rpcUrl = "https://api.devnet.solana.com",
}: MemoTransactionButtonProps) {
  const { account } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  if (!account) {
    return null;
  }

  const signer = useWalletAccountTransactionSendingSigner(
    account,
    "solana:devnet"
  );

  const handleRecordMemo = async () => {
    setIsLoading(true);
    try {
      const { value: latestBlockhash } = await createSolanaRpc(rpcUrl)
        .getLatestBlockhash()
        .send();

      const message = pipe(
        createTransactionMessage({ version: "legacy" }),
        (m) => setTransactionMessageFeePayerSigner(signer, m),
        (m) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, m),
        (m) =>
          appendTransactionMessageInstruction(
            getAddMemoInstruction({ memo: text }),
            m
          )
      );

      const signatureBytes = await signAndSendTransactionMessageWithSigners(
        message
      );
      const base58Signature = getBase58Decoder().decode(signatureBytes);

      window.alert(
        `Transaction sent! View on Solana Explorer: https://explorer.solana.com/tx/${base58Signature}?cluster=devnet`
      );
    } catch (e) {
      console.error("Failed to record memo", e);
      window.alert("Failed to record memo: " + (e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="memo-transaction-button"
      onClick={handleRecordMemo}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <span className="loading-spinner">⏳</span>
          Signing Transaction...
        </>
      ) : (
        `Record Memo: ${text}`
      )}
    </button>
  );
}

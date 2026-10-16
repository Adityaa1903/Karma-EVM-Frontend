"use client";

import { useEffect } from "react";
import { useAccount } from "wagmi";
// import { useRouter } from "next/navigation";
import CreateKarmaPoolForm from "@/components/Forms/CreateKarmaPool";
import { logger } from "@/lib/logger";

export default function CreateKarmaPoolPage() {
  const { isConnected } = useAccount();
  // const router = useRouter();

  useEffect(() => {
    // Ensure wallet connection persistence
    if (typeof window !== 'undefined') {
      const persistConnection = localStorage.getItem('wallet-connection-persist');
      if (persistConnection && !isConnected) {
        // If we had a persistent connection but wallet is disconnected, 
        // try to restore it or redirect back
        logger.debug('Wallet connection lost during navigation, attempting to restore...');
      }
    }
  }, [isConnected]);

  return (
    <>
      <div className="min-h-screen bg-transparent transition-colors duration-300">
        <CreateKarmaPoolForm />
      </div>
    </>
  );
}

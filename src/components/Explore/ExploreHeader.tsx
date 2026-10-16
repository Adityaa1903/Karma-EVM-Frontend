import React from "react";
import { Plus, RefreshCw } from "lucide-react";

interface ExploreHeaderProps {
  isConnected: boolean;
  currentChainName: string;
  supportedChainsCount: number;
  loading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  isCreatingPool: boolean;
  onCreate: () => void;
  isWalletConnectedChainSupported: boolean;
}

const ExploreHeader: React.FC<ExploreHeaderProps> = ({
  isConnected,
  currentChainName,
  supportedChainsCount,
  loading,
  refreshing,
  onRefresh,
  isCreatingPool,
  onCreate,
  isWalletConnectedChainSupported,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="karma-badge">Karma Oracle Network</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight mb-3">
          Explore Prediction Pools
        </h1>
        <p className="text-lg md:text-xl font-medium text-stone-600 dark:text-stone-400 mb-4 max-w-2xl">
          Decentralized prediction pools with community-weighted Karma consensus pricing.
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <p className="text-sm font-semibold text-stone-600 dark:text-stone-300 bg-amber-500/10 border border-amber-500/20 dark:bg-amber-950/30 dark:border-amber-500/30 px-3.5 py-1 rounded-full inline-block">
            {isConnected && currentChainName
              ? `Connected to ${currentChainName}`
              : `Browse pools across ${supportedChainsCount} supported chains`}
          </p>
          <button
            onClick={onRefresh}
            disabled={loading || refreshing}
            className="flex items-center gap-1.5 text-sm font-medium text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 disabled:opacity-50 self-start sm:self-auto transition-colors"
            type="button"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3 w-full md:w-auto">
        <button
          onClick={onCreate}
          disabled={isCreatingPool || !isConnected || !isWalletConnectedChainSupported}
          className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-stone-950 rounded-xl transition-all transform hover:scale-105 shadow-md shadow-amber-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-bold text-sm md:text-base flex-1 md:flex-none justify-center min-w-[160px]"
          type="button"
        >
          <Plus size={18} className="md:w-5 md:h-5" />
          <span className="hidden sm:inline">
            {isCreatingPool ? "Creating..." : "Create New Pool"}
          </span>
          <span className="sm:hidden">
            {isCreatingPool ? "Creating..." : "Create Pool"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ExploreHeader;
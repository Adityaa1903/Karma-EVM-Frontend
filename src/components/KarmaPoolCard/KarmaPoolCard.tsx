import React from "react";
import { ArrowRight, TrendingUp, TrendingDown, Info, Zap, Layers, Activity } from "lucide-react";
import { RangeSlider } from "./RangeSlider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatTVL, formatNumber } from "@/utils/format";

interface PredictionCardProps {
  name: string;
  baseToken?: string;
  creator?: string;
  priceFeed?: string;
  bullCoinName: string;
  bullCoinSymbol: string;
  bearCoinName: string;
  bearCoinSymbol: string;
  bullPercentage: number;
  bearPercentage: number;
  fees?: {
    mint: number;
    burn: number;
    creator: number;
    treasury: number;
  };
  tvl?: bigint;
  volumeRecent?: number;
  baseDecimals?: number;
  baseSymbol?: string;
  chainName?: string;
  onUse?: () => void;
}

export function PredictionCard({
  name,
  priceFeed,
  bullCoinSymbol,
  bearCoinSymbol,
  bullPercentage,
  bearPercentage,
  fees,
  tvl,
  volumeRecent,
  baseDecimals,
  baseSymbol,
  chainName,
  onUse,
}: PredictionCardProps) {
  const totalFee = fees
    ? (fees.mint + fees.burn + fees.creator + fees.treasury).toFixed(2)
    : "0.00";

  const isBullDominant = bullPercentage >= bearPercentage;
  const isBearDominant = bearPercentage > bullPercentage;

  return (
    <div className="group relative w-full h-full flex flex-col justify-between max-w-sm bg-white/80 dark:bg-[#121622]/85 backdrop-blur-md rounded-3xl border border-stone-200/80 dark:border-amber-900/25 shadow-lg hover:shadow-2xl hover:shadow-amber-500/15 dark:hover:shadow-amber-500/15 hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden">

      {/* Glossy gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 will-change-opacity" />

      {/* Header Section */}
      <div className="relative px-6 pt-6 pb-2 z-20">
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-wrap gap-x-2 gap-y-1 mb-2 text-[10px] font-bold uppercase tracking-wider">
            {chainName && (
              <span className="text-stone-600 dark:text-stone-400">
                {chainName}
              </span>
            )}
            <span className="text-amber-700 dark:text-amber-400">
              {priceFeed || 'Price Feed'}
            </span>
          </div>
          {/* Active Pulse */}
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">Live</span>
          </div>
        </div>

        <h2 className="text-2xl font-black text-stone-900 dark:text-stone-100 tracking-tight leading-none group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-300">
          {name}
        </h2>
      </div>

      {/* Main Content - Prediction Stats */}
      <div className="relative px-4 py-4 space-y-4 flex-grow z-20">

        {/* Bull vs Bear Visuals */}
        <div className="grid grid-cols-2 gap-3">
          {/* Bull Side */}
          <div className={`relative p-3 rounded-2xl border transition-all duration-300 ${isBullDominant
            ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-500/30 shadow-sm'
            : 'bg-stone-50 dark:bg-stone-900/30 border-transparent opacity-80'
            }`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded-lg ${isBullDominant ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-stone-200 dark:bg-stone-800 text-stone-500'}`}>
                <TrendingUp size={14} strokeWidth={3} />
              </div>
              <span className="text-xs font-bold uppercase text-stone-500 dark:text-stone-400 tracking-wide">Bull</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl font-black tabular-nums tracking-tighter ${isBullDominant ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-300'
                }`}>
                {bullPercentage.toFixed(1)}%
              </span>
              <span className="text-[10px] font-medium text-stone-400 truncate mt-1">
                {bullCoinSymbol}
              </span>
            </div>
          </div>

          {/* Bear Side */}
          <div className={`relative p-3 rounded-2xl border transition-all duration-300 ${isBearDominant
            ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-500/30 shadow-sm'
            : 'bg-stone-50 dark:bg-stone-900/30 border-transparent opacity-80'
            }`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded-lg ${isBearDominant ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400' : 'bg-stone-200 dark:bg-stone-800 text-stone-500'}`}>
                <TrendingDown size={14} strokeWidth={3} />
              </div>
              <span className="text-xs font-bold uppercase text-stone-500 dark:text-stone-400 tracking-wide">Bear</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl font-black tabular-nums tracking-tighter ${isBearDominant ? 'text-rose-600 dark:text-rose-400' : 'text-gray-700 dark:text-gray-300'
                }`}>
                {bearPercentage.toFixed(1)}%
              </span>
              <span className="text-[10px] font-medium text-stone-400 truncate mt-1">
                {bearCoinSymbol}
              </span>
            </div>
          </div>
        </div>

        {/* Sentiment Bar */}
        <div className="relative pt-2">
          <RangeSlider
            value={bullPercentage}
            onChange={() => { }}
            min={0}
            max={100}
            step={0.1}
            disabled={true}
          />
        </div>

        <div className="grid grid-cols-3 gap-2 px-2 pt-3 border-t border-stone-100 dark:border-stone-800/30 mt-4">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Layers size={12} className="text-amber-600 shrink-0" />
              <span className="font-medium truncate">TVL</span>
            </div>
            <div className="truncate text-sm font-bold tabular-nums text-stone-900 dark:text-stone-100 mt-0.5">
              {tvl !== undefined && baseDecimals !== undefined && baseSymbol !== undefined
                ? formatTVL(tvl, baseDecimals, baseSymbol)
                : <span className="text-stone-400">&mdash;</span>}
            </div>
          </div>

          <div className="min-w-0">
            <div
              className="flex items-center gap-1.5 text-xs text-gray-500"
              title="Traded volume over roughly the last 24h, across both coins. Not lifetime volume."
            >
              <Activity size={12} className="text-sky-500 shrink-0" />
              <span className="font-medium truncate">Vol 24h</span>
            </div>
            <div className="truncate text-sm font-bold tabular-nums text-stone-900 dark:text-stone-100 mt-0.5">
              {volumeRecent !== undefined && baseSymbol !== undefined
                ? `${formatNumber(volumeRecent)} ${baseSymbol}`
                : <span className="text-stone-400">&mdash;</span>}
            </div>
          </div>

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="min-w-0 cursor-help group/fee">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Zap size={12} className="text-amber-500 shrink-0" fill="currentColor" />
                    <span className="font-medium truncate">Fees</span>
                    <Info size={10} className="text-gray-400 shrink-0" />
                  </div>
                  <div className="truncate text-sm font-bold tabular-nums text-stone-900 dark:text-stone-100 group-hover/fee:text-amber-600 transition-colors mt-0.5">
                    {totalFee}%
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-[#faf8f5] dark:bg-[#1a1d28] border-stone-200 dark:border-stone-700 p-3 shadow-xl rounded-xl">
                <div className="space-y-2 min-w-[140px]">
                  <p className="text-xs font-bold text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-700 pb-1 mb-1">Fee Breakdown</p>
                  {fees ? (
                    <>
                      <div className="flex justify-between text-xs"><span className="text-gray-500">Mint</span> <span>{fees.mint}%</span></div>
                      <div className="flex justify-between text-xs"><span className="text-gray-500">Burn</span> <span>{fees.burn}%</span></div>
                      <div className="flex justify-between text-xs"><span className="text-gray-500">Creator</span> <span>{fees.creator}%</span></div>
                      <div className="flex justify-between text-xs"><span className="text-gray-500">Treasury</span> <span>{fees.treasury}%</span></div>
                    </>
                  ) : (
                    <span className="text-xs text-gray-500">No fee data available</span>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Action Area */}
      <div className="p-4 z-20">
        <button
          onClick={() => {
            if (onUse) onUse();
          }}
          className="w-full relative group/btn overflow-hidden rounded-2xl bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-stone-950 p-4 transition-all duration-300 shadow-md shadow-amber-600/20 hover:shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <div className="relative flex items-center justify-center gap-2 font-bold">
            <span className="uppercase tracking-wide text-sm">Place Prediction</span>
            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
          </div>
        </button>
      </div>

    </div>
  );
};

export default PredictionCard;

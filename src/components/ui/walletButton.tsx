'use client';
import { AlertTriangle, ChevronDown, Info } from 'lucide-react';
import { useAccount, useSwitchChain } from 'wagmi';
import { useWalletLink, WalletLinkButton } from '@stability-nexus/walletlink';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from './dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './tooltip';

interface WalletButtonProps {
    compact?: boolean;
    showNetworkStatus?: boolean;
}

// WalletLinkButton handles connect plus the account menu (copy, disconnect).
// The chain selector and unsupported-network switch use wagmi directly.
export default function WalletButton({ compact = false, showNetworkStatus = true }: WalletButtonProps) {
    const { isConnected } = useWalletLink();
    const { chainId } = useAccount();
    const { chains, switchChain } = useSwitchChain();
    const currentChain = chains.find((supportedChain) => supportedChain.id === chainId);
    const wrongNetwork = isConnected && chainId !== undefined && !currentChain;
    const supportedNetworkNames = chains.map((supportedChain) => supportedChain.name).join(', ');

    return (
        <div className="flex flex-wrap justify-end items-center gap-2">
            {showNetworkStatus && wrongNetwork && (
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => chains[0] && switchChain({ chainId: chains[0].id })}
                        disabled={!chains[0]}
                        className="flex items-center gap-1.5 rounded-lg border-2 border-red-500 px-3 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <AlertTriangle size={16} strokeWidth={2} />
                        <span className={compact ? "max-[640px]:hidden" : undefined}>
                            Wrong network
                        </span>
                    </button>
                    <TooltipProvider delayDuration={200}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    type="button"
                                    aria-label="Why is this network unsupported?"
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-stone-500 hover:bg-stone-100 hover:text-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100"
                                >
                                    <Info size={17} />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" align="end" className="max-w-xs space-y-1.5 p-3 text-left">
                                <p className="font-semibold">Unsupported network</p>
                                <p>
                                    Your wallet is connected to Chain ID {chainId ?? 'unknown'}, which Karma Protocol does not support.
                                    Supported network{chains.length === 1 ? '' : 's'}: {supportedNetworkNames || 'none configured'}.
                                </p>
                                <p>
                                    Click “Wrong network” to switch to {chains[0]?.name ?? 'a supported network'}, or choose a supported network in your wallet.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            )}

            {!compact && isConnected && currentChain && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            className="flex items-center gap-1.5 rounded-lg border border-stone-300 dark:border-stone-700 px-3.5 py-1.5 text-sm font-medium text-stone-800 transition-colors hover:border-amber-500 hover:text-amber-700 dark:text-stone-200 dark:hover:border-amber-400 dark:hover:text-amber-400 bg-white/80 dark:bg-[#161924]/80 shadow-sm"
                        >
                            <span className="max-w-[120px] truncate">{currentChain.name}</span>
                            <ChevronDown size={14} strokeWidth={2} className="opacity-70" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {chains.map((c) => (
                            <DropdownMenuItem
                                key={c.id}
                                onSelect={() => switchChain({ chainId: c.id })}
                                className="px-3 py-1.5 text-sm"
                            >
                                {c.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            )}

            {!compact && <WalletLinkButton label="Connect Wallet" />}
        </div>
    );
}

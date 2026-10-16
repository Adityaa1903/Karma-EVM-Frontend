// src/lib/karmaPoolHook.ts
// Karma Protocol storage hook
"use client";

import { useCallback, useMemo } from 'react';
import { useIndexedDB } from '@/hooks/useIndexedDB';
import type {
  PoolDetails,
  TokenDetails,
  ChainStatus,
  PortfolioPosition,
  PortfolioTransaction,
  PortfolioCache,
  SupportedChainId
} from '@/lib/indexeddb/config';
import { SUPPORTED_CHAIN_IDS } from '@/lib/indexeddb/config';

export interface UseKarmaPoolsStorageReturn {
  // Database state
  isInitialized: boolean;
  error: string | null;
  isOnline: boolean;
  
  // Pool operations
  savePoolDetails: (pool: Omit<PoolDetails, 'createdAt' | 'updatedAt'>) => Promise<void>;
  getPoolDetails: (poolId: string) => Promise<PoolDetails | null>;
  getAllPoolsForChain: (chainId: SupportedChainId) => Promise<PoolDetails[]>;
  getAllPools: () => Promise<PoolDetails[]>;
  getPoolsByCreator: (creator: string, chainId?: SupportedChainId) => Promise<PoolDetails[]>;
  batchSavePools: (pools: Omit<PoolDetails, 'createdAt' | 'updatedAt'>[]) => Promise<void>;
  
  // Token operations
  saveTokenDetails: (token: Omit<TokenDetails, 'createdAt' | 'updatedAt'>) => Promise<void>;
  getTokenDetails: (tokenId: string) => Promise<TokenDetails | null>;
  getTokensForPool: (poolAddress: string) => Promise<TokenDetails[]>;
  batchSaveTokens: (tokens: Omit<TokenDetails, 'createdAt' | 'updatedAt'>[]) => Promise<void>;
  
  // Chain status operations
  saveChainStatus: (status: Omit<ChainStatus, 'createdAt' | 'updatedAt'>) => Promise<void>;
  getChainStatus: (chainId: SupportedChainId) => Promise<ChainStatus | null>;
  getAllChainStatuses: () => Promise<ChainStatus[]>;
  
  // Cache operations
  saveCache: (key: string, data: unknown, ttlMinutes?: number, chainId?: SupportedChainId) => Promise<void>;
  getCache: (key: string) => Promise<unknown | null>;
  deleteCache: (key: string) => Promise<void>;
  
  // Cleanup operations
  cleanupExpiredCache: () => Promise<void>;
  clearAllData: () => Promise<void>;
  
  // Portfolio operations
  savePortfolioPosition: (position: Omit<PortfolioPosition, 'id'>) => Promise<void>;
  getPortfolioPositions: (userAddress: string, chainId: SupportedChainId) => Promise<PortfolioPosition[]>;
  savePortfolioTransaction: (transaction: Omit<PortfolioTransaction, 'id'>) => Promise<void>;
  getPortfolioTransactions: (userAddress: string, chainId: SupportedChainId) => Promise<PortfolioTransaction[]>;
  savePortfolioCache: (cache: Omit<PortfolioCache, 'userAddress'> & { userAddress: string }) => Promise<void>;
  getPortfolioCache: (userAddress: string, chainId: SupportedChainId) => Promise<PortfolioCache | null>;
  clearPortfolioData: (userAddress: string, chainId?: SupportedChainId) => Promise<void>;
  
  // Database info
  getDatabaseInfo: () => Promise<{
    name: string;
    version: number;
    stores: string[];
    isConnected: boolean;
    totalPools: number;
    totalTokens: number;
  }>;
}

export const useKarmaPoolsStorage = (): UseKarmaPoolsStorageReturn => {
  const indexedDB = useIndexedDB();

  const savePortfolioPosition = useCallback(async (position: Omit<PortfolioPosition, 'id'>) => {
    const positionWithId: Omit<PortfolioPosition, 'lastUpdated'> = {
      ...position,
      id: `${position.userAddress}-${position.poolAddress}-${position.tokenType}`
    };
    return indexedDB.savePortfolioPosition(positionWithId);
  }, [indexedDB]);

  const getPortfolioPositions = useCallback(async (userAddress: string, chainId: SupportedChainId) => {
    return indexedDB.getPortfolioPositions(userAddress, chainId);
  }, [indexedDB]);

  const savePortfolioTransaction = useCallback(async (transaction: Omit<PortfolioTransaction, 'id'>) => {
    const transactionWithId: Omit<PortfolioTransaction, 'timestamp'> & { timestamp?: number } = {
      ...transaction,
      id: `${transaction.userAddress}-${transaction.poolAddress}-${transaction.transactionHash}`
    };
    return indexedDB.savePortfolioTransaction(transactionWithId);
  }, [indexedDB]);

  const getPortfolioTransactions = useCallback(async (userAddress: string, chainId: SupportedChainId) => {
    return indexedDB.getPortfolioTransactions(userAddress, chainId);
  }, [indexedDB]);

  const savePortfolioCache = useCallback(async (cache: Omit<PortfolioCache, 'userAddress'> & { userAddress: string }) => {
    return indexedDB.savePortfolioCache(cache);
  }, [indexedDB]);

  const getPortfolioCache = useCallback(async (userAddress: string, chainId: SupportedChainId) => {
    return indexedDB.getPortfolioCache(userAddress, chainId);
  }, [indexedDB]);

  const clearPortfolioData = useCallback(async (userAddress: string, chainId?: SupportedChainId) => {
    if (chainId) {
      await indexedDB.deletePortfolioCache(userAddress, chainId);
      await indexedDB.deletePortfolioPositions(userAddress, chainId);
      await indexedDB.deletePortfolioTransactions(userAddress, chainId);
    } else {
      await Promise.all(
        SUPPORTED_CHAIN_IDS.map(async (cId) => {
          await Promise.all([
            indexedDB.deletePortfolioCache(userAddress, cId),
            indexedDB.deletePortfolioPositions(userAddress, cId),
            indexedDB.deletePortfolioTransactions(userAddress, cId)
          ]);
        })
      );
    }
  }, [indexedDB]);

  const getDatabaseInfo = useCallback(async () => {
    const info = await indexedDB.getDatabaseInfo();
    return {
      name: info.name,
      version: info.version,
      stores: info.objectStoreNames,
      isConnected: await indexedDB.isHealthy(),
      totalPools: 0,
      totalTokens: 0
    };
  }, [indexedDB]);

  return useMemo(() => ({
    isInitialized: indexedDB.isInitialized,
    error: indexedDB.error,
    isOnline: indexedDB.isOnline,
    
    savePoolDetails: indexedDB.savePoolDetails,
    getPoolDetails: indexedDB.getPoolDetails,
    getAllPoolsForChain: indexedDB.getAllPoolsForChain,
    getAllPools: indexedDB.getAllPools,
    getPoolsByCreator: indexedDB.getPoolsByCreator,
    batchSavePools: indexedDB.batchSavePools,
    
    saveTokenDetails: indexedDB.saveTokenDetails,
    getTokenDetails: indexedDB.getTokenDetails,
    getTokensForPool: indexedDB.getTokensForPool,
    batchSaveTokens: indexedDB.batchSaveTokens,
    
    saveChainStatus: indexedDB.saveChainStatus,
    getChainStatus: indexedDB.getChainStatus,
    getAllChainStatuses: indexedDB.getAllChainStatuses,
    
    saveCache: indexedDB.saveCache,
    getCache: indexedDB.getCache,
    deleteCache: indexedDB.deleteCache,
    
    cleanupExpiredCache: indexedDB.cleanupExpiredCache,
    clearAllData: indexedDB.clearAllData,
    
    savePortfolioPosition,
    getPortfolioPositions,
    savePortfolioTransaction,
    getPortfolioTransactions,
    savePortfolioCache,
    getPortfolioCache,
    clearPortfolioData,
    
    getDatabaseInfo
  }), [
    indexedDB,
    savePortfolioPosition, getPortfolioPositions, savePortfolioTransaction, getPortfolioTransactions,
    savePortfolioCache, getPortfolioCache, clearPortfolioData, getDatabaseInfo
  ]);
};

// Aliases for compatibility
export type UseFatePoolsStorageReturn = UseKarmaPoolsStorageReturn;
export const useFatePoolsStorage = useKarmaPoolsStorage;
export default useKarmaPoolsStorage;

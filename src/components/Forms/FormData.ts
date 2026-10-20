export interface FormData {
  poolName: string;
  baseTokenAddress: string;
  oracleType: 'chainlink' | 'karma';
  priceFeedAddress: string;
  karmaOracleAddress?: string;
  bullCoinName: string;
  bullCoinSymbol: string;
  bearCoinName: string;
  bearCoinSymbol: string;
  creatorAddress: string;
  mintFee: string;
  burnFee: string;
  creatorFee: string;
  devFee: string;
  initialDeposit: string;
  quoteTokenAddress?: string; 
  oracleDescription?: string; 
};
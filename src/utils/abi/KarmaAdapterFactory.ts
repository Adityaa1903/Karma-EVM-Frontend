export const KarmaAdapterFactoryABI = [
  {
    "type": "function",
    "name": "DEFAULT_TAU",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "DEFAULT_MIN_BALANCE",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "adapters",
    "inputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "createAdapter",
    "inputs": [{ "name": "params", "type": "bytes", "internalType": "bytes" }],
    "outputs": [{ "name": "adapter", "type": "address", "internalType": "address" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "createKarma",
    "inputs": [
      { "name": "pool", "type": "address", "internalType": "address" },
      { "name": "tau", "type": "uint256", "internalType": "uint256" },
      { "name": "minBalance", "type": "uint256", "internalType": "uint256" },
      { "name": "desc", "type": "string", "internalType": "string" }
    ],
    "outputs": [{ "name": "adapter", "type": "address", "internalType": "address" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "createKarma",
    "inputs": [
      { "name": "pool", "type": "address", "internalType": "address" },
      { "name": "desc", "type": "string", "internalType": "string" }
    ],
    "outputs": [{ "name": "adapter", "type": "address", "internalType": "address" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getKarma",
    "inputs": [
      { "name": "pool", "type": "address", "internalType": "address" },
      { "name": "tau", "type": "uint256", "internalType": "uint256" },
      { "name": "minBalance", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "KarmaCreated",
    "inputs": [
      { "name": "pool", "type": "address", "indexed": true, "internalType": "address" },
      { "name": "karma", "type": "address", "indexed": true, "internalType": "address" },
      { "name": "tau", "type": "uint256", "indexed": false, "internalType": "uint256" },
      { "name": "minBalance", "type": "uint256", "indexed": false, "internalType": "uint256" },
      { "name": "description", "type": "string", "indexed": false, "internalType": "string" }
    ],
    "anonymous": false
  }
] as const;

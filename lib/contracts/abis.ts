export const AGENT_REGISTRY_ADDRESS = '0x9AeFBf5c8Fa86f3c6B68ADf73B2FE58Bb956C8c0' as const;
export const JOB_ESCROW_ADDRESS = '0xC281F35fB31817BCD305ed7E3021Ec982E41dCeA' as const;

export const AGENT_REGISTRY_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "description", "type": "string" },
      { "internalType": "string[]", "name": "skills", "type": "string[]" },
      { "internalType": "uint256", "name": "pricePerJob", "type": "uint256" }
    ],
    "name": "registerAgent",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "agentId", "type": "uint256" }],
    "name": "getAgent",
    "outputs": [
      {
        "components": [
          { "internalType": "address", "name": "owner", "type": "address" },
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "string", "name": "description", "type": "string" },
          { "internalType": "string[]", "name": "skills", "type": "string[]" },
          { "internalType": "uint256", "name": "pricePerJob", "type": "uint256" },
          { "internalType": "bool", "name": "isActive", "type": "bool" },
          { "internalType": "uint256", "name": "totalJobs", "type": "uint256" },
          { "internalType": "uint256", "name": "successfulJobs", "type": "uint256" }
        ],
        "internalType": "struct AgentRegistry.Agent",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const JOB_ESCROW_ABI = [
  {
    "inputs": [
      { "internalType": "uint256", "name": "agentId", "type": "uint256" },
      { "internalType": "string", "name": "description", "type": "string" },
      { "internalType": "uint256", "name": "payment", "type": "uint256" }
    ],
    "name": "createJob",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "jobId", "type": "uint256" }],
    "name": "completeJob",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

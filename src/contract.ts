import { BrowserProvider, Contract, JsonRpcProvider } from 'ethers';

export const BASE_SEPOLIA = {
  chainId: '0x14a34',
  chainName: 'Base Sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: ['https://sepolia.base.org'],
  blockExplorerUrls: ['https://sepolia.basescan.org'],
};

export const DEFAULT_CONTRACT_ADDRESS = '0xD505ad9d439ee159eE4Af3ad331F417C3B8A4a29';
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS?.trim() || DEFAULT_CONTRACT_ADDRESS;

export const CONTRACT_ABI = [
  'function anchorProof(bytes32 fileHash, string title, string note)',
  'function getProof(bytes32 fileHash) view returns (address creator, uint64 timestamp, string title, string note)',
  'function getProofHashesByCreator(address creator) view returns (bytes32[])',
  'event ProofAnchored(bytes32 indexed fileHash, address indexed creator, uint64 timestamp, string title, string note)',
];

export function isContractConfigured() {
  return /^0x[a-fA-F0-9]{40}$/.test(CONTRACT_ADDRESS);
}

export async function getReadContract() {
  const provider = new JsonRpcProvider(BASE_SEPOLIA.rpcUrls[0], 84532, {
    staticNetwork: true,
  });
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
}

export async function getWriteContract() {
  const provider = new BrowserProvider(window.ethereum!);
  const signer = await provider.getSigner();
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}

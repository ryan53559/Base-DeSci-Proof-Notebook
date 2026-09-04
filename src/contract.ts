import { BrowserProvider, Contract } from 'ethers';

export const BASE_SEPOLIA = {
  chainId: '0x14a34',
  chainName: 'Base Sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: ['https://sepolia.base.org'],
  blockExplorerUrls: ['https://sepolia.basescan.org'],
};

export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS?.trim() ?? '';

export const CONTRACT_ABI = [
  'function anchorProof(bytes32 fileHash, string title)',
  'function getProof(bytes32 fileHash) view returns (address creator, uint64 timestamp, string title)',
  'function getProofHashesByCreator(address creator) view returns (bytes32[])',
  'event ProofAnchored(bytes32 indexed fileHash, address indexed creator, uint64 timestamp, string title)',
];

export function isContractConfigured() {
  return /^0x[a-fA-F0-9]{40}$/.test(CONTRACT_ADDRESS);
}

export async function getReadContract() {
  const provider = new BrowserProvider(window.ethereum!);
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
}

export async function getWriteContract() {
  const provider = new BrowserProvider(window.ethereum!);
  const signer = await provider.getSigner();
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}

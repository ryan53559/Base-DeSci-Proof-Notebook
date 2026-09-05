# Test Wallet Readiness

## Purpose

This project uses one new test-only wallet for Base Sepolia. It must never be
the wallet that holds real ETH, USDC, or the ETHGlobal Hacker Pack.

## Recommended wallet

Use a new MetaMask extension wallet in a separate browser profile. MetaMask is
widely compatible with Ethereum dapps and supports Base plus Base Sepolia.

## Human-only steps

1. Install MetaMask only from its official website or browser extension store.
2. Create a new wallet, not an extra account inside the main wallet.
3. Write the recovery phrase on paper and keep it offline.
4. Never take a screenshot of the phrase and never share it with anyone,
   including AI tools.
5. Enable test networks and use Base Sepolia only.
6. Request free Base Sepolia test ETH from an official faucet when deployment
   begins.

## Base Sepolia details

- Network: Base Sepolia
- Chain ID: `84532` (`0x14a34`)
- Public RPC: `https://sepolia.base.org`
- Explorer: `https://sepolia.basescan.org`

## Do not do these things

- Do not send real ETH or USDC to the test wallet.
- Do not import the main wallet recovery phrase into a new browser profile.
- Do not use the Hacker Pack wallet as the deployer for this project.

## Next project step

After the website dependencies can install, deploy the contract with free test
ETH, copy the public contract address into `.env`, and test one real proof.

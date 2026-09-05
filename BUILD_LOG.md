# Build Log

## 2026-09-05 00:00 Asia/Taipei

- Official ETHOnline 2026 From Scratch work begins.
- Created a new empty Git repository for the official submission.
- Added the initial README, scope, AI use disclosure, and build log.
- No prior prototype source files were copied into this repository.

## 2026-09-05 00:xx Asia/Taipei

- Created `feature/v0.1-core-mvp`.
- Implemented the React app shell with plain Traditional Chinese guidance.
- Implemented browser-only SHA-256 file fingerprinting.
- Added the Base Sepolia wallet and contract integration boundary.
- Added verification, public timeline, and a simple consistency score interface.
- Added Solidity source and an optimized local compiler script.
- Dependency installation and executable verification are pending because this computer currently rejects the public npm registry TLS certificate.

## 2026-09-05 Wallet preparation

- Added a test-wallet readiness checklist for a separate MetaMask wallet.
- The project uses Base Sepolia chain ID `84532` and free test ETH only.
- Wallet creation remains a human-only step because the recovery phrase must never be exposed to this project or an AI tool.

## 2026-09-05 Local proof test

- Added `standalone.html`, a dependency-free browser version for local testing.
- Started a local-only server at `127.0.0.1`.
- Selected `README.md` through the user interface and verified that the browser produced SHA-256 fingerprint `0x5daf487cbe1a2e28aa7042d858af030b980f9d6403bc9db9f349227c1e7ce5d4`.
- No file upload, wallet connection, contract deployment, or blockchain transaction occurred during this test.

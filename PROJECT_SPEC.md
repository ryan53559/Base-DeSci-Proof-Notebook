# Project Specification

## Product name

Base DeSci Proof Notebook

## Audience

People with no Web3 background: students, independent researchers, small labs,
and reviewers.

## Non-negotiable product rules

- The original file stays on the user's device.
- SHA-256 hashing happens in the browser.
- No file uploads, server storage, or IPFS are used for the core proof flow.
- The app uses Base Sepolia for all blockchain interactions.
- The UI explains Web3 terms in ordinary language.
- The project uses a new test-only wallet and free test ETH only.

## Must-have features

### 1. Make a proof

The user selects a photo, video, CSV, or PDF. The app shows the local SHA-256
fingerprint, asks for a short title, and lets the user save the fingerprint on
Base Sepolia.

### 2. Check a file

The user selects an original file. The app calculates its fingerprint locally
and checks the onchain proof. It clearly shows either a match or no match.

### 3. Research passport

The app shows a public timeline for the connected wallet: titles, timestamps,
and proof count. The score is a simple consistency indicator, not a judgment of
scientific quality.

## Later, only after the core works

- ENSv2 research identity experiment on Sepolia.
- Sponsor integrations that genuinely improve the core flow.
- Mobile polish and demo-friendly guided states.

## Success test

With a new test wallet and free Base Sepolia ETH, a user can create a proof for
a local sample file, see its successful transaction, and verify the same file
from a different browser session.

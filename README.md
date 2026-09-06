# DeSci Proof Notebook

An open, beginner-friendly research proof app on Base Sepolia for proving that a research file
existed at a particular time without uploading that file anywhere.

## ETHOnline 2026

- Track: From Scratch
- Build window started: 2026-09-05 00:00 Asia/Taipei
- Current network target: Base Sepolia only
- Repository purpose: official hackathon submission source

## The problem

Students, independent researchers, and small labs need a simple way to create
an auditable timestamp for raw research notes, photos, videos, CSV files, and
PDFs. Existing tools either store sensitive files on third-party servers or
require blockchain knowledge.

## The solution

The browser calculates a SHA-256 hash of a selected file locally. It never
uploads the file. A smart contract records the hash, title, optional short public
research note, and blockchain timestamp on Base Sepolia. Anyone can later select the original file to check
whether its locally calculated hash matches the onchain proof.

## Planned core flow

1. Select a file and calculate its fingerprint locally.
2. Create an onchain proof on Base Sepolia.
3. Select an original file later and verify it against the proof.
4. View a wallet's public proof timeline and consistency score.

## Important boundary

This app proves that a particular file hash existed at an onchain time. It does
not independently prove legal ownership, authorship, or where a file was made.

## Repository records

- [Project specification](PROJECT_SPEC.md)
- [AI use disclosure](AI_USAGE.md)
- [AI use disclosure, English and Traditional Chinese](AI_USAGE_zh-en.md)
- [Video and pitch kit, English and Traditional Chinese](VIDEO_PITCH_ZH_EN.md)
- [Advantages, limitations, and future improvements](TRADEOFFS_ZH_EN.md)
- [Detailed demo runbook, English and Traditional Chinese](DEMO_RUNBOOK_ZH_EN.md)
- [Test wallet readiness](WALLET_READINESS.md)
- [Build log](BUILD_LOG.md)
- [Version and history rules](VERSIONING.md)
- [Project progress](PROGRESS_ZH_EN.md)
- [Science-fair style project report](PROJECT_REPORT_ZH_EN.md)
- [Official submission and video guide](OFFICIAL_VIDEO_SCRIPT_ZH_EN.md)
- [Human and AI collaboration record](HUMAN_AI_COLLABORATION_ZH_EN.md)
- [Chainlink prize evidence mapping](CHAINLINK_SUBMISSION_EVIDENCE.md)
- [Chainlink confidential research gate](chainlink/README.md)
- [Chainlink build status](chainlink/BUILD_STATUS.md)

## Demo data

The `demo/` folder contains one synthetic battery CSV and a second copy with a
single changed value. They are safe to use when showing successful verification
and change detection.

## Deployment

Public website: [https://ryan53559.github.io/Base-DeSci-Proof-Notebook/](https://ryan53559.github.io/Base-DeSci-Proof-Notebook/)

The Base Sepolia contract is deployed at
[`0xD505ad9d439ee159eE4Af3ad331F417C3B8A4a29`](https://base-sepolia.blockscout.com/address/0xD505ad9d439ee159eE4Af3ad331F417C3B8A4a29).
Its source was verified through Remix with Sourcify and Blockscout.

The included GitHub Pages workflow builds from `main`. The address above is the
verified public deployment. The repository Actions variable `VITE_CONTRACT_ADDRESS` may
override it for a future deployment.

The Chainlink CRE confidential extension has passed a local simulation with
synthetic data. Live CRE deployment access was requested on 2026-09-06 and is
still awaiting Chainlink approval, so the website labels it as simulation-only.
ETHOnline 2026's Chainlink rules allow a successful CRE CLI simulation as
execution evidence for Best Confidential Workflow. The repository records the
matching demo-file hash, terminal result, and one-way commitment.

## Naming note

The public product name is **DeSci Proof Notebook**. The deployed Base Sepolia
contract keeps the technical Solidity name `BaseDeSciProofNotebook`, because a
deployed contract name and address cannot be renamed after deployment.

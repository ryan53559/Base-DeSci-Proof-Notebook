# Version and History Rules

This project keeps two kinds of history.

## Git history

- `main` contains reviewed, working milestones.
- `feature/v0.5-submission-kit` is the active implementation branch.
- Every meaningful change receives a short commit message before it is merged.
- Major milestones use a Git tag such as `v0.1.0` so the exact submission state can be recovered.

## Versioned folders

- The active project folder includes the current milestone: `Base-DeSci-Proof-Notebook-v0.1.0-foundation`.
- At the next major milestone, a dated snapshot folder can be created beside it, for example `Base-DeSci-Proof-Notebook-v0.2.0-base-sepolia-live`.
- The Git repository remains the source of truth. Snapshot folders are for easy visual organization, not a replacement for Git history.

## Current progress

- `v0.1.0-foundation`: app shell, local SHA-256, Base Sepolia contract source, beginner explanations.
- `v0.2.0-bilingual-showcase`: bilingual UI, public history, and deployed Base connection.
- `v0.3.0-chainlink-confidential-gate`: Chainlink CRE confidential workflow and successful synthetic simulation.
- `v0.4.0-ui-pages-release`: responsive UI polish, evidence section, and Pages workflow.
- `v0.5.0-submission-kit`: science-fair report, official video script, repeatable tests, and submission evidence.

The four feature branches remain on GitHub. Git branches and tags are the
recoverable version snapshots; copying the whole repository into each version
would add duplicate files and make judging history harder to read.

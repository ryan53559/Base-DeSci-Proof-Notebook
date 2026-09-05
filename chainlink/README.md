# Chainlink Confidential Research Gate

This folder is an optional Chainlink CRE extension for **DeSci Proof Notebook**.
It is separate from the browser proof flow so the original research file never
leaves the user's device.

## What the gate protects

The normal proof flow stores a public file fingerprint, title, optional public
note, wallet address, and timestamp. It must never contain unpublished formulas,
personal information, or a private embargo plan.

The confidential gate processes only a separate, optional private rule inside a
Chainlink Trusted Execution Environment (TEE). In the demo it uses a synthetic
embargo rule. It combines that private rule with a public file fingerprint and
returns only a one-way commitment hash. The private rule is never printed in
workflow logs or written to the public chain.

## Why it matters

A researcher can prove that a private release policy was fixed when a file was
timestamped, without publishing the policy itself. Later, the researcher can
reveal the rule and reproduce the same commitment.

## Current status

- The Base Sepolia file-timestamp contract is deployed separately.
- This CRE workflow is designed for free local simulation first.
- No personal research data, real API keys, private keys, or real assets are
  used in the simulation.
- A production workflow deployment requires Chainlink access approval. Do not
  call this a live Chainlink integration until the simulation log has succeeded
  and a deployed workflow or supported app endpoint is demonstrated.

## Run the simulation

Use the synthetic value in `confidential-gate/.env.example`, copied to a local
`.env` file that stays ignored by Git. The detailed command is in
[`confidential-gate/README.md`](confidential-gate/README.md).

Current local status is recorded in [BUILD_STATUS.md](BUILD_STATUS.md).

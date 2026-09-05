# Confidential Research Gate

## Purpose

This is a Chainlink CRE Confidential Workflow for DeSci Proof Notebook. It
handles an optional private research rule, such as an embargo condition, in a
TEE. The original research file is not an input to this workflow and never
leaves the browser. The public file hash is sufficient.

## Privacy boundary

Input that may be public:

- file fingerprint
- policy label such as `embargo-until-review`

Input that stays private in the TEE:

- the synthetic or real private rule supplied as `RESEARCH_GATE_SECRET`

Output that can be public:

- a keccak256 commitment hash

The commitment binds the file hash, policy label, and private rule. The workflow
does not log the private rule. The staging configuration uses the SHA-256 of
`demo/battery-cycle-original.csv`, connecting the confidential flow to the same
file used by the website demo.

## Local simulation

1. Copy `.env.example` to `.env`.
2. Keep the default synthetic value. Do not use a real research file, private
   key, recovery phrase, password, or production credential.
3. Install dependencies with `pnpm install` from this folder.
4. From the repository root, run:

```powershell
.\.tools\cre\cre_v1.32.0_windows_amd64.exe workflow simulate .\chainlink\confidential-gate --target=staging-settings --env .\chainlink\confidential-gate\.env
```

5. A successful result must include `confidential-gate-complete`, the demo file
   hash, and a `commitment` value. Capture the terminal output for the hackathon
   demo only after it succeeds.

## Honest submission wording

Say: “A Chainlink TEE processes an optional private policy and returns only a
commitment. The research file remains local.”

Do not say that the workflow is deployed or that it protects a real policy
until the corresponding evidence exists.

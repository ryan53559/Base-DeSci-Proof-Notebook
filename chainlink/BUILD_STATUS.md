# Chainlink Build Status

## Completed through v0.5

- Installed and verified the official CRE CLI locally: `v1.32.0`.
- Added a TypeScript CRE workflow using `handlerInTee`.
- Added one synthetic secret input named `RESEARCH_GATE_SECRET`.
- Ensured the workflow logs only a commitment hash, never the secret.
- Installed the official Bun runtime locally (`v1.4.2`) for CRE TypeScript builds.
- Ran a successful local CRE simulation on 2026-09-05 using synthetic data only.
- Re-ran the simulation using the SHA-256 of the website's synthetic original
  CSV, so the confidential extension is tied to the same demo evidence.
- Recorded the current simulation commitment:
  `0x9180230a5e5f68097684d9b351ebc52e12de09f8962d453e38f109c85d5f25b1`.
- Submitted a CRE deployment-access request on 2026-09-06; review is pending.
- Documented the privacy boundary and the exact simulation command.

## Simulation evidence

The simulator compiled the workflow, loaded the synthetic secret, requested a
TEE execution, and completed successfully. Its public output was:

```text
publicFileHash: 0x98c90262d08bef2b6ad69261dc84f7931d41ade9501645fc7859f3f3d2dec602
policyLabel: embargo-until-review
commitment: 0x9180230a5e5f68097684d9b351ebc52e12de09f8962d453e38f109c85d5f25b1
```

The simulator explicitly warns that it is not a real TEE and is for debugging
only. This is valid simulation evidence, not a live deployment or proof that
real research data has been protected.

## Submission rule

The official ETHOnline 2026 Chainlink requirements accept either a successful
CRE CLI simulation or a live CRE deployment as execution evidence. Describe
this as a **successfully simulated Chainlink CRE Confidential Workflow** and
show the log in the video. Do not describe it as deployed or live.

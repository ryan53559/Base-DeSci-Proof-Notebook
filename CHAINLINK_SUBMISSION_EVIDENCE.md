# Chainlink Submission Evidence

Target prize: **Best Confidential Workflow**.

Official event page: <https://ethglobal.com/events/ethonline2026/prizes>

## Requirement mapping

| Official requirement | Project evidence |
| --- | --- |
| Build a CRE Confidential Workflow | `chainlink/confidential-gate/main.ts` |
| Register a confidential TEE handler | `handlerInTee(...)` wraps the cron trigger |
| Process a private input inside the enclave | `runtime.getSecrets(...)` reads the private embargo rule only inside the handler |
| Meaningful core integration | The handler binds the same SHA-256 used by the proof notebook to a private research-release rule |
| Do not expose the private value | Only the file hash, policy label, and one-way commitment leave the handler |
| Show successful execution | Official CRE CLI simulation completed on 2026-09-06 |

## Reproducible evidence

```text
publicFileHash: 0x98c90262d08bef2b6ad69261dc84f7931d41ade9501645fc7859f3f3d2dec602
policyLabel: embargo-until-review
commitment: 0x9180230a5e5f68097684d9b351ebc52e12de09f8962d453e38f109c85d5f25b1
binaryHash: 0ef2e1f67f081cb7d702a4d080dcf3587263b5234ef17d9ae9b60d4da0d96cfe
configHash: e0760f85ccabc37288abc4fe5e4e887388b2782bac113f5d13ebb09a72564eb2
```

The public file hash is the SHA-256 of `demo/battery-cycle-original.csv`.
The private value is synthetic and is never printed by the workflow.

## Honest boundary

The official prize requirements accept a successful CRE CLI simulation or a
live deployment. This project currently provides a successful simulation.
Deployment access was requested, but is pending Chainlink review. The simulator
states that it is not a real TEE, so the submission must not claim live
confidential protection.

## Demo sentence

“The notebook creates the public research fingerprint. Chainlink CRE combines
that same fingerprint with a private embargo rule inside `handlerInTee` and
releases only this one-way commitment. The successful CLI simulation is shown
here; live deployment access is still under review.”

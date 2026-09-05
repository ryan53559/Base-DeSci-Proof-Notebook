# Chainlink Build Status

## Completed in v0.3

- Installed and verified the official CRE CLI locally: `v1.32.0`.
- Added a TypeScript CRE workflow using `handlerInTee`.
- Added one synthetic secret input named `RESEARCH_GATE_SECRET`.
- Ensured the workflow logs only a commitment hash, never the secret.
- Documented the privacy boundary and the exact simulation command.

## Not yet claimed as complete

The workflow has not yet produced a successful CRE simulation log. The local
package download failed because this Windows environment could not verify the
TLS certificate from npm:

```text
UNABLE_TO_VERIFY_LEAF_SIGNATURE
```

Certificate verification must remain enabled. Do not fix this by using
`strict-ssl=false`, disabling TLS verification, or installing unverified
packages. Once the device trusts the relevant certificate chain, run the
simulation in `confidential-gate/README.md` with only its synthetic `.env`
value, then save the terminal output as demo evidence.

## Submission rule

Until the simulation succeeds, describe this as an **in-progress Chainlink CRE
extension**, not as a deployed or completed Chainlink integration.

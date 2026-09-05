# Project Progress / 專案進度

Last updated: 2026-09-05

## Completed / 已完成

- [x] Public product name: **DeSci Proof Notebook**.
- [x] Bilingual React website with local SHA-256 file hashing.
- [x] Original files are not uploaded to a server or IPFS.
- [x] Base Sepolia smart contract deployed and source verified.
- [x] Create a proof with title and optional public text.
- [x] Verify an original file without connecting a wallet.
- [x] Look up a public wallet's proof history without connecting a wallet.
- [x] Public documentation for privacy boundaries, advantages, limitations, and AI use.
- [x] Demo sample files and a bilingual video outline.
- [x] Official Chainlink CRE CLI installed locally and version checked.
- [x] Chainlink Confidential Research Gate source added with `handlerInTee`.
- [x] Git history preserved in feature branches.

## In progress / 進行中

- [ ] Install Chainlink CRE SDK dependencies after the local TLS certificate issue is fixed.
- [ ] Run a CRE simulation with synthetic data only.
- [ ] Capture a successful terminal log for the demo after simulation succeeds.
- [ ] Decide whether a new v0.3 contract should record the Chainlink commitment onchain.

## Not started / 尚未開始

- [ ] Deploy the website to GitHub Pages and test it in a clean browser.
- [ ] Create one demonstration proof with the synthetic CSV.
- [ ] Record the short project demonstration video.
- [ ] Complete the ETHGlobal project submission page.

## Honest status / 誠實狀態

The core Base Sepolia proof application is deployed. The Chainlink extension is
source-complete but is **not yet simulated successfully** because npm download
certificate verification failed on this computer. Do not describe Chainlink as
live, deployed, or complete until a successful simulation log exists.

核心 Base Sepolia 存證應用已部署。Chainlink 延伸功能的原始碼已完成，但因這台
電腦下載 npm 套件時憑證驗證失敗，**尚未成功模擬**。在有成功模擬紀錄前，不能說
Chainlink 已上線、已部署或已完成。

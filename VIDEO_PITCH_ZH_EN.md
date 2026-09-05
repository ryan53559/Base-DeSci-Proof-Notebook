# DeSci Proof Notebook - Video and Pitch Kit

This file contains truthful, reusable material for the ETHOnline demo video,
project page, judge conversation, and live presentation.

## One-line pitch / 一句話介紹

**中文**

DeSci Proof Notebook 讓任何人不用上傳原始檔，就能把研究檔案的數位指紋與時間留在鏈上，日後用原始檔公開驗證內容是否改變。

**English**

DeSci Proof Notebook lets anyone timestamp a research file onchain without uploading the original, then verify later whether that exact file has changed.

## Motivation / 製作動機

**中文**

學生、獨立研究者與小型實驗室常用照片、影片、PDF 和 CSV 記錄研究，但檔案建立時間容易被質疑，集中式雲端又需要交出原始資料。我想做一個一般人也能操作的工具：檔案留在自己的裝置，瀏覽器只計算 SHA-256 指紋，再用 Base Sepolia 留下一筆公開、可查驗的時間紀錄。

**English**

Students, independent researchers, and small labs often document work with photos, videos, PDFs, and CSV files. Creation dates can be disputed, while centralized services require users to hand over the original data. I wanted a tool that ordinary people can use: the file stays on the device, the browser calculates only its SHA-256 fingerprint, and Base Sepolia provides a public timestamp that anyone can check.

## Problem / 問題

- Research evidence is easy to edit after the fact.
- Cloud timestamping can expose private or unpublished data.
- Most blockchain tools assume that users already understand wallets, gas, and hashes.
- A timestamp alone is often described too strongly. It does not automatically prove authorship, truth, location, patent rights, or that media was not AI-generated.

## Solution / 解法

1. The browser reads a selected file locally and calculates its SHA-256 hash.
2. The original file is never uploaded to this app, a server, or IPFS.
3. The user signs one Base Sepolia transaction that stores the hash, title, optional public text, wallet, and blockchain timestamp.
4. Anyone can later select a file and compare its locally calculated hash with the onchain record without connecting a wallet.
5. Anyone can enter a public wallet address to read its public timeline without connecting a wallet.
6. A public timeline summarizes recording history. Its continuity score measures activity only, not scientific quality.

## Who it helps / 誰會使用

- Students protecting the timeline of an unfinished science project.
- Field researchers recording the existence of original media before editing or publication.
- Small labs creating an auditable daily trail for raw data exports.
- Reviewers and DeSci communities checking whether a submitted file exactly matches an earlier timestamped version.

## Practical value / 實用性

### 1. Student invention notes / 學生發明筆記

A student can timestamp a photo or PDF of an early idea before sharing it. The record is useful supporting evidence of when that exact file existed, but it does not replace a patent filing or legal advice.

### 2. Field observations / 野外觀察

A researcher can timestamp the exact original photo or video before later editing. A successful check proves that the tested file matches the earlier fingerprint; it does not by itself prove where the media was captured or whether its subject is real.

### 3. Daily experiment exports / 每日實驗資料

A small lab can anchor each day's raw CSV export. Later edits produce a different hash, making silent changes easy to detect when the original files are checked.

### 4. DeSci review / 去中心化科學審查

A community can inspect a researcher's public proof timeline before deciding what additional evidence, replication, or peer review is needed.

## Why Base / 為什麼使用 Base

**中文**

Base 是由 Coinbase 孵化的 Ethereum Layer 2，保留 EVM 工具相容性並降低一般使用者的交易門檻。本專案是獨立黑客松作品，並非 Coinbase 或 Base 的合作、背書或官方產品。黑客松版本只使用 Base Sepolia 測試網與免費測試幣，因此不需要投入真實資產。未來正式版可以再加入代付 gas 或智慧錢包，讓第一次接觸 Web3 的人更接近一般網站體驗。

**English**

Base is an Ethereum Layer 2 incubated by Coinbase, with strong EVM compatibility and lower transaction friction. This is an independent hackathon project, not a Coinbase or Base partnership, endorsement, or official product. The hackathon build uses only Base Sepolia and free test ETH, so no real assets are required. A future production version could add sponsored transactions or smart accounts to make onboarding feel closer to a normal web app.

## 90-second narration / 90 秒旁白

### 中文

很多學生與獨立研究者都有一個共同問題：我今天產生的原始資料，半年後要怎麼證明它當時就已經存在，而且沒有被偷偷修改？把未公開資料交給雲端平台又可能帶來隱私問題。

這是 DeSci Proof Notebook。一個不需要先懂 Web3 的研究存證工具。

我把一份實驗 CSV 拖進網站。檔案不會被上傳，瀏覽器只在本機計算 SHA-256 數位指紋。接著輸入研究名稱與可留白的公開文字，用測試錢包簽署一筆 Base Sepolia 交易。鏈上只保存指紋、標題、公開文字、錢包與時間。

之後，任何人都能把原始檔拖進驗證區，不用連接錢包。指紋相同，網站就會顯示最早的鏈上紀錄；只要檔案改動一個字元，指紋就會不同。

沒有錢包的人仍可驗證檔案，或輸入公開地址查看紀錄；但建立新的鏈上存證仍需要錢包與測試 ETH。公開時間軸可以整理持續記錄的歷史，但我們不把分數當成研究真假的判決。這個產品提供的是可查驗的時間與完整性證據，再交給同行評審、實驗重現和法律程序做更完整的判斷。

### English

Students and independent researchers share a common problem: how can I show that today's raw data already existed months ago and has not been silently changed, without handing unpublished work to a cloud platform?

This is DeSci Proof Notebook, a research timestamping tool designed for people who do not already understand Web3.

I drop an experiment CSV into the page. The file is never uploaded. The browser calculates its SHA-256 fingerprint locally. I add a short title and optional public text, then sign one Base Sepolia test transaction. Only the fingerprint, title, public text, wallet, and timestamp are recorded onchain.

Later, anyone can drop the original file into the verification area without connecting a wallet. If the fingerprint matches, the app shows the earlier onchain record. Changing even one character creates a different fingerprint.

People without a wallet can still verify a file or enter a public address to view its history, but creating a new proof needs a wallet and test ETH. The public timeline summarizes consistent recording activity, but the score is not a verdict on scientific truth. The product provides verifiable evidence of time and file integrity, while peer review, replication, and legal processes provide the broader judgment.

## Three-minute demo order / 三分鐘展示順序

1. **0:00-0:20 - Problem:** Show one research file and explain why its ordinary file date is weak evidence.
2. **0:20-0:40 - Privacy:** Open the app and point to "original file never uploads."
3. **0:40-1:15 - Local hash:** Drop in the sample CSV and show the SHA-256 fingerprint appearing immediately.
4. **1:15-1:50 - Base transaction:** Enter a title, connect the Base Sepolia wallet, confirm the transaction, and open the explorer record.
5. **1:50-2:15 - Verification:** Drop in the same file without a wallet and show the green match result.
6. **2:15-2:35 - Tamper check:** Change one value in a duplicate CSV and show that it no longer matches.
7. **2:35-2:50 - Passport:** Show the wallet timeline and explain the transparent continuity formula.
8. **2:50-3:00 - Close:** State the boundary: timestamp and integrity evidence, not automatic proof of scientific truth.

## On-screen text / 影片畫面文字

- Local SHA-256. Original file never uploaded.
- One Base Sepolia proof. Publicly verifiable.
- Verification works without a wallet.
- Evidence of time and integrity, not a truth oracle.
- Built from scratch for ETHOnline 2026.

## Judge questions / 評審可能提問

### Why not store the file on IPFS?

Unpublished research may be private, large, or ethically sensitive. The core product proves the fingerprint without publishing the source file. Users can choose a separate storage system later if their research allows it.

### What happens if two people anchor the same file?

The contract keeps the first successful timestamp for that exact hash. This avoids duplicate claims in the same contract, but a timestamp still does not decide legal ownership.

### Can a fake image still be anchored?

Yes. The system proves when an exact file hash was recorded and whether the tested file has changed. It does not determine whether the content itself is true or AI-generated.

### Why is there a reputation score?

It is a transparent activity indicator based on proof count, distinct recording days, and time span. It helps reviewers find a history, but it cannot replace peer review or replication.

### Why use a blockchain instead of a database?

A public blockchain makes the timestamp independently readable without trusting this website or one database operator. The original file remains private, while the proof can outlive the interface.

## Sponsor positioning / 贊助商獎定位

- **Base:** The complete proof lifecycle runs on Base Sepolia and is designed for mainstream onboarding.
- **Account abstraction, future extension:** Sponsored transactions and smart accounts could remove the need for users to obtain test ETH, but they should be added only if the relevant sponsor rules reward a real integration.
- **DeSci:** The project gives researchers a privacy-preserving, independently verifiable integrity trail.

Always re-check the current official prize requirements before naming a specific bounty in the final submission.

## Ecosystem positioning / 生態定位

- **Accurate statement:** Built on Base, an Ethereum L2 incubated by Coinbase.
- **Do not claim:** a Coinbase or Base partnership, endorsement, grant, or official status.
- **Future direction:** keep Base as the canonical proof registry, then evaluate optional EVM-compatible deployments only when cross-chain verification and sponsor rules provide a real user benefit.

## Advantages and limitations / 優點與限制

See [TRADEOFFS_ZH_EN.md](TRADEOFFS_ZH_EN.md) for a concise, honest comparison.

## Recording checklist / 錄影檢查表

- Use a non-sensitive sample CSV made for the demo.
- Hide wallet balances that are unrelated to the demo.
- Never show a recovery phrase, private key, password, QR backup, or personal email.
- Record the successful Base Sepolia transaction hash and explorer page.
- Show both a matching file and a one-character-modified file.
- Keep the browser zoom and text large enough for judges to read.
- Add English subtitles if the narration is in Chinese.
- Do not claim that the app grants a patent, proves authorship, proves location, or detects AI-generated media.

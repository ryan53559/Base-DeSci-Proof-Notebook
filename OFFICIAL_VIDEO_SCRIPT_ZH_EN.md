# ETHOnline 2026 Official Video Script / 官方規格影片稿

Official information checked on 2026-09-06:

- Event submission guide: <https://ethglobal.com/events/ethonline2026/info/details>
- Event prizes: <https://ethglobal.com/events/ethonline2026/prizes>
- General rules: <https://ethglobal.com/rules>

## Official requirements / 官方要求

- Submit by **Sunday, September 13, 2026 at 12:00 pm EDT**, which is
  **Monday, September 14 at 00:00 in Taiwan**.
- The demo video is required and must be **2 to 4 minutes**. Upload rejects
  videos under 2 minutes or over 4 minutes.
- Export at **720p or higher**.
- Record on a computer, not a mobile phone.
- Speak normally. Do not speed up the video and do not use AI voiceover or
  text-to-speech.
- Show the working product and edit out waiting time.
- Keep personal introduction under 20 seconds.
- Slides may summarize key points, with no more than 4 bullets per slide.
- The final form allows up to 3 partner-prize selections.
- Clearly disclose AI assistance and show version-control history.

## Recommended submission choice / 建議提交選擇

Choose **Finalist and Partner Prizes**, then select **Chainlink** as the partner
prize that is genuinely integrated. Do not select The Graph, Arc, Privy, or
other sponsors unless their required live technology is actually added later.

For Chainlink, apply for **Best Confidential Workflow**. Official requirements
accept a successful CRE CLI simulation or a live deployment. This repository
has a successful simulation tied to the website's demo file. Do not apply for
the Continuity-only Chainlink upgrade prize because this is a From Scratch
project.

## Recording setup / 錄影設定

1. Use landscape screen recording at 1920 x 1080 or at least 1280 x 720.
2. Use your real voice in a quiet room. Chinese narration with English subtitles is acceptable.
3. Close Gmail, Discord, wallet balances, and unrelated tabs.
4. Never show a seed phrase, private key, password, backup QR code, or real funds.
5. Prepare the public website, Base explorer, and successful CRE terminal output.
6. Use the synthetic files in `demo/` only.
7. Edit out transaction and page-loading waits; keep normal speech speed.

## 3:30 shot list and Chinese narration / 3 分 30 秒畫面與旁白

### 0:00-0:18 Problem / 問題

**畫面：** 標題頁，最多四點：研究檔可修改、雲端有隱私風險、新手不懂 Web3、需要可查驗時間。

**旁白：**

「研究照片、影片和 CSV 很容易被事後修改，電腦上的檔案日期也不是可靠的第三方
證據。但把未公開研究上傳到雲端，又可能產生隱私風險。我想做一個一般人也能用、
而且不必交出原始檔的研究存證工具。」

### 0:18-0:38 Solution / 解法

**畫面：** 公開網站首頁與三步驟流程。

**旁白：**

「這是 DeSci Proof Notebook。檔案留在使用者裝置，瀏覽器只計算 SHA-256 數位
指紋，再把指紋與時間寫入 Base Sepolia。任何人日後都能免費驗證，不需要錢包。」

### 0:38-1:18 Create proof / 建立存證

**畫面：** 選擇 `battery-cycle-original.csv`，顯示指紋、標題與公開文字警告；接著剪到已成功的交易與鏈上紀錄。

**旁白：**

「我選擇合成的電池實驗 CSV。指紋立刻在瀏覽器本機出現，原始檔沒有傳到伺服器、
IPFS 或 AI。我填入標題與可留白的公開短文。這段文字會永久公開，所以不能放個資
或未公開公式。建立證明時才需要測試錢包簽名；鏈上保存的是指紋、公開文字、地址
和區塊鏈時間，不是原始檔。」

### 1:18-1:58 Verify and detect changes / 驗證與改動偵測

**畫面：** 用原始 CSV 顯示綠色成功，再用只改一個數值的 tampered CSV 顯示不符。

**旁白：**

「驗證時不必連接錢包。我再次選擇原始 CSV，網站算出的指紋與合約紀錄相同，所以
顯示建立者和最早時間。接著換成只把一個數值由 1971 改成 1999 的版本，SHA-256
完全不同，網站就找不到相同存證。這能檢查檔案是否完全一致。」

### 1:58-2:25 Public history / 公開研究歷程

**畫面：** 輸入公開地址並載入時間軸與分數說明。

**旁白：**

「任何人也能輸入公開地址查看存證時間軸。活動分數只用存證筆數、不同日期與持續
時間計算，方便看到紀錄習慣；它不是研究真假或學術品質的評分。」

### 2:25-3:02 Chainlink confidential workflow / Chainlink 機密流程

**畫面：** 架構圖、`handlerInTee` 程式片段、成功 CRE CLI 輸出與 commitment。

**旁白：**

「公開鏈不能放私人禁運條件，所以我加入 Chainlink CRE Confidential Workflow。
它把同一份 CSV 指紋與一個私人研究規則放進 `handlerInTee`，只輸出不可逆的
commitment，不印出私人規則。畫面是官方 CRE CLI 的成功模擬，符合本獎項可用
模擬或正式部署證明執行的要求。部署權限仍在審核，所以我不會說它已經上線。」

### 3:02-3:23 Technology, AI, and feasibility / 技術、AI 與可行性

**畫面：** 一張四點投影片：React/TypeScript、Solidity/Base、Chainlink CRE、GitHub Pages。

**旁白：**

「網站使用 React、TypeScript、ethers 與 Web Crypto；合約使用 Solidity 並部署在
Base Sepolia；Chainlink CRE 處理機密規則；GitHub Pages 提供公開網站。我決定問題、
隱私界線、功能與測試流程，AI 大量協助產生程式和文件，但產品本身不使用 AI API。」

### 3:23-3:38 Boundary and close / 界線與結尾

**畫面：** 網站 FAQ 或最後一張結論投影片。

**旁白：**

「這個工具證明某個檔案指紋在某個鏈上時間已存在，並檢查被驗證檔案是否改變。
它不能單獨證明作者、專利、拍攝地點或科學真實性。它提供的是可查驗的時間與完整
性線索，再交給同行評審、重現實驗和法律程序做完整判斷。」

## English subtitle summary / 英文字幕摘要

1. Research files can change, while uploading unpublished work creates privacy risk.
2. The browser hashes each file locally and stores only public proof metadata on Base Sepolia.
3. Anyone can verify an exact file or inspect public history without a wallet.
4. A one-value change produces a different SHA-256 fingerprint.
5. Chainlink CRE binds the same file hash to a private embargo rule inside `handlerInTee`.
6. The successful CLI simulation releases only a commitment; live deployment is pending review.
7. AI assisted implementation and documentation; the running product uses no AI API.
8. This proves time and file integrity, not authorship or scientific truth.

## Final upload checklist / 最後上傳檢查

- [ ] Duration is between 2:00 and 4:00; target 3:30 to 3:40.
- [ ] Resolution is 720p or higher.
- [ ] Real human voice, normal speed, no AI voiceover.
- [ ] Product works on screen; loading waits are removed.
- [ ] Base transaction or explorer evidence is visible.
- [ ] CRE simulation success and commitment are readable.
- [ ] AI use is disclosed.
- [ ] No personal data, credentials, seed phrase, or real balance is visible.
- [ ] Video link is publicly viewable before submission.

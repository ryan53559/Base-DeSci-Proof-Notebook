# Demo Runbook / 展示操作手冊

Use only the synthetic files in `demo/`. They contain no personal or real
research data.

## Before recording / 錄影前

1. Open the final public website in a clean browser tab.
2. Keep MetaMask on the Base Sepolia test network.
3. Select only the test wallet. Never show its recovery phrase or private key.
4. Confirm that the wallet has free Base Sepolia test ETH.
5. Close unrelated tabs and hide personal email, messages, and balances.

## Live demo steps / 現場展示步驟

### Step 1 - Local fingerprint / 本機指紋

1. In the left panel, click the large file area.
2. Choose `demo/battery-cycle-original.csv`.
3. Wait for the 66-character SHA-256 value to appear.
4. Explain: the file stayed on this device; only its fingerprint will be sent.
5. Enter the title `Battery cycle test - original dataset`.

### Step 2 - Connect wallet / 連接錢包

1. Click `Connect test wallet / 連接測試錢包`.
2. MetaMask opens a permission request. Check that the selected account is the
   dedicated test wallet.
3. Click `Next`, then `Connect` only if the site name and account are correct.
4. If MetaMask asks to change networks, approve `Base Sepolia` only.
5. The website should show the shortened wallet address and test ETH balance.

Connecting a wallet does not send a transaction. It only lets the site read the
public address and later ask for a signature.

### Step 3 - Create the proof / 建立鏈上證明

1. Click `Create proof on Base / 在 Base 留下證明`.
2. MetaMask shows a transaction confirmation. Check:
   - Network: Base Sepolia.
   - Amount sent: 0 ETH.
   - Only a small test gas fee is requested.
3. Click `Confirm`. This is the action that spends free test ETH.
4. Wait until the website reports success.
5. Refresh the passport timeline and show the new title and time.

### Step 4 - Verify the original / 驗證原始檔

1. In the right verification panel, choose `demo/battery-cycle-original.csv`.
2. No wallet is required.
3. Show the green verified result, creator address, and Base timestamp.
4. Open the explorer link and show the public contract record.

### Step 5 - Detect a change / 找出改動

1. Choose `demo/battery-cycle-tampered.csv` in the verification panel.
2. This copy changes one capacity value from `1971` to `1999`.
3. Show that its fingerprint does not match the onchain proof.
4. Explain that this detects file changes, but does not judge whether the data
   or scientific conclusion is true.

## Screenshot moments / 正式截圖時機

Do not capture these until the related real state is visible.

1. `01-bilingual-home.png`: Chinese home screen with the full workflow visible.
2. `02-local-hash.png`: original CSV selected, fingerprint visible, no wallet popup.
3. `03-contract-deployed.png`: successful Base Sepolia contract deployment in Remix or explorer.
4. `04-proof-success.png`: website success message and first timeline item.
5. `05-verification-match.png`: green verification result for the original CSV.
6. `06-verification-changed.png`: no-match result for the tampered CSV.

Before each formal capture, the assistant must explicitly say `現在請截圖`.

## What each wallet action means / 每個錢包動作是什麼

- **Connect:** shares the public wallet address with this website. No gas fee.
- **Switch network:** changes MetaMask to Base Sepolia. No gas fee.
- **Deploy contract:** creates the notebook program on Base Sepolia. Uses free test gas once.
- **Create proof:** writes one file fingerprint and title to the contract. Uses a small amount of free test gas.
- **Verify:** reads public data only. No wallet and no gas fee.

## Stop immediately if / 看到以下內容立刻停止

- The network is Ethereum Mainnet or Base Mainnet.
- MetaMask requests real ETH, USDC, token approval, or a transfer to another person.
- Any page asks for a recovery phrase, private key, password, or backup QR code.
- The contract name is not `BaseDeSciProofNotebook`.

## Final spoken boundary / 最後一定要說

**中文：** 這個工具證明某個檔案指紋在某個鏈上時間已經存在，並能檢查檔案是否改變；它不會自動證明作者、專利權、拍攝地點或研究結論是真的。

**English:** This tool proves that a file fingerprint existed at an onchain time and checks whether a file has changed. It does not automatically prove authorship, patent rights, capture location, or scientific truth.

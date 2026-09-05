# Advantages, Limitations, and Future Improvements

## 中文

### 優點

- 原始檔只在使用者裝置內計算 SHA-256，不會上傳到本網站、伺服器或 IPFS。
- Base Sepolia 的公開時間戳記可被任何人獨立查驗，不必信任本網站。
- 驗證檔案與輸入公開地址查看紀錄，只讀取公開資料，不需要錢包、簽名或 ETH。
- 網站使用中英雙語與簡單文字，降低第一次接觸 Web3 的門檻。
- 合約原始碼已驗證，規則公開可查。

### 限制與缺點

- 建立新的鏈上存證必須有錢包，且每筆都要簽署交易。
- 在測試網建立存證仍需要免費的 Base Sepolia 測試 ETH；錢包餘額為零時，不能建立新紀錄。
- 標題與公開文字會永久公開上鏈；使用者不能填入個資、未公開公式或敏感資料。
- 指紋只能證明某個檔案版本在某個鏈上時間已存在，不能單獨證明作者、專利權、拍攝地點、研究結論或內容真實性。
- 同一份檔案只存第一筆指紋；這能避免重複紀錄，但不處理法律上的歸屬爭議。
- 誠信分數只代表公開記錄活動，不能取代同行評審、實驗重現或法律判斷。

### 未來改善

- 使用 Account Abstraction 與 Paymaster 代付 Gas，讓第一次使用者不用先取得 ETH。
- 加入智慧錢包或社群登入式錢包建立流程，降低錢包設定門檻。
- 加入地址、研究主題與時間範圍的公開搜尋。
- 維持 Base 作為主要紀錄鏈；僅在有明確驗證需求時評估 EVM 相容鏈部署。
- 讓研究社群以額外證據、重現紀錄與同行評審補足時間戳記的限制。

## English

### Advantages

- SHA-256 runs on the user's device; original files are never uploaded to this site, a server, or IPFS.
- A Base Sepolia timestamp is publicly checkable without trusting this website.
- File verification and public-history lookup only read public data, so they need no wallet, signature, or ETH.
- Bilingual, plain-language UI lowers the entry barrier for people new to Web3.
- The contract source is verified and its rules are publicly inspectable.

### Limitations

- Creating a new onchain proof requires a wallet and a signed transaction for every proof.
- Testnet proof creation still needs free Base Sepolia test ETH; a zero-balance wallet cannot create a record.
- Titles and public text are permanently public onchain; they must not contain personal, unpublished, or sensitive information.
- A fingerprint proves that one file version existed at an onchain time. It cannot independently prove authorship, patent rights, capture location, scientific conclusions, or truthfulness.
- The contract keeps the first proof for one exact file hash. This prevents duplicate records but does not settle legal ownership.
- The continuity score describes public recording activity only; it cannot replace peer review, replication, or legal judgment.

### Future improvements

- Use Account Abstraction and a Paymaster to sponsor gas, so first-time users do not need ETH.
- Add smart-wallet or social-login-style onboarding to reduce wallet setup friction.
- Add public search by address, research topic, and time range.
- Keep Base as the canonical registry; evaluate EVM-compatible deployments only when they provide a clear verification benefit.
- Let research communities add replication and peer-review evidence alongside timestamps.

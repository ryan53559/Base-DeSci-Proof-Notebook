import { ChangeEvent, DragEvent, useMemo, useState } from 'react';
import {
  CheckCircle2,
  ClipboardCheck,
  FileKey2,
  FileUp,
  Fingerprint,
  History,
  Info,
  Link2,
  LoaderCircle,
  LockKeyhole,
  ShieldAlert,
  Wallet,
} from 'lucide-react';
import { BrowserProvider, formatEther, isAddress } from 'ethers';
import {
  BASE_SEPOLIA,
  CONTRACT_ADDRESS,
  getReadContract,
  getWriteContract,
  isContractConfigured,
} from './contract';
import './types';

type AppState = 'idle' | 'working' | 'success' | 'error';

interface ProofRecord {
  hash: string;
  creator: string;
  timestamp: number;
  title: string;
}

const supportedTypes = '照片、影片、CSV、PDF，以及其他檔案';

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatTime(timestamp: number) {
  return new Intl.DateTimeFormat('zh-TW', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(new Date(timestamp * 1000));
}

async function fingerprintFile(file: File) {
  const content = await file.arrayBuffer();
  const digest = await crypto.subtle.digest('SHA-256', content);
  return `0x${Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')}`;
}

function DropZone({
  label,
  hint,
  onFile,
  busy,
  compact = false,
}: {
  label: string;
  hint: string;
  onFile: (file: File) => void;
  busy: boolean;
  compact?: boolean;
}) {
  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files.item(0);
    if (file) onFile(file);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (file) onFile(file);
  };

  return (
    <label
      className={`drop-zone ${compact ? 'drop-zone-compact' : ''}`}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      <input type="file" onChange={handleInput} disabled={busy} />
      {busy ? <LoaderCircle className="spin" size={28} /> : <FileUp size={28} />}
      <strong>{busy ? '正在建立檔案指紋...' : label}</strong>
      <span>{hint}</span>
    </label>
  );
}

export default function App() {
  const [wallet, setWallet] = useState('');
  const [networkOk, setNetworkOk] = useState(false);
  const [anchorFile, setAnchorFile] = useState<File | null>(null);
  const [anchorHash, setAnchorHash] = useState('');
  const [title, setTitle] = useState('');
  const [anchorState, setAnchorState] = useState<AppState>('idle');
  const [anchorMessage, setAnchorMessage] = useState('');
  const [verifyState, setVerifyState] = useState<AppState>('idle');
  const [verifyMessage, setVerifyMessage] = useState('');
  const [verifiedProof, setVerifiedProof] = useState<ProofRecord | null>(null);
  const [timeline, setTimeline] = useState<ProofRecord[]>([]);
  const [timelineState, setTimelineState] = useState<AppState>('idle');

  const passportScore = useMemo(() => {
    if (timeline.length === 0) return 0;
    return Math.min(100, timeline.length * 12 + Math.min(timeline.length, 5) * 4);
  }, [timeline]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setAnchorState('error');
      setAnchorMessage('找不到錢包。請安裝 MetaMask 或其他可用錢包後再試。');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: BASE_SEPOLIA.chainId }] });
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setWallet(await signer.getAddress());
      setNetworkOk(true);
      setAnchorMessage('');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : '錢包連接失敗。';
      if (message.includes('4902')) {
        try {
          await window.ethereum.request({ method: 'wallet_addEthereumChain', params: [BASE_SEPOLIA] });
          await connectWallet();
        } catch {
          setAnchorState('error');
          setAnchorMessage('無法加入 Base Sepolia，請在錢包中確認後再試。');
        }
      } else {
        setAnchorState('error');
        setAnchorMessage('你取消了錢包連接，或錢包暫時無法使用。');
      }
    }
  };

  const selectAnchorFile = async (file: File) => {
    setAnchorState('working');
    setAnchorMessage('正在你的裝置內計算指紋，檔案不會被上傳。');
    setAnchorFile(file);
    try {
      setAnchorHash(await fingerprintFile(file));
      setAnchorState('idle');
      setAnchorMessage('指紋已完成。接著替這份研究取一個名稱。');
    } catch {
      setAnchorState('error');
      setAnchorMessage('這個檔案無法讀取，請換一個檔案再試。');
    }
  };

  const anchorProof = async () => {
    if (!anchorHash || !anchorFile) {
      setAnchorState('error');
      setAnchorMessage('請先選擇一個檔案。');
      return;
    }
    if (!title.trim()) {
      setAnchorState('error');
      setAnchorMessage('請替這份研究填一個簡短名稱。');
      return;
    }
    if (!wallet || !networkOk) {
      setAnchorState('error');
      setAnchorMessage('請先連接 Base Sepolia 測試錢包。');
      return;
    }
    if (!isContractConfigured()) {
      setAnchorState('error');
      setAnchorMessage('合約還沒有部署。這是開發中的正常狀態，部署完成後這裡會自動可用。');
      return;
    }

    setAnchorState('working');
    setAnchorMessage('請在錢包確認這筆 Base Sepolia 測試交易。');
    try {
      const contract = await getWriteContract();
      const transaction = await contract.anchorProof(anchorHash, title.trim());
      setAnchorMessage('交易已送出，正在等待 Base Sepolia 記錄。');
      await transaction.wait();
      setAnchorState('success');
      setAnchorMessage('存證完成。原始檔案從頭到尾都沒有離開你的裝置。');
      await loadTimeline(wallet);
    } catch (error: unknown) {
      setAnchorState('error');
      const message = error instanceof Error ? error.message : '交易失敗。';
      setAnchorMessage(message.includes('user rejected') ? '你取消了錢包交易。' : '存證沒有完成，請確認錢包和測試 ETH 後再試。');
    }
  };

  const verifyFile = async (file: File) => {
    setVerifyState('working');
    setVerifyMessage('正在本機比對檔案指紋。');
    setVerifiedProof(null);
    if (!isContractConfigured() || !window.ethereum) {
      setVerifyState('error');
      setVerifyMessage('驗證合約還沒部署，因此目前無法查詢鏈上紀錄。');
      return;
    }
    try {
      const hash = await fingerprintFile(file);
      const contract = await getReadContract();
      const proof = await contract.getProof(hash);
      const timestamp = Number(proof.timestamp);
      if (timestamp === 0) {
        setVerifyState('error');
        setVerifyMessage('找不到這份檔案的存證。它可能未曾存證，或檔案曾被修改。');
        return;
      }
      const record = { hash, creator: proof.creator, timestamp, title: proof.title };
      setVerifiedProof(record);
      setVerifyState('success');
      setVerifyMessage('驗證通過。這份檔案的指紋與 Base 上的紀錄完全相同。');
    } catch {
      setVerifyState('error');
      setVerifyMessage('無法完成驗證，請檢查網路後再試。');
    }
  };

  const loadTimeline = async (targetWallet = wallet) => {
    if (!targetWallet || !isAddress(targetWallet)) return;
    if (!isContractConfigured() || !window.ethereum) {
      setTimeline([]);
      return;
    }
    setTimelineState('working');
    try {
      const contract = await getReadContract();
      const hashes: string[] = await contract.getProofHashesByCreator(targetWallet);
      const records = await Promise.all(
        hashes.map(async (hash) => {
          const proof = await contract.getProof(hash);
          return { hash, creator: proof.creator, timestamp: Number(proof.timestamp), title: proof.title };
        }),
      );
      setTimeline(records.sort((a, b) => b.timestamp - a.timestamp));
      setTimelineState('success');
    } catch {
      setTimelineState('error');
    }
  };

  const explorerUrl = verifiedProof
    ? `${BASE_SEPOLIA.blockExplorerUrls[0]}/address/${CONTRACT_ADDRESS}`
    : '';

  return (
    <main>
      <nav className="nav-shell">
        <a className="brand" href="#top" aria-label="Base DeSci Proof Notebook 首頁">
          <span className="brand-mark"><Fingerprint size={22} /></span>
          <span>Proof Notebook</span>
          <small>Base Sepolia</small>
        </a>
        <button className="wallet-button" onClick={connectWallet}>
          <Wallet size={18} />
          {wallet ? shortAddress(wallet) : '連接測試錢包'}
        </button>
      </nav>

      <section id="top" className="intro">
        <div>
          <p className="eyebrow">私人研究紀錄，公開時間證明</p>
          <h1>替你的研究，留下不能倒轉的時間。</h1>
          <p className="lead">檔案不會上傳。網站只在你的裝置算出專屬指紋，再把指紋和時間留在 Base 測試鏈。</p>
        </div>
        <div className="privacy-note"><LockKeyhole size={22} /><span><b>不儲存原始檔</b><br />照片、影片與數據一直留在你的裝置。</span></div>
      </section>

      <section className="workspace" aria-label="研究存證工具">
        <article className="panel anchor-panel">
          <div className="panel-heading">
            <span className="section-icon indigo"><FileKey2 size={19} /></span>
            <div><p className="eyebrow">第一步</p><h2>替研究留下證明</h2></div>
          </div>
          <p className="helper">支援 {supportedTypes}。檔案只會在這台裝置內建立指紋。</p>
          <DropZone label="拖入研究檔案" hint="或點這裡選擇檔案" onFile={selectAnchorFile} busy={anchorState === 'working'} />
          {anchorFile && <div className="file-chip"><FileKey2 size={16} /><span>{anchorFile.name}</span><small>{(anchorFile.size / 1024 / 1024).toFixed(2)} MB</small></div>}
          <label className="field-label">研究名稱<input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={120} placeholder="例如：電池電解液實驗，第 3 天" /></label>
          <div className="hash-box"><span>本機檔案指紋（SHA-256）</span><code>{anchorHash || '先選擇檔案，這裡會出現指紋'}</code></div>
          <button className="primary-button" onClick={anchorProof} disabled={anchorState === 'working'}><Fingerprint size={18} />在 Base 留下證明</button>
          {anchorMessage && <p className={`status ${anchorState}`}><Info size={16} />{anchorMessage}</p>}
        </article>

        <aside className="side-stack">
          <article className="panel verify-panel">
            <div className="panel-heading"><span className="section-icon green"><ClipboardCheck size={19} /></span><div><p className="eyebrow">第二步</p><h2>驗證原始檔</h2></div></div>
            <p className="helper">把原始檔拖進來。指紋相同，代表內容沒有變。</p>
            <DropZone compact label="拖入要驗證的檔案" hint="不用連接錢包" onFile={verifyFile} busy={verifyState === 'working'} />
            {verifyMessage && <div className={`result ${verifyState}`}>
              {verifyState === 'success' ? <CheckCircle2 size={21} /> : <ShieldAlert size={21} />}
              <span>{verifyMessage}</span>
            </div>}
            {verifiedProof && <div className="proof-details"><b>{verifiedProof.title}</b><span>建立者：{shortAddress(verifiedProof.creator)}</span><span>時間：{formatTime(verifiedProof.timestamp)}</span>{explorerUrl && <a href={explorerUrl} target="_blank" rel="noreferrer"><Link2 size={14} />查看 Base 紀錄</a>}</div>}
          </article>

          <article className="panel passport-panel">
            <div className="panel-heading"><span className="section-icon coral"><History size={19} /></span><div><p className="eyebrow">研究誠信護照</p><h2>你的公開紀錄</h2></div></div>
            {!wallet ? <p className="empty">連接測試錢包後，這裡會顯示你的存證時間軸。</p> : <>
              <div className="score-row"><div><span>持續記錄分數</span><b>{passportScore}<small>/ 100</small></b></div><div className="score-ring" style={{ '--score': `${passportScore}%` } as React.CSSProperties}><span>{timeline.length}</span></div></div>
              <button className="quiet-button" onClick={() => loadTimeline()} disabled={timelineState === 'working'}>{timelineState === 'working' ? '讀取中...' : '更新我的紀錄'}</button>
              <div className="timeline">{timeline.length === 0 ? <p className="empty">還沒有紀錄。完成第一筆存證後，它會出現在這裡。</p> : timeline.map((proof) => <div className="timeline-item" key={proof.hash}><i /><div><b>{proof.title}</b><span>{formatTime(proof.timestamp)}</span><code>{proof.hash.slice(0, 18)}...</code></div></div>)}</div>
            </>}
          </article>
        </aside>
      </section>

      <section className="explainers" aria-label="常見問題">
        <div><p className="eyebrow">簡單說明</p><h2>你不需要先懂區塊鏈。</h2></div>
        <details open><summary>連接錢包是做什麼？</summary><p>錢包像是你的數位簽名。只有你按下「留下證明」時，它才會請你確認。驗證檔案不需要錢包。</p></details>
        <details><summary>合約地址是做什麼？</summary><p>它是網站要查詢的 Base 帳本位置。部署完成前網站會清楚顯示尚未啟用，不會假裝資料已上鏈。</p></details>
        <details><summary>這能證明我是作者嗎？</summary><p>它能證明某個檔案指紋在某個時間已被記錄，不能單獨決定著作權、專利權或研究品質。</p></details>
      </section>

      <footer>Base DeSci Proof Notebook · Base Sepolia testnet · v0.1.0 foundation</footer>
    </main>
  );
}

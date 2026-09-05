import { ChangeEvent, DragEvent, useMemo, useState } from 'react';
import {
  CheckCircle2, ClipboardCheck, DatabaseZap, FileKey2, FileUp, Fingerprint,
  History, Info, Languages, Link2, LoaderCircle, LockKeyhole, ShieldAlert, Wallet,
} from 'lucide-react';
import { BrowserProvider, formatEther, isAddress } from 'ethers';
import { COPY, Language } from './copy';
import {
  BASE_SEPOLIA, CONTRACT_ADDRESS, getReadContract, getWriteContract, isContractConfigured,
} from './contract';
import './types';

type AppState = 'idle' | 'working' | 'success' | 'error';

interface ProofRecord {
  hash: string;
  creator: string;
  timestamp: number;
  title: string;
  note: string;
}

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatTime(timestamp: number, language: Language) {
  return new Intl.DateTimeFormat(language === 'zh' ? 'zh-TW' : 'en-US', {
    dateStyle: 'medium', timeStyle: 'medium',
  }).format(new Date(timestamp * 1000));
}

function getErrorCode(error: unknown) {
  if (typeof error !== 'object' || error === null || !('code' in error)) return undefined;
  return Number((error as { code: unknown }).code);
}

async function fingerprintFile(file: File) {
  const content = await file.arrayBuffer();
  const digest = await crypto.subtle.digest('SHA-256', content);
  return `0x${Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')}`;
}

function byteLength(value: string) {
  return new TextEncoder().encode(value).length;
}

function DropZone({ label, hint, onFile, busy, compact = false }: {
  label: string; hint: string; onFile: (file: File) => void; busy: boolean; compact?: boolean;
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
    <label className={`drop-zone ${compact ? 'drop-zone-compact' : ''}`}
      onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}>
      <input type="file" onChange={handleInput} disabled={busy} />
      {busy ? <LoaderCircle className="spin" size={28} /> : <FileUp size={28} />}
      <strong>{label}</strong><span>{hint}</span>
    </label>
  );
}

export default function App() {
  const [language, setLanguage] = useState<Language>('zh');
  const [wallet, setWallet] = useState('');
  const [walletBalance, setWalletBalance] = useState('');
  const [networkOk, setNetworkOk] = useState(false);
  const [anchorFile, setAnchorFile] = useState<File | null>(null);
  const [anchorHash, setAnchorHash] = useState('');
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [anchorState, setAnchorState] = useState<AppState>('idle');
  const [anchorMessage, setAnchorMessage] = useState('');
  const [verifyState, setVerifyState] = useState<AppState>('idle');
  const [verifyMessage, setVerifyMessage] = useState('');
  const [verifiedProof, setVerifiedProof] = useState<ProofRecord | null>(null);
  const [timeline, setTimeline] = useState<ProofRecord[]>([]);
  const [timelineState, setTimelineState] = useState<AppState>('idle');
  const text = COPY[language];

  const passportScore = useMemo(() => {
    if (timeline.length === 0) return 0;
    const activeDays = new Set(timeline.map((proof) =>
      new Date(proof.timestamp * 1000).toISOString().slice(0, 10))).size;
    const oldest = Math.min(...timeline.map((proof) => proof.timestamp));
    const newest = Math.max(...timeline.map((proof) => proof.timestamp));
    const spanDays = Math.floor((newest - oldest) / 86_400);
    return Math.min(100, timeline.length * 4 + activeDays * 8 + Math.min(40, spanDays * 2));
  }, [timeline]);

  const loadTimeline = async (targetWallet = wallet) => {
    if (!targetWallet || !isAddress(targetWallet)) return;
    if (!isContractConfigured()) { setTimeline([]); return; }
    setTimelineState('working');
    try {
      const contract = await getReadContract();
      const hashes: string[] = await contract.getProofHashesByCreator(targetWallet);
      const records = await Promise.all(hashes.map(async (hash) => {
        const proof = await contract.getProof(hash);
        return { hash, creator: proof.creator, timestamp: Number(proof.timestamp), title: proof.title, note: proof.note };
      }));
      setTimeline(records.sort((a, b) => b.timestamp - a.timestamp));
      setTimelineState('success');
    } catch { setTimelineState('error'); }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      setAnchorState('error'); setAnchorMessage(text.messages.walletMissing); return;
    }
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: BASE_SEPOLIA.chainId }] });
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      setWallet(address);
      setWalletBalance(Number(formatEther(balance)).toFixed(4));
      setNetworkOk(true);
      setAnchorMessage('');
      await loadTimeline(address);
    } catch (error: unknown) {
      if (getErrorCode(error) === 4902) {
        try {
          await window.ethereum.request({ method: 'wallet_addEthereumChain', params: [BASE_SEPOLIA] });
          await connectWallet();
        } catch {
          setAnchorState('error'); setAnchorMessage(text.messages.networkAddFailed);
        }
      } else {
        setAnchorState('error'); setAnchorMessage(text.messages.walletCancelled);
      }
    }
  };

  const selectAnchorFile = async (file: File) => {
    setAnchorState('working'); setAnchorMessage(text.messages.hashing); setAnchorFile(file);
    try {
      setAnchorHash(await fingerprintFile(file));
      setAnchorState('idle'); setAnchorMessage(text.messages.hashReady);
    } catch {
      setAnchorState('error'); setAnchorMessage(text.messages.fileUnreadable);
    }
  };

  const anchorProof = async () => {
    if (!anchorHash || !anchorFile) {
      setAnchorState('error'); setAnchorMessage(text.messages.fileRequired); return;
    }
    if (!title.trim()) {
      setAnchorState('error'); setAnchorMessage(text.messages.titleRequired); return;
    }
    if (byteLength(title.trim()) > 120) {
      setAnchorState('error'); setAnchorMessage(text.messages.titleLong); return;
    }
    if (byteLength(note.trim()) > 280) {
      setAnchorState('error'); setAnchorMessage(text.messages.noteLong); return;
    }
    if (!wallet || !networkOk) {
      setAnchorState('error'); setAnchorMessage(text.messages.walletRequired); return;
    }
    if (!isContractConfigured()) {
      setAnchorState('error'); setAnchorMessage(text.messages.contractPending); return;
    }

    setAnchorState('working'); setAnchorMessage(text.messages.confirmWallet);
    try {
      const contract = await getWriteContract();
      const transaction = await contract.anchorProof(anchorHash, title.trim(), note.trim());
      setAnchorMessage(text.messages.transactionSent);
      await transaction.wait();
      setAnchorState('success'); setAnchorMessage(text.messages.anchorSuccess);
      await loadTimeline(wallet);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : '';
      setAnchorState('error');
      setAnchorMessage(message.includes('user rejected')
        ? text.messages.transactionCancelled : text.messages.transactionFailed);
    }
  };

  const verifyFile = async (file: File) => {
    setVerifyState('working'); setVerifyMessage(text.messages.verifying); setVerifiedProof(null);
    if (!isContractConfigured()) {
      setVerifyState('error'); setVerifyMessage(text.messages.verifyPending); return;
    }
    try {
      const hash = await fingerprintFile(file);
      const contract = await getReadContract();
      const proof = await contract.getProof(hash);
      const timestamp = Number(proof.timestamp);
      if (timestamp === 0) {
        setVerifyState('error'); setVerifyMessage(text.messages.noProof); return;
      }
      setVerifiedProof({ hash, creator: proof.creator, timestamp, title: proof.title, note: proof.note });
      setVerifyState('success'); setVerifyMessage(text.messages.verifySuccess);
    } catch {
      setVerifyState('error'); setVerifyMessage(text.messages.verifyFailed);
    }
  };

  const explorerUrl = verifiedProof
    ? `${BASE_SEPOLIA.blockExplorerUrls[0]}/address/${CONTRACT_ADDRESS}` : '';

  return (
    <main>
      <nav className="nav-shell">
        <a className="brand" href="#top" aria-label="Base DeSci Proof Notebook">
          <span className="brand-mark"><Fingerprint size={22} /></span>
          <span>Proof Notebook</span><small>Base Sepolia</small>
        </a>
        <div className="nav-actions">
          <div className="language-switch" aria-label={text.languageLabel}>
            <Languages size={15} />
            <button className={language === 'zh' ? 'active' : ''} onClick={() => setLanguage('zh')}>中</button>
            <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button>
          </div>
          <span className={`contract-status ${isContractConfigured() ? 'live' : ''}`}>
            {isContractConfigured() ? text.contractLive : text.contractPending}
          </span>
          <button className="wallet-button" onClick={connectWallet}>
            <Wallet size={18} />
            {wallet ? <span className="wallet-copy"><b>{shortAddress(wallet)}</b>
              <small>{walletBalance} {text.testEth}</small></span> : text.connectWallet}
          </button>
        </div>
      </nav>

      <section id="top" className="intro">
        <div className="intro-copy"><p className="eyebrow">{text.eyebrow}</p>
          <h1>{text.headline}</h1><p className="lead">{text.lead}</p></div>
        <div className="privacy-note"><LockKeyhole size={22} />
          <span><b>{text.privacyTitle}</b><br />{text.privacyBody}</span></div>
      </section>

      <section className="flow-strip" aria-label={text.flowLabel}>
        <div><span>01</span><Fingerprint size={20} /><p><b>{text.flowLocalTitle}</b><small>{text.flowLocalBody}</small></p></div>
        <div><span>02</span><DatabaseZap size={20} /><p><b>{text.flowBaseTitle}</b><small>{text.flowBaseBody}</small></p></div>
        <div><span>03</span><ClipboardCheck size={20} /><p><b>{text.flowVerifyTitle}</b><small>{text.flowVerifyBody}</small></p></div>
      </section>

      <section className="workspace" aria-label={text.workspaceLabel}>
        <article className="panel anchor-panel">
          <div className="panel-heading"><span className="section-icon indigo"><FileKey2 size={19} /></span>
            <div><p className="eyebrow">{text.stepOne}</p><h2>{text.anchorTitle}</h2></div></div>
          <p className="helper">{text.anchorHelp}</p>
          <DropZone label={text.anchorDrop} hint={text.chooseFile} onFile={selectAnchorFile} busy={anchorState === 'working'} />
          {anchorFile && <div className="file-chip"><FileKey2 size={16} /><span>{anchorFile.name}</span>
            <small>{(anchorFile.size / 1024 / 1024).toFixed(2)} MB</small></div>}
          <label className="field-label">{text.titleLabel}<input value={title}
            onChange={(event) => setTitle(event.target.value)} maxLength={120} placeholder={text.titlePlaceholder} /></label>
          <label className="field-label">{text.noteLabel}<textarea value={note}
            onChange={(event) => setNote(event.target.value)} maxLength={280} placeholder={text.notePlaceholder} />
            <small className="field-hint">{text.noteHint} {byteLength(note)}/280 bytes</small></label>
          <div className="hash-box"><span>{text.hashLabel}</span><code>{anchorHash || text.hashEmpty}</code></div>
          <button className="primary-button" onClick={anchorProof} disabled={anchorState === 'working'}>
            <Fingerprint size={18} />{text.anchorAction}</button>
          {anchorMessage && <p className={`status ${anchorState}`} role="status" aria-live="polite">
            <Info size={16} />{anchorMessage}</p>}
        </article>

        <aside className="side-stack">
          <article className="panel verify-panel">
            <div className="panel-heading"><span className="section-icon green"><ClipboardCheck size={19} /></span>
              <div><p className="eyebrow">{text.stepTwo}</p><h2>{text.verifyTitle}</h2></div></div>
            <p className="helper">{text.verifyHelp}</p>
            <DropZone compact label={text.verifyDrop} hint={text.noWallet} onFile={verifyFile} busy={verifyState === 'working'} />
            {verifyMessage && <div className={`result ${verifyState}`} role="status" aria-live="polite">
              {verifyState === 'success' ? <CheckCircle2 size={21} />
                : verifyState === 'working' ? <LoaderCircle className="spin" size={21} /> : <ShieldAlert size={21} />}
              <span>{verifyMessage}</span></div>}
            {verifiedProof && <div className="proof-details"><b>{verifiedProof.title}</b>
              <span>{text.creator}: {shortAddress(verifiedProof.creator)}</span>
              {verifiedProof.note && <span>{text.noteLabel}: {verifiedProof.note}</span>}
              <span>{text.time}: {formatTime(verifiedProof.timestamp, language)}</span>
              {explorerUrl && <a href={explorerUrl} target="_blank" rel="noreferrer">
                <Link2 size={14} />{text.explorer}</a>}</div>}
          </article>

          <article className="panel passport-panel">
            <div className="panel-heading"><span className="section-icon coral"><History size={19} /></span>
              <div><p className="eyebrow">{text.passportEyebrow}</p><h2>{text.passportTitle}</h2></div></div>
            {!wallet ? <p className="empty">{text.passportEmpty}</p> : <>
              <div className="score-row"><div><span>{text.scoreLabel}</span><b>{passportScore}<small>/ 100</small></b></div>
                <div className="score-ring" style={{ '--score': `${passportScore}%` } as React.CSSProperties}><span>{timeline.length}</span></div></div>
              <p className="score-note">{text.scoreNote}</p>
              <button className="quiet-button" onClick={() => loadTimeline()} disabled={timelineState === 'working'}>
                {timelineState === 'working' ? text.refreshing : text.refresh}</button>
              <div className="timeline">{timeline.length === 0 ? <p className="empty">{text.noRecords}</p>
                : timeline.map((proof) => <div className="timeline-item" key={proof.hash}><i /><div><b>{proof.title}</b>
                  {proof.note && <span>{proof.note}</span>}<span>{formatTime(proof.timestamp, language)}</span><code>{proof.hash.slice(0, 18)}...</code></div></div>)}</div>
            </>}
          </article>
        </aside>
      </section>

      <section className="explainers" aria-label={text.faqEyebrow}>
        <div><p className="eyebrow">{text.faqEyebrow}</p><h2>{text.faqTitle}</h2></div>
        {text.faq.map(([question, answer], index) => <details key={question} open={index === 0}>
          <summary>{question}</summary><p>{answer}</p></details>)}
      </section>

      <footer>{text.footer}</footer>
    </main>
  );
}

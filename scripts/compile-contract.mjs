import fs from 'node:fs';
import path from 'node:path';
import solc from 'solc';

const sourcePath = path.resolve('contracts/BaseDeSciProofNotebook.sol');
const source = fs.readFileSync(sourcePath, 'utf8');
const input = {
  language: 'Solidity',
  sources: { 'BaseDeSciProofNotebook.sol': { content: source } },
  settings: {
    optimizer: { enabled: true, runs: 200 },
    outputSelection: { '*': { '*': ['abi', 'evm.bytecode.object'] } },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const errors = output.errors ?? [];
for (const item of errors) console.log(item.formattedMessage);
if (errors.some((item) => item.severity === 'error')) process.exit(1);

const contract = output.contracts['BaseDeSciProofNotebook.sol'].BaseDeSciProofNotebook;
fs.mkdirSync('artifacts', { recursive: true });
fs.writeFileSync('artifacts/BaseDeSciProofNotebook.json', JSON.stringify(contract, null, 2));
console.log('Contract compiled: artifacts/BaseDeSciProofNotebook.json');

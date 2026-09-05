import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const expectedOriginal = '98c90262d08bef2b6ad69261dc84f7931d41ade9501645fc7859f3f3d2dec602';
const expectedTampered = 'b0552b28f5f9a462134aba94b930d962094eafb94f3d7f077f94237f736eab31';
const contractAddress = '0xD505ad9d439ee159eE4Af3ad331F417C3B8A4a29';

const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const [original, tampered, contractConfig] = await Promise.all([
  readFile(new URL('../demo/battery-cycle-original.csv', import.meta.url)),
  readFile(new URL('../demo/battery-cycle-tampered.csv', import.meta.url)),
  readFile(new URL('../src/contract.ts', import.meta.url), 'utf8'),
]);

const originalHash = sha256(original);
const tamperedHash = sha256(tampered);

if (originalHash !== expectedOriginal) throw new Error(`Original hash changed: ${originalHash}`);
if (tamperedHash !== expectedTampered) throw new Error(`Tampered hash changed: ${tamperedHash}`);
if (originalHash === tamperedHash) throw new Error('Original and tampered files must not match');
if (!contractConfig.includes(contractAddress)) throw new Error('Deployed contract address is missing');

console.log('Smoke test passed');
console.log(`original=${originalHash}`);
console.log(`tampered=${tamperedHash}`);
console.log(`contract=${contractAddress}`);

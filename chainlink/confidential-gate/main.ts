import {
  CronCapability,
  Runner,
  handlerInTee,
  type TeeRuntime,
  type Workflow,
} from '@chainlink/cre-sdk';
import { keccak256, stringToHex } from 'viem';

export type GateConfig = {
  schedule: string;
  public_file_hash: string;
  policy_label: string;
  secret_id: string;
};

export type GateResult = {
  publicFileHash: string;
  policyLabel: string;
  commitment: string;
};

const DEFAULT_CONFIG: GateConfig = {
  schedule: '0 */10 * * * *',
  public_file_hash: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  policy_label: 'embargo-until-review',
  secret_id: 'research_gate_secret',
};

// This function runs inside Chainlink's TEE. It intentionally never logs or
// returns the private rule. Only the one-way commitment may leave the enclave.
export const createResearchGateCommitment = (runtime: TeeRuntime<GateConfig>): GateResult => {
  const secret = runtime.getSecrets([{ id: runtime.config.secret_id }]).result();
  const privateRule = secret[runtime.config.secret_id].value;
  const commitmentInput = [
    'desci-proof-notebook-v0.3',
    runtime.config.public_file_hash.toLowerCase(),
    runtime.config.policy_label,
    privateRule,
  ].join('|');
  const commitment = keccak256(stringToHex(commitmentInput));

  runtime.log(`confidential-gate-complete commitment=${commitment}`);
  return {
    publicFileHash: runtime.config.public_file_hash,
    policyLabel: runtime.config.policy_label,
    commitment,
  };
};

export const onCronTrigger = (runtime: TeeRuntime<GateConfig>): string => {
  const result = createResearchGateCommitment(runtime);
  return JSON.stringify(result);
};

export const initWorkflow = (config: GateConfig): Workflow<GateConfig> => {
  if (!config.schedule || !config.public_file_hash || !config.policy_label || !config.secret_id) {
    throw new Error('config requires schedule, public_file_hash, policy_label, and secret_id');
  }

  const cron = new CronCapability();
  return [
    handlerInTee(
      cron.trigger({ schedule: config.schedule }),
      onCronTrigger,
      {},
      {
        preHook: (currentConfig: GateConfig) => ({
          secrets: {
            maxSecrets: 1,
            restrictions: [
              { exactSecret: { id: currentConfig.secret_id, namespace: 'main' } },
            ],
          },
        }),
      },
    ),
  ];
};

export async function main() {
  const runner = await Runner.newRunner<GateConfig>({
    configParser: (raw: Uint8Array) => {
      const source = new TextDecoder().decode(raw).trim();
      return source ? JSON.parse(source) as GateConfig : DEFAULT_CONFIG;
    },
  });
  await runner.run(initWorkflow);
}

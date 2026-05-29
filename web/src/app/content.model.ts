/** Content contract for the dossier. Populated in content.ts. */

export interface KeyStat {
  value: string;
  label: string;
}

export interface Section {
  id: string;
  eyebrow: string;
  title: string;
  dek: string;
  body: string[];
  pullQuote: string;
  keyStats?: KeyStat[];
}

export interface RebuttalItem {
  anthropic: string;
  response: string;
  verdict: string;
}

export interface PerChip {
  name: string;
  pflopsFp4: number;
  node: string;
  vendor: string;
  year: string;
  note: string;
}

export interface SystemNode {
  name: string;
  chips: number;
  chipType: string;
  pflops: number;
  vendor: string;
  note: string;
}

export interface PowerData {
  powerRatio: number;
  perFlopRatio: number;
  note: string;
}

export interface AggregatePoint {
  year: string;
  huaweiPctOfNvidia: number;
  note: string;
}

export interface LithoRung {
  node: string;
  vendor: string;
  technique: string;
  lithoClass: string; // 'EUV' | 'DUV'
  generationsBehind: number;
}

export interface YieldBar {
  vendor: string;
  low: number;
  high: number;
}

export interface PricePoint {
  model: string;
  vendor: string;
  relativeCostIndex: number;
  note: string;
}

export interface TimelineItem {
  year: string;
  milestone: string;
  detail: string;
}

export interface FoundryEntity {
  entity: string;
  region: string;
  capability: string;
  bloc: string; // 'West/Allied' | 'PRC'
  hasEUV: boolean;
}

export interface Datasets {
  perChip: PerChip[];
  system: SystemNode[];
  power: PowerData;
  aggregate: AggregatePoint[];
  lithoLadder: LithoRung[];
  yield: YieldBar[];
  pricing: PricePoint[];
  timeline: TimelineItem[];
  foundryMap: FoundryEntity[];
}

export interface Scenario {
  id: string;
  tag: string;
  title: string;
  verdict: string;
  points: string[];
  boNote: string;
}

export interface Dossier {
  sections: Section[];
  rebuttal: RebuttalItem[];
  datasets: Datasets;
  scenarios: Scenario[];
}

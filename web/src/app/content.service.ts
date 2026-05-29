import { Injectable } from '@angular/core';
import { DOSSIER } from './content';
import type { Dossier, Section, Datasets, RebuttalItem, Scenario, YieldBar } from './content.model';

const EMPTY_SECTION: Section = {
  id: '',
  eyebrow: '',
  title: '',
  dek: '',
  body: [],
  pullQuote: '',
};

@Injectable({ providedIn: 'root' })
export class ContentService {
  readonly dossier: Dossier = DOSSIER;

  private readonly index = new Map<string, Section>(
    DOSSIER.sections.map((s) => [s.id, s] as const),
  );

  get sections(): Section[] {
    return this.dossier.sections;
  }
  get data(): Datasets {
    return this.dossier.datasets;
  }
  get rebuttal(): RebuttalItem[] {
    return this.dossier.rebuttal;
  }
  get scenarios(): Scenario[] {
    return this.dossier.scenarios;
  }
  /** `yield` is a reserved word — expose it via a safe alias for templates. */
  get yieldData(): YieldBar[] {
    return this.dossier.datasets.yield;
  }

  /** Look up a narrative section by id; never returns undefined (keeps strict templates happy). */
  get(id: string): Section {
    return this.index.get(id) ?? EMPTY_SECTION;
  }
}

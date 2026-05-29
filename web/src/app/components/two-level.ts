import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import type { PerChip, SystemNode } from '../content.model';

type Level = 'chip' | 'system';

@Component({
  selector: 'app-two-level',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure class="panel">
      <figcaption>
        <span class="panel__tag">The framework · two levels, opposite answers</span>
        <h3 class="panel__title">Change the altitude, flip the winner</h3>
        <p class="panel__cap">
          The same contest gives opposite verdicts depending on where you stand. This is the hinge
          the entire 2028 forecast turns on.
        </p>
      </figcaption>

      <div class="seg">
        <button type="button" class="seg__b" [class.on]="level() === 'chip'" (click)="level.set('chip')">
          Level 1 · The Chip
        </button>
        <button type="button" class="seg__b" [class.on]="level() === 'system'" (click)="level.set('system')">
          Level 2 · The System
        </button>
      </div>

      <div class="duel">
        <div class="side side--nv" [class.win]="level() === 'chip'">
          @if (level() === 'chip') { <span class="win__b mono">WINS</span> }
          <span class="side__name">Nvidia</span>
          <span class="side__metric">{{ level() === 'chip' ? '~50 PF' : '180 PF' }}</span>
          <span class="side__sub mono">{{ level() === 'chip' ? 'Rubin, per chip (FP4)' : 'GB200 NVL72, aggregate' }}</span>
        </div>

        <div class="vs mono">vs</div>

        <div class="side side--hw" [class.win]="level() === 'system'">
          @if (level() === 'system') { <span class="win__b mono">WINS</span> }
          <span class="side__name">Huawei</span>
          <span class="side__metric">{{ level() === 'chip' ? '~2 PF' : '300 PF' }}</span>
          <span class="side__sub mono">{{ level() === 'chip' ? 'Ascend 950, per chip (FP4)' : 'CloudMatrix 384, aggregate' }}</span>
        </div>
      </div>

      <p class="verdict" [class.verdict--hw]="level() === 'system'">
        @if (level() === 'chip') {
          On the die, Nvidia wins by <strong>~{{ chipRatio() }}×</strong>. Manufacturing is destiny — SMIC’s DUV ~7nm cannot touch TSMC’s 3nm.
        } @else {
          On the datacenter, Huawei wins <strong>{{ sysHw() }} to {{ sysNv() }} PF</strong> — by stacking 5× the silicon and paying in power. The unit of competition moved.
        }
      </p>
      <p class="panel__foot">
        Scenario 1 is the world where Level 1 decides. Scenario 2 is the world where Level 2 does.
        Export controls push the contest toward Level 2 — the axis where China is least constrained.
      </p>
    </figure>
  `,
  styles: [
    `
      :host { display: block; }
      .seg { display: inline-flex; gap: 0.4rem; padding: 0.3rem; border: 1px solid var(--line); border-radius: 999px; margin: 1.4rem 0; }
      .seg__b { padding: 0.5rem 1.1rem; border-radius: 999px; font-family: var(--font-mono); font-size: 0.74rem; color: var(--muted); transition: background 0.25s, color 0.25s; }
      .seg__b.on { background: var(--ink); color: var(--bg); font-weight: 600; }
      .duel { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 1rem; margin: 0.6rem 0 1.4rem; }
      .side {
        position: relative;
        border: 1px solid var(--line);
        border-radius: var(--radius-sm);
        padding: 1.4rem 1.1rem;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        transition: border-color 0.35s var(--ease), background 0.35s, transform 0.35s var(--ease), opacity 0.35s;
        opacity: 0.55;
      }
      .side.win { opacity: 1; transform: translateY(-4px); }
      .side--nv.win { border-color: var(--nvidia); background: rgba(118, 224, 123, 0.06); box-shadow: 0 14px 40px -20px rgba(118, 224, 123, 0.5); }
      .side--hw.win { border-color: var(--huawei); background: rgba(255, 93, 99, 0.06); box-shadow: 0 14px 40px -20px rgba(255, 93, 99, 0.5); }
      .win__b {
        position: absolute;
        top: -0.7rem;
        left: 1.1rem;
        font-size: 0.6rem;
        letter-spacing: 0.2em;
        padding: 0.2rem 0.55rem;
        border-radius: 999px;
        background: var(--bg);
        border: 1px solid currentColor;
      }
      .side--nv .win__b { color: var(--nvidia); }
      .side--hw .win__b { color: var(--huawei); }
      .side__name { font-family: var(--font-display); font-weight: 600; font-size: 1.15rem; }
      .side--nv .side__name { color: var(--nvidia); }
      .side--hw .side__name { color: var(--huawei); }
      .side__metric { font-family: var(--font-display); font-weight: 700; font-size: 2.2rem; letter-spacing: -0.02em; line-height: 1; }
      .side__sub { font-size: 0.66rem; color: var(--faint); }
      .vs { color: var(--faint); font-size: 0.8rem; letter-spacing: 0.2em; }
      .verdict {
        font-family: var(--font-serif);
        font-size: 1.1rem;
        line-height: 1.5;
        color: var(--ink-dim);
        padding: 1rem 1.1rem;
        border-left: 2px solid var(--nvidia);
        background: rgba(118, 224, 123, 0.04);
        border-radius: 0 6px 6px 0;
        transition: border-color 0.3s, background 0.3s;
      }
      .verdict strong { color: var(--nvidia); font-weight: 600; }
      .verdict--hw { border-left-color: var(--huawei); background: rgba(255, 93, 99, 0.04); }
      .verdict--hw strong { color: var(--huawei); }
      @media (max-width: 560px) {
        .duel { grid-template-columns: 1fr; }
        .vs { display: none; }
        .side__metric { font-size: 1.8rem; }
      }
    `,
  ],
})
export class TwoLevel {
  readonly perChip = input.required<PerChip[]>();
  readonly system = input.required<SystemNode[]>();
  protected readonly level = signal<Level>('chip');

  private nv = (s: { vendor: string }) => /nvidia/i.test(s.vendor);

  protected chipRatio = computed(() => {
    const nvMax = Math.max(...this.perChip().filter(this.nv).map((c) => c.pflopsFp4), 0);
    const hwMin = Math.min(
      ...this.perChip().filter((c) => !this.nv(c)).map((c) => c.pflopsFp4).filter((v) => v > 0),
    );
    return hwMin > 0 ? Math.round(nvMax / hwMin) : 0;
  });
  protected sysHw = computed(() => {
    const hw = this.system().filter((s) => !this.nv(s));
    return hw.length ? Math.max(...hw.map((s) => s.pflops)) : 0;
  });
  protected sysNv = computed(() => {
    const nv = this.system().filter((s) => this.nv(s));
    return nv.length ? Math.max(...nv.map((s) => s.pflops)) : 0;
  });
}

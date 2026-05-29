import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CountUp } from '../shared/count-up';
import { whenVisible } from '../shared/in-view';
import type { SystemNode } from '../content.model';

@Component({
  selector: 'app-system-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountUp],
  template: `
    <figure class="panel">
      <figcaption>
        <span class="panel__tag">Level 2 · System · aggregate PFLOPS</span>
        <h3 class="panel__title">The system inverts the answer</h3>
        <p class="panel__cap">
          One rack-scale node, each side. Huawei stacks 5× the silicon to beat Nvidia’s rack on
          aggregate FLOPS — the unit of competition moves from the die to the datacenter.
        </p>
      </figcaption>

      <div class="grid2">
        @for (s of ordered(); track s.name) {
          <div class="sys" [class.sys--nv]="isNv(s)">
            <div class="sys__hd">
              <span class="sys__name">{{ s.name }}</span>
              <span class="sys__chip mono">{{ s.chipType }}</span>
            </div>

            <div class="dots" [class.dots--in]="vis()">
              @for (d of dotsFor(s); track d) {
                <i></i>
              }
            </div>

            <div class="sys__nums">
              <div class="num">
                <span class="num__v mono"><app-count [to]="s.chips" /></span>
                <span class="num__l mono">chips</span>
              </div>
              <div class="num num--big">
                <span class="num__v"><app-count [to]="s.pflops" [suffix]="' PF'" /></span>
                <span class="num__l mono">aggregate</span>
              </div>
            </div>

            <div class="pf">
              <div class="pf__fill" [style.width.%]="vis() ? pfPct(s) : 0"></div>
            </div>
          </div>
        }
      </div>

      <p class="panel__foot">
        CloudMatrix 384: 384 × Ascend 910C, fully optical all-to-all fabric (6,912 transceivers) →
        ~300 PF &amp; ~3.6× the aggregate memory. GB200 NVL72: 72 × B200 on copper NVLink → ~180 PF,
        far denser per chip. The catch — power — is the next panel.
      </p>
    </figure>
  `,
  styles: [
    `
      :host { display: block; }
      .grid2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-top: 1.4rem;
      }
      @media (max-width: 620px) { .grid2 { grid-template-columns: 1fr; } }
      .sys {
        border: 1px solid var(--line);
        border-radius: var(--radius-sm);
        padding: 1.1rem;
        background: rgba(255, 93, 99, 0.04);
      }
      .sys--nv { background: rgba(118, 224, 123, 0.05); }
      .sys__hd { display: flex; flex-direction: column; gap: 0.2rem; margin-bottom: 0.9rem; }
      .sys__name { font-family: var(--font-display); font-weight: 600; font-size: 1.05rem; }
      .sys__chip { font-size: 0.68rem; color: var(--faint); }
      .dots {
        display: grid;
        grid-template-columns: repeat(24, 1fr);
        gap: 3px;
        opacity: 0;
        transform: translateY(8px);
        transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
        min-height: 1.5rem;
        align-content: start;
      }
      .dots--in { opacity: 1; transform: none; }
      .dots i {
        aspect-ratio: 1;
        border-radius: 50%;
        background: var(--huawei);
        opacity: 0.85;
      }
      .sys--nv .dots i { background: var(--nvidia); }
      .dots i:nth-child(3n) { opacity: 0.55; }
      .sys__nums { display: flex; align-items: flex-end; gap: 1.4rem; margin: 1rem 0 0.7rem; }
      .num { display: flex; flex-direction: column; }
      .num__v { font-family: var(--font-display); font-weight: 700; font-size: 1.2rem; color: var(--ink); }
      .num--big .num__v { font-size: 2rem; letter-spacing: -0.02em; }
      .sys:not(.sys--nv) .num--big .num__v { color: var(--huawei); }
      .sys--nv .num--big .num__v { color: var(--nvidia); }
      .num__l { font-size: 0.62rem; color: var(--faint); text-transform: uppercase; letter-spacing: 0.18em; margin-top: 0.15rem; }
      .pf { height: 7px; background: rgba(255, 255, 255, 0.05); border-radius: 999px; overflow: hidden; }
      .pf__fill { height: 100%; width: 0; background: var(--huawei); transition: width 1.2s var(--ease) 0.3s; }
      .sys--nv .pf__fill { background: var(--nvidia); }
    `,
  ],
})
export class SystemChart {
  readonly data = input.required<SystemNode[]>();
  protected readonly vis = whenVisible();

  private maxPf = computed(() => Math.max(...this.data().map((s) => s.pflops), 1));
  // Huawei first (the surprising winner), Nvidia second.
  protected ordered = computed(() => [...this.data()].sort((a, b) => b.chips - a.chips));

  protected isNv(s: SystemNode): boolean {
    return /nvidia/i.test(s.vendor);
  }
  protected pfPct(s: SystemNode): number {
    return (s.pflops / this.maxPf()) * 100;
  }
  /** One dot per real chip — the 384-vs-72 mass contrast is the point. */
  protected dotsFor(s: SystemNode): number[] {
    return Array.from({ length: s.chips }, (_, i) => i);
  }
}

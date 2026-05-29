import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CountUp } from '../shared/count-up';
import { whenVisible } from '../shared/in-view';
import type { PerChip } from '../content.model';

@Component({
  selector: 'app-per-chip-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountUp],
  template: `
    <figure class="panel">
      <figcaption>
        <span class="panel__tag">Level 1 · Per-chip · FP4 PFLOPS</span>
        <h3 class="panel__title">Nvidia wins the silicon — and it isn’t close</h3>
        <p class="panel__cap">
          Peak FP4 throughput, per accelerator. The chip-level gap is real and widening.
        </p>
      </figcaption>

      <div class="ratio">
        <span class="ratio__x"><app-count [to]="ratio()" [suffix]="'×'" /></span>
        <span class="ratio__l mono">Rubin vs Ascend 950, per chip</span>
      </div>

      <div class="bars">
        @for (c of data(); track c.name; let i = $index) {
          <div class="bar" [class.bar--nv]="isNv(c)">
            <div class="bar__meta">
              <span class="bar__name">{{ c.name }}</span>
              <span class="bar__node mono">{{ c.node }} · {{ c.year }}</span>
            </div>
            <div class="bar__track">
              <div
                class="bar__fill"
                [style.width.%]="vis() ? pct(c) : 0"
                [style.transition-delay.ms]="120 + i * 110"
              ></div>
            </div>
            <div class="bar__val mono"><app-count [to]="c.pflopsFp4" [decimals]="0" /></div>
          </div>
        }
      </div>

      <div class="legend">
        <span><i style="background:var(--nvidia)"></i> Nvidia (TSMC, EUV)</span>
        <span><i style="background:var(--huawei)"></i> Huawei Ascend (SMIC, DUV)</span>
      </div>
      <p class="panel__foot">
        FP4 peak, single accelerator. Ascend 950 ≈ 2 PF (1.56 PF MXFP4 in some sources) vs Rubin ≈ 50 PF.
        Bo concedes the silicon gap in full — the argument turns on the next level.
      </p>
    </figure>
  `,
  styles: [
    `
      :host { display: block; }
      figcaption { margin-bottom: 0.4rem; }
      .ratio {
        display: flex;
        align-items: baseline;
        gap: 0.9rem;
        margin: 1.2rem 0 1.6rem;
      }
      .ratio__x {
        font-family: var(--font-display);
        font-weight: 700;
        font-size: clamp(2.6rem, 1.6rem + 5vw, 5rem);
        line-height: 1;
        color: var(--nvidia);
        letter-spacing: -0.03em;
        text-shadow: 0 0 40px rgba(118, 224, 123, 0.25);
      }
      .ratio__l { font-size: 0.78rem; color: var(--muted); max-width: 14rem; }
      .bars { display: grid; gap: 0.85rem; }
      .bar {
        display: grid;
        grid-template-columns: minmax(8rem, 13rem) 1fr 3rem;
        align-items: center;
        gap: 0.7rem 1rem;
      }
      .bar__meta { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
      .bar__name { font-family: var(--font-display); font-weight: 600; font-size: 0.95rem; }
      .bar__node { font-size: 0.64rem; color: var(--faint); }
      .bar__track {
        height: 18px;
        background: rgba(255, 255, 255, 0.04);
        border-radius: 4px;
        overflow: hidden;
        position: relative;
      }
      .bar__fill {
        height: 100%;
        width: 0;
        border-radius: 4px;
        background: linear-gradient(90deg, var(--huawei-dim), var(--huawei));
        transition: width 1.1s var(--ease);
      }
      .bar--nv .bar__fill {
        background: linear-gradient(90deg, var(--nvidia-dim), var(--nvidia));
      }
      .bar__val {
        font-weight: 600;
        font-size: 1rem;
        text-align: right;
        color: var(--ink);
      }
      .bar--nv .bar__val { color: var(--nvidia); }
      .bar:not(.bar--nv) .bar__val { color: var(--huawei); }
      @media (max-width: 560px) {
        .bar { grid-template-columns: 1fr 2.4rem; grid-template-areas: 'meta val' 'track track'; }
        .bar__meta { grid-area: meta; }
        .bar__val { grid-area: val; }
        .bar__track { grid-area: track; }
      }
    `,
  ],
})
export class PerChipChart {
  readonly data = input.required<PerChip[]>();
  protected readonly vis = whenVisible();

  private max = computed(() => Math.max(...this.data().map((c) => c.pflopsFp4), 1));
  protected pct(c: PerChip): number {
    return (c.pflopsFp4 / this.max()) * 100;
  }
  protected isNv(c: PerChip): boolean {
    return /nvidia/i.test(c.vendor);
  }
  protected ratio = computed(() => {
    const nv = Math.max(...this.data().filter((c) => this.isNv(c)).map((c) => c.pflopsFp4), 0);
    const hw = Math.min(
      ...this.data()
        .filter((c) => !this.isNv(c))
        .map((c) => c.pflopsFp4)
        .filter((v) => v > 0),
    );
    return hw > 0 ? Math.round(nv / hw) : 0;
  });
}

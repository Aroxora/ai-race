import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CountUp } from '../shared/count-up';
import { whenVisible } from '../shared/in-view';
import type { PricePoint } from '../content.model';

@Component({
  selector: 'app-pricing-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountUp],
  template: `
    <figure class="panel">
      <figcaption>
        <span class="panel__tag">Inference economics · relative cost / token</span>
        <h3 class="panel__title">Catching up on cost is the tell</h3>
        <p class="panel__cap">
          Illustrative cost-per-token, indexed to DeepSeek-V4-Pro = 1. The constraint did not cap
          China — it disciplined China into the efficiency that wins the cost-sensitive world.
        </p>
      </figcaption>

      <div class="bars">
        @for (p of data(); track p.model; let i = $index) {
          <div class="row" [class.row--cheap]="p.relativeCostIndex <= 1">
            <div class="row__meta">
              <span class="row__model">{{ p.model }}</span>
              <span class="row__vendor mono">{{ p.vendor }}</span>
            </div>
            <div class="row__track">
              <div class="row__fill" [style.width.%]="vis() ? pct(p) : 0" [style.transition-delay.ms]="200 + i * 150"></div>
            </div>
            <div class="row__x mono"><app-count [to]="p.relativeCostIndex" [decimals]="0" [suffix]="'×'" /></div>
          </div>
        }
      </div>

      <div class="callout">
        <span class="callout__big">~90%</span>
        <span class="callout__l mono">cheaper than US frontier, on Ascend silicon — near-frontier intelligence, immune to export controls</span>
      </div>
      <p class="panel__foot">
        Illustrative of the cost gap, not official prices. DeepSeek reported R1-on-CloudMatrix at
        ~90% below H100 economics; V4 was co-designed for Ascend.
      </p>
    </figure>
  `,
  styles: [
    `
      :host { display: block; }
      .bars { display: grid; gap: 1rem; margin-top: 1.5rem; }
      .row { display: grid; grid-template-columns: minmax(8rem, 12rem) 1fr 3.2rem; align-items: center; gap: 0.9rem; }
      .row__meta { display: flex; flex-direction: column; gap: 0.1rem; }
      .row__model { font-family: var(--font-display); font-weight: 600; font-size: 0.96rem; }
      .row__vendor { font-size: 0.64rem; color: var(--faint); }
      .row__track { height: 20px; background: rgba(255, 255, 255, 0.04); border-radius: 5px; overflow: hidden; }
      .row__fill {
        height: 100%;
        width: 0;
        background: linear-gradient(90deg, var(--cyan-dim), var(--cyan));
        transition: width 1.1s var(--ease);
        border-radius: 5px;
      }
      .row--cheap .row__fill { background: linear-gradient(90deg, var(--huawei-dim), var(--huawei)); }
      .row__x { text-align: right; font-weight: 600; color: var(--cyan); }
      .row--cheap .row__x { color: var(--huawei); }
      .callout {
        display: flex;
        align-items: center;
        gap: 1.1rem;
        margin-top: 1.6rem;
        padding: 1.1rem 1.2rem;
        border: 1px solid rgba(255, 93, 99, 0.3);
        border-radius: var(--radius-sm);
        background: rgba(255, 93, 99, 0.06);
      }
      .callout__big { font-family: var(--font-display); font-weight: 700; font-size: 2.4rem; color: var(--huawei); line-height: 1; letter-spacing: -0.02em; }
      .callout__l { font-size: 0.74rem; color: var(--ink-dim); line-height: 1.5; }
      @media (max-width: 540px) {
        .row { grid-template-columns: 1fr 2.8rem; grid-template-areas: 'm x' 't t'; }
        .row__meta { grid-area: m; }
        .row__x { grid-area: x; }
        .row__track { grid-area: t; }
      }
    `,
  ],
})
export class PricingChart {
  readonly data = input.required<PricePoint[]>();
  protected readonly vis = whenVisible();
  private max = computed(() => Math.max(...this.data().map((p) => p.relativeCostIndex), 1));
  protected pct(p: PricePoint): number {
    return Math.max(4, (p.relativeCostIndex / this.max()) * 100);
  }
}

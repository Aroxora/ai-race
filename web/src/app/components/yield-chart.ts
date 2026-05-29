import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { whenVisible } from '../shared/in-view';
import type { YieldBar } from '../content.model';

@Component({
  selector: 'app-yield-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure class="panel">
      <figcaption>
        <span class="panel__tag">Yield · good die per wafer</span>
        <h3 class="panel__title">Every extra mask costs a die</h3>
        <p class="panel__cap">
          DUV multi-patterning means more steps, more overlay error, more defects — so SMIC’s ~7nm
          yields land far below TSMC’s comparable parts.
        </p>
      </figcaption>

      <div class="rows">
        @for (y of data(); track y.vendor; let i = $index) {
          <div class="row" [class.row--good]="y.high >= 75">
            <span class="row__name mono">{{ y.vendor }}</span>
            <div class="row__track">
              <div
                class="row__band"
                [style.left.%]="y.low"
                [style.width.%]="vis() ? y.high - y.low : 0"
                [style.transition-delay.ms]="200 + i * 160"
              ></div>
              @for (t of ticks; track t) {
                <span class="row__tick" [style.left.%]="t"></span>
              }
            </div>
            <span class="row__val mono">{{ y.low }}–{{ y.high }}%</span>
          </div>
        }
      </div>
      <div class="scale mono"><span>0%</span><span>50%</span><span>100%</span></div>
      <p class="panel__foot">
        Estimated yield on comparable advanced parts. Below ~60%, cost-per-good-die climbs steeply —
        and 5nm/3nm without EUV pushes the multi-patterning step count past the point of economic sense.
      </p>
    </figure>
  `,
  styles: [
    `
      :host { display: block; }
      .rows { display: grid; gap: 1.1rem; margin-top: 1.4rem; }
      .row { display: grid; grid-template-columns: minmax(8rem, 14rem) 1fr 5rem; align-items: center; gap: 1rem; }
      .row__name { font-size: 0.74rem; color: var(--huawei); }
      .row--good .row__name { color: var(--nvidia); }
      .row__track { position: relative; height: 22px; background: rgba(255, 255, 255, 0.04); border-radius: 5px; overflow: hidden; }
      .row__band {
        position: absolute;
        top: 0; bottom: 0;
        background: linear-gradient(90deg, var(--huawei-dim), var(--huawei));
        border-radius: 5px;
        width: 0;
        transition: width 1.1s var(--ease);
      }
      .row--good .row__band { background: linear-gradient(90deg, var(--nvidia-dim), var(--nvidia)); }
      .row__tick { position: absolute; top: 0; bottom: 0; width: 1px; background: rgba(255, 255, 255, 0.07); }
      .row__val { font-size: 0.82rem; text-align: right; color: var(--ink-dim); }
      .scale { display: flex; justify-content: space-between; font-size: 0.64rem; color: var(--faint); margin-top: 0.5rem; padding-left: 0; }
      @media (max-width: 540px) {
        .row { grid-template-columns: 1fr 4.5rem; grid-template-areas: 'n v' 't t'; }
        .row__name { grid-area: n; }
        .row__val { grid-area: v; }
        .row__track { grid-area: t; }
      }
    `,
  ],
})
export class YieldChart {
  readonly data = input.required<YieldBar[]>();
  protected readonly vis = whenVisible();
  protected readonly ticks = [25, 50, 75];
}

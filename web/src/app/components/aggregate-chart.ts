import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { CountUp } from '../shared/count-up';
import { whenVisible } from '../shared/in-view';
import type { AggregatePoint } from '../content.model';

@Component({
  selector: 'app-aggregate-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountUp],
  template: `
    <figure class="panel">
      <figcaption>
        <span class="panel__tag">Aggregate compute · Huawei as % of Nvidia</span>
        <h3 class="panel__title">The number Anthropic trusts — at the wrong altitude</h3>
        <p class="panel__cap">
          The pro-control case leans on this falling share. Hover a year: it measures the chip/fab
          layer the CloudMatrix system is explicitly engineered to route around.
        </p>
      </figcaption>

      <div class="cols">
        @for (p of data(); track p.year; let i = $index) {
          <button
            type="button"
            class="col"
            [class.col--on]="active() === i"
            (mouseenter)="active.set(i)"
            (focus)="active.set(i)"
          >
            <div class="col__barwrap">
              <div class="col__bar" [style.height.%]="vis() ? barPct(p) : 0" [style.transition-delay.ms]="200 + i * 140">
                <span class="col__v mono"><app-count [to]="p.huaweiPctOfNvidia" [suffix]="'%'" /></span>
              </div>
            </div>
            <span class="col__yr mono">{{ p.year }}</span>
          </button>
        }
      </div>

      <div class="note">
        <span class="note__yr mono">{{ data()[active()].year }}</span>
        <p>{{ data()[active()].note }}</p>
      </div>
    </figure>
  `,
  styles: [
    `
      :host { display: block; }
      .cols { display: flex; align-items: flex-end; gap: 1.2rem; height: 220px; margin: 1.6rem 0 0.4rem; padding: 0 0.5rem; }
      .col { flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; gap: 0.5rem; }
      .col__barwrap { flex: 1; width: 100%; display: flex; align-items: flex-end; justify-content: center; }
      .col__bar {
        width: 100%;
        max-width: 92px;
        height: 0;
        background: linear-gradient(180deg, var(--huawei), var(--huawei-dim));
        border-radius: 6px 6px 0 0;
        position: relative;
        transition: height 1.1s var(--ease), filter 0.25s, box-shadow 0.25s;
        min-height: 3px;
      }
      .col--on .col__bar { filter: brightness(1.2); box-shadow: 0 0 26px rgba(255, 93, 99, 0.35); }
      .col__v { position: absolute; top: -1.5rem; left: 50%; transform: translateX(-50%); font-size: 0.9rem; font-weight: 600; color: var(--huawei); }
      .col__yr { font-size: 0.78rem; color: var(--muted); }
      .col--on .col__yr { color: var(--ink); }
      .note { display: grid; grid-template-columns: auto 1fr; gap: 1rem; align-items: start; margin-top: 1.3rem; padding-top: 1rem; border-top: 1px dashed var(--line); }
      .note__yr { font-size: 1.4rem; font-weight: 600; color: var(--gold); font-family: var(--font-display); }
      .note p { font-family: var(--font-mono); font-size: 0.74rem; line-height: 1.6; color: var(--muted); }
    `,
  ],
})
export class AggregateChart {
  readonly data = input.required<AggregatePoint[]>();
  protected readonly vis = whenVisible();
  protected readonly active = signal(0);
  private max = computed(() => Math.max(...this.data().map((p) => p.huaweiPctOfNvidia), 1));
  protected barPct(p: AggregatePoint): number {
    return (p.huaweiPctOfNvidia / this.max()) * 100;
  }
}

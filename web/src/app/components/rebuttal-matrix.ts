import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import type { RebuttalItem } from '../content.model';

@Component({
  selector: 'app-rebuttal-matrix',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure class="panel">
      <figcaption>
        <span class="panel__tag">The disagreement · point by point</span>
        <h3 class="panel__title">Answering Anthropic</h3>
        <p class="panel__cap">
          Their claim, stated fairly — then the rebuttal, and a verdict. Click any row to open it.
        </p>
      </figcaption>

      <div class="rows">
        @for (r of data(); track r.anthropic; let i = $index) {
          <div class="rb" [class.rb--open]="open() === i">
            <button type="button" class="rb__hd" (click)="toggle(i)" [attr.aria-expanded]="open() === i">
              <span class="rb__num mono">{{ pad(i + 1) }}</span>
              <span class="rb__claim">{{ r.anthropic }}</span>
              <span class="rb__verdict mono">{{ r.verdict }}</span>
              <span class="rb__chev" aria-hidden="true">+</span>
            </button>
            <div class="rb__body">
              <div class="rb__inner">
                <span class="rb__label mono">Bo Shang →</span>
                <p>{{ r.response }}</p>
              </div>
            </div>
          </div>
        }
      </div>
    </figure>
  `,
  styles: [
    `
      :host { display: block; }
      .rows { display: grid; gap: 0.5rem; margin-top: 1.4rem; }
      .rb { border: 1px solid var(--line); border-radius: var(--radius-sm); overflow: hidden; background: rgba(255, 255, 255, 0.015); transition: border-color 0.25s; }
      .rb--open { border-color: var(--huawei); }
      .rb__hd {
        width: 100%;
        display: grid;
        grid-template-columns: 2rem 1fr auto 1.4rem;
        align-items: center;
        gap: 0.9rem;
        padding: 0.95rem 1.1rem;
        text-align: left;
      }
      .rb__num { font-size: 0.72rem; color: var(--faint); }
      .rb__claim { font-family: var(--font-serif); font-size: 0.98rem; color: var(--ink-dim); line-height: 1.4; }
      .rb--open .rb__claim { color: var(--ink); }
      .rb__verdict {
        font-size: 0.62rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--huawei);
        padding: 0.2rem 0.6rem;
        border: 1px solid rgba(255, 93, 99, 0.3);
        border-radius: 999px;
        white-space: nowrap;
      }
      .rb__chev { font-family: var(--font-display); font-size: 1.3rem; color: var(--faint); transition: transform 0.3s var(--ease); line-height: 1; }
      .rb--open .rb__chev { transform: rotate(45deg); color: var(--huawei); }
      .rb__body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.35s var(--ease); }
      .rb--open .rb__body { grid-template-rows: 1fr; }
      .rb__inner { overflow: hidden; }
      .rb__inner > * { margin: 0 1.1rem; }
      .rb__label { display: block; font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); padding-top: 0.2rem; }
      .rb__inner p {
        font-family: var(--font-serif);
        font-size: 1rem;
        line-height: 1.6;
        color: var(--ink-dim);
        padding: 0.5rem 0 1.1rem;
        max-width: 46rem;
      }
      @media (max-width: 600px) {
        .rb__hd { grid-template-columns: 1.6rem 1fr 1.2rem; row-gap: 0.5rem; }
        .rb__verdict { grid-column: 2 / 4; justify-self: start; }
      }
    `,
  ],
})
export class RebuttalMatrix {
  readonly data = input.required<RebuttalItem[]>();
  protected readonly open = signal(0);
  protected toggle(i: number): void {
    this.open.update((cur) => (cur === i ? -1 : i));
  }
  protected pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}

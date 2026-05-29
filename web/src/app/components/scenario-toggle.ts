import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import type { Scenario } from '../content.model';

@Component({
  selector: 'app-scenario-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure class="panel">
      <figcaption>
        <span class="panel__tag">Anthropic’s 2028 · two scenarios</span>
        <h3 class="panel__title">The fork — and what our policy does to it</h3>
        <p class="panel__cap">
          Anthropic frames 2028 as a choice between two worlds. Bo’s claim: the policy prescribed to
          secure the first is the surest way to deliver the second. Toggle them.
        </p>
      </figcaption>

      <div class="seg" role="tablist">
        @for (s of data(); track s.id; let i = $index) {
          <button
            type="button"
            role="tab"
            class="seg__b"
            [class.seg__b--on]="sel() === i"
            [class.seg__b--s2]="i === 1"
            [attr.aria-selected]="sel() === i"
            (click)="sel.set(i)"
          >
            <span class="seg__tag mono">{{ s.tag }}</span>
            <span class="seg__verdict mono">{{ s.verdict }}</span>
          </button>
        }
      </div>

      @if (current(); as s) {
        <div class="card" [class.card--s2]="sel() === 1" [attr.data-k]="s.id">
          <h4 class="card__title">{{ s.title }}</h4>
          <ul class="card__points">
            @for (p of s.points; track p) {
              <li>{{ p }}</li>
            }
          </ul>
          <div class="bo">
            <span class="bo__tag mono">Bo Shang</span>
            <p>{{ s.boNote }}</p>
          </div>
        </div>
      }
    </figure>
  `,
  styles: [
    `
      :host { display: block; }
      .seg { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin: 1.5rem 0 1.2rem; }
      .seg__b {
        text-align: left;
        padding: 0.85rem 1rem;
        border: 1px solid var(--line);
        border-radius: var(--radius-sm);
        background: rgba(255, 255, 255, 0.02);
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        transition: border-color 0.2s, background 0.2s, transform 0.2s;
      }
      .seg__b:hover { transform: translateY(-2px); }
      .seg__tag { font-size: 0.82rem; font-weight: 600; color: var(--ink-dim); letter-spacing: 0.04em; }
      .seg__verdict { font-size: 0.64rem; color: var(--faint); text-transform: uppercase; letter-spacing: 0.14em; }
      .seg__b--on { border-color: var(--cyan); background: rgba(65, 230, 255, 0.07); }
      .seg__b--on .seg__tag { color: var(--cyan); }
      .seg__b--on.seg__b--s2 { border-color: var(--huawei); background: rgba(255, 93, 99, 0.07); }
      .seg__b--on.seg__b--s2 .seg__tag { color: var(--huawei); }
      .card {
        border: 1px solid rgba(65, 230, 255, 0.2);
        border-radius: var(--radius-sm);
        padding: 1.3rem;
        background: rgba(65, 230, 255, 0.03);
        animation: fade 0.45s var(--ease);
      }
      .card--s2 { border-color: rgba(255, 93, 99, 0.22); background: rgba(255, 93, 99, 0.03); }
      .card__title { font-family: var(--font-display); font-weight: 600; font-size: 1.35rem; margin-bottom: 0.9rem; }
      .card__points { list-style: none; padding: 0; margin: 0 0 1.2rem; display: grid; gap: 0.6rem; }
      .card__points li {
        position: relative;
        padding-left: 1.5rem;
        font-family: var(--font-mono);
        font-size: 0.8rem;
        line-height: 1.5;
        color: var(--ink-dim);
      }
      .card__points li::before {
        content: "→";
        position: absolute;
        left: 0;
        color: var(--cyan);
      }
      .card--s2 .card__points li::before { color: var(--huawei); }
      .bo {
        border-left: 2px solid var(--gold);
        padding: 0.3rem 0 0.3rem 1rem;
        background: rgba(255, 209, 102, 0.04);
      }
      .bo__tag {
        font-size: 0.6rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--gold);
        display: block;
        margin-bottom: 0.3rem;
      }
      .bo p { font-family: var(--font-serif); font-style: italic; font-size: 1rem; line-height: 1.5; color: var(--ink); }
      @keyframes fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
      @media (max-width: 460px) { .seg { grid-template-columns: 1fr; } }
    `,
  ],
})
export class ScenarioToggle {
  readonly data = input.required<Scenario[]>();
  protected readonly sel = signal(0);
  protected readonly current = computed(() => this.data()[this.sel()]);
}

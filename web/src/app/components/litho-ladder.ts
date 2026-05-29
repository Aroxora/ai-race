import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RevealDirective } from '../shared/in-view';
import type { LithoRung } from '../content.model';

@Component({
  selector: 'app-litho-ladder',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <figure class="panel">
      <figcaption>
        <span class="panel__tag">The chokepoint · the lithography ladder</span>
        <h3 class="panel__title">One wall, made of one machine</h3>
        <p class="panel__cap">
          The single chokepoint is EUV — and exactly one company on earth, ASML, makes the scanner.
          Above the wall: the allied frontier. Below it: where SMIC is confined.
        </p>
      </figcaption>

      <div class="ladder">
        <div class="grp grp--euv">
          <span class="grp__h mono">EUV — Taiwan / Western axis</span>
          @for (r of euv(); track r.node + r.vendor) {
            <div class="rung rung--euv" appReveal>
              <span class="rung__node">{{ r.node }}</span>
              <span class="rung__vendor mono">{{ r.vendor }}</span>
              <span class="rung__tech mono">{{ r.technique }}</span>
              <span class="rung__badge rung__badge--euv mono">EUV</span>
            </div>
          }
        </div>

        <div class="wall" appReveal>
          <span class="wall__t mono">▲ EUV WALL · ASML export control · 13.5nm λ, 0.33 NA</span>
          <span class="wall__s mono">~9 EUV steps vs ~34 DUV steps to pattern a 7nm layer</span>
        </div>

        <div class="grp grp--duv">
          <span class="grp__h mono">DUV only — PRC mainland (SMIC)</span>
          @for (r of duv(); track r.node + r.vendor) {
            <div class="rung rung--duv" appReveal>
              <span class="rung__node">{{ r.node }}</span>
              <span class="rung__vendor mono">{{ r.vendor }}</span>
              <span class="rung__tech mono">{{ r.technique }}</span>
              @if (r.generationsBehind > 0) {
                <span class="rung__badge rung__badge--gen mono">−{{ r.generationsBehind }} gen</span>
              } @else {
                <span class="rung__badge rung__badge--duv mono">DUV</span>
              }
            </div>
          }
        </div>
      </div>
      <p class="panel__foot">
        SMIC reaches ~7nm (N+2) by brute-forcing DUV multi-patterning — at ~50–60% yield. 5nm/3nm
        without EUV is not an engineering problem; it is an economic impossibility. For now.
      </p>
    </figure>
  `,
  styles: [
    `
      :host { display: block; }
      .ladder { margin-top: 1.4rem; }
      .grp__h {
        display: block;
        font-size: 0.64rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        margin-bottom: 0.6rem;
      }
      .grp--euv .grp__h { color: var(--cyan); }
      .grp--duv .grp__h { color: var(--huawei); }
      .rung {
        display: grid;
        grid-template-columns: 5.5rem minmax(6rem, 9rem) 1fr auto;
        align-items: center;
        gap: 0.8rem;
        padding: 0.6rem 0.9rem;
        border: 1px solid var(--line);
        border-left-width: 3px;
        border-radius: 6px;
        margin-bottom: 0.45rem;
        background: rgba(255, 255, 255, 0.015);
      }
      .rung--euv { border-left-color: var(--cyan); }
      .rung--duv { border-left-color: var(--huawei); }
      .rung__node { font-family: var(--font-display); font-weight: 700; font-size: 1.05rem; }
      .rung--euv .rung__node { color: var(--cyan); }
      .rung--duv .rung__node { color: var(--huawei); }
      .rung__vendor { font-size: 0.72rem; color: var(--ink-dim); }
      .rung__tech { font-size: 0.66rem; color: var(--faint); line-height: 1.4; }
      .rung__badge {
        font-size: 0.6rem;
        padding: 0.18rem 0.5rem;
        border-radius: 999px;
        white-space: nowrap;
        letter-spacing: 0.1em;
      }
      .rung__badge--euv { background: rgba(65, 230, 255, 0.14); color: var(--cyan); }
      .rung__badge--duv { background: rgba(255, 255, 255, 0.06); color: var(--muted); }
      .rung__badge--gen { background: rgba(255, 93, 99, 0.16); color: var(--huawei); }
      .wall {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        text-align: center;
        margin: 1.1rem 0;
        padding: 0.7rem;
        border-top: 1px dashed var(--gold);
        border-bottom: 1px dashed var(--gold);
        background: rgba(255, 209, 102, 0.05);
      }
      .wall__t { font-size: 0.7rem; color: var(--gold); letter-spacing: 0.12em; }
      .wall__s { font-size: 0.64rem; color: var(--muted); }
      @media (max-width: 600px) {
        .rung { grid-template-columns: 4.5rem 1fr auto; }
        .rung__tech { grid-column: 1 / -1; }
      }
    `,
  ],
})
export class LithoLadder {
  readonly data = input.required<LithoRung[]>();
  protected euv = computed(() => this.data().filter((r) => /euv/i.test(r.lithoClass)));
  protected duv = computed(() => this.data().filter((r) => !/euv/i.test(r.lithoClass)));
}

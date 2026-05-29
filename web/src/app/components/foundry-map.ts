import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RevealDirective } from '../shared/in-view';
import type { FoundryEntity } from '../content.model';

@Component({
  selector: 'app-foundry-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <figure class="panel">
      <figcaption>
        <span class="panel__tag">Geography of the gap · who holds EUV</span>
        <h3 class="panel__title">The frontier has a physical address</h3>
        <p class="panel__cap">
          Every EUV-class node on earth sits inside the allied coalition. The PRC mainland holds
          none of it — and the whole embargo rests on that coalition holding.
        </p>
      </figcaption>

      <div class="blocs">
        <div class="bloc bloc--west">
          <span class="bloc__h mono">West / Allied axis · {{ west().length }} nodes</span>
          @for (e of west(); track e.entity) {
            <div class="ent" [class.ent--key]="isChoke(e)" appReveal>
              <div class="ent__top">
                <span class="ent__name">{{ e.entity }}</span>
                @if (e.hasEUV) { <span class="ent__euv mono">EUV</span> }
              </div>
              <span class="ent__region mono">{{ e.region }}</span>
              <span class="ent__cap">{{ e.capability }}</span>
            </div>
          }
        </div>

        <div class="bloc bloc--prc">
          <span class="bloc__h mono">PRC mainland · {{ prc().length }} nodes</span>
          @for (e of prc(); track e.entity) {
            <div class="ent ent--prc" appReveal>
              <div class="ent__top">
                <span class="ent__name">{{ e.entity }}</span>
                <span class="ent__noeuv mono">no EUV</span>
              </div>
              <span class="ent__region mono">{{ e.region }}</span>
              <span class="ent__cap">{{ e.capability }}</span>
            </div>
          }
        </div>
      </div>
      <p class="panel__foot">
        The embargo is not an American policy — it is a coalition policy (ASML / Netherlands, TSMC /
        Taiwan, Japan, Korea, US). A coalition is exactly as strong as its least-aligned member.
      </p>
    </figure>
  `,
  styles: [
    `
      :host { display: block; }
      .blocs { display: grid; grid-template-columns: 1.3fr 1fr; gap: 1rem; margin-top: 1.4rem; }
      @media (max-width: 640px) { .blocs { grid-template-columns: 1fr; } }
      .bloc { border: 1px solid var(--line); border-radius: var(--radius-sm); padding: 1rem; }
      .bloc--west { background: rgba(65, 230, 255, 0.04); border-color: rgba(65, 230, 255, 0.16); }
      .bloc--prc { background: rgba(255, 93, 99, 0.04); border-color: rgba(255, 93, 99, 0.16); }
      .bloc__h { display: block; font-size: 0.64rem; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 0.8rem; }
      .bloc--west .bloc__h { color: var(--cyan); }
      .bloc--prc .bloc__h { color: var(--huawei); }
      .ent {
        display: grid;
        gap: 0.15rem;
        padding: 0.65rem 0.7rem;
        border-radius: 6px;
        margin-bottom: 0.5rem;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid transparent;
      }
      .ent--key { border-color: var(--gold); background: rgba(255, 209, 102, 0.07); }
      .ent__top { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
      .ent__name { font-family: var(--font-display); font-weight: 600; font-size: 0.92rem; }
      .ent--key .ent__name { color: var(--gold); }
      .ent__euv { font-size: 0.58rem; padding: 0.12rem 0.42rem; border-radius: 999px; background: rgba(65, 230, 255, 0.16); color: var(--cyan); }
      .ent__noeuv { font-size: 0.58rem; padding: 0.12rem 0.42rem; border-radius: 999px; background: rgba(255, 93, 99, 0.16); color: var(--huawei); }
      .ent__region { font-size: 0.62rem; color: var(--faint); }
      .ent__cap { font-size: 0.74rem; color: var(--muted); line-height: 1.4; }
    `,
  ],
})
export class FoundryMap {
  readonly data = input.required<FoundryEntity[]>();
  protected west = computed(() => this.data().filter((e) => !/prc/i.test(e.bloc)));
  protected prc = computed(() => this.data().filter((e) => /prc/i.test(e.bloc)));
  protected isChoke(e: FoundryEntity): boolean {
    return /asml/i.test(e.entity);
  }
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CountUp } from '../shared/count-up';
import { whenVisible } from '../shared/in-view';
import type { PowerData } from '../content.model';

@Component({
  selector: 'app-power-stat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountUp],
  template: `
    <figure class="panel">
      <figcaption>
        <span class="panel__tag">Level 3 · The grid · the hidden cost</span>
        <h3 class="panel__title">Power is how China buys around the gap</h3>
        <p class="panel__cap">
          Stacking 5× the silicon has a price the chip specs hide — and it is exactly the price
          China is best positioned on earth to pay.
        </p>
      </figcaption>

      <div class="meters">
        <div class="meter">
          <svg viewBox="0 0 120 120" class="ring" [class.ring--in]="vis()">
            <circle class="ring__bg" cx="60" cy="60" r="52" />
            <circle class="ring__fg ring__fg--a" cx="60" cy="60" r="52" />
          </svg>
          <div class="meter__c">
            <span class="meter__v"><app-count [to]="data().powerRatio" [decimals]="1" [suffix]="'×'" /></span>
            <span class="meter__l mono">the power draw</span>
          </div>
        </div>

        <div class="meter">
          <svg viewBox="0 0 120 120" class="ring" [class.ring--in]="vis()">
            <circle class="ring__bg" cx="60" cy="60" r="52" />
            <circle class="ring__fg ring__fg--b" cx="60" cy="60" r="52" />
          </svg>
          <div class="meter__c">
            <span class="meter__v"><app-count [to]="data().perFlopRatio" [decimals]="1" [suffix]="'×'" /></span>
            <span class="meter__l mono">worse per FLOP</span>
          </div>
        </div>

        <div class="kw">
          <div class="kw__row">
            <span class="kw__name mono is-huawei">CloudMatrix 384</span>
            <div class="kw__track"><div class="kw__fill kw__fill--hw" [style.width.%]="vis() ? 100 : 0"></div></div>
            <span class="kw__val mono"><app-count [to]="559" [suffix]="' kW'" /></span>
          </div>
          <div class="kw__row">
            <span class="kw__name mono is-nvidia">GB200 NVL72</span>
            <div class="kw__track"><div class="kw__fill kw__fill--nv" [style.width.%]="vis() ? 26 : 0"></div></div>
            <span class="kw__val mono"><app-count [to]="145" [suffix]="' kW'" /></span>
          </div>
          <p class="kw__note">
            In the US, grid power is the <em>binding constraint</em>, so Nvidia optimizes
            performance-per-watt. China has cheap, abundant, lightly-regulated energy, so it
            optimizes performance-per-restricted-input — spending electrons to route around the
            silicon the embargo rationed.
          </p>
        </div>
      </div>

      <p class="panel__foot">{{ data().note }}</p>
    </figure>
  `,
  styles: [
    `
      :host { display: block; }
      .meters {
        display: grid;
        grid-template-columns: auto auto 1fr;
        align-items: center;
        gap: 1.6rem;
        margin-top: 1.5rem;
      }
      @media (max-width: 680px) {
        .meters { grid-template-columns: 1fr 1fr; }
        .kw { grid-column: 1 / -1; }
      }
      .meter { position: relative; width: 128px; height: 128px; }
      .ring { width: 100%; height: 100%; transform: rotate(-90deg); }
      .ring__bg { fill: none; stroke: rgba(255, 255, 255, 0.06); stroke-width: 7; }
      .ring__fg {
        fill: none;
        stroke-width: 7;
        stroke-linecap: round;
        stroke-dasharray: 327;
        stroke-dashoffset: 327;
        transition: stroke-dashoffset 1.4s var(--ease) 0.2s;
      }
      .ring__fg--a { stroke: var(--amber); }
      .ring__fg--b { stroke: var(--huawei); }
      .ring--in .ring__fg--a { stroke-dashoffset: 60; }
      .ring--in .ring__fg--b { stroke-dashoffset: 110; }
      .meter__c {
        position: absolute;
        inset: 0;
        display: grid;
        place-content: center;
        text-align: center;
      }
      .meter__v {
        font-family: var(--font-display);
        font-weight: 700;
        font-size: 1.9rem;
        color: var(--amber);
        line-height: 1;
      }
      .meter:last-of-type .meter__v { color: var(--huawei); }
      .meter__l { display: block; font-size: 0.6rem; color: var(--muted); margin-top: 0.25rem; max-width: 6rem; }
      .kw { display: flex; flex-direction: column; gap: 0.6rem; }
      .kw__row { display: grid; grid-template-columns: 9rem 1fr 4rem; align-items: center; gap: 0.7rem; }
      .kw__name { font-size: 0.74rem; }
      .kw__track { height: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 4px; overflow: hidden; }
      .kw__fill { height: 100%; width: 0; transition: width 1.2s var(--ease) 0.4s; border-radius: 4px; }
      .kw__fill--hw { background: var(--amber); }
      .kw__fill--nv { background: var(--nvidia); }
      .kw__val { font-size: 0.78rem; text-align: right; color: var(--ink-dim); }
      .kw__note { font-family: var(--font-mono); font-size: 0.72rem; line-height: 1.55; color: var(--muted); margin-top: 0.4rem; }
      .kw__note em { color: var(--amber); font-style: normal; }
      @media (max-width: 480px) {
        .kw__row { grid-template-columns: 1fr 3.4rem; grid-template-areas: 'n n' 't v'; }
        .kw__name { grid-area: n; }
        .kw__track { grid-area: t; }
        .kw__val { grid-area: v; }
      }
    `,
  ],
})
export class PowerStat {
  readonly data = input.required<PowerData>();
  protected readonly vis = whenVisible();
}

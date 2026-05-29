import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RevealDirective } from '../shared/in-view';
import type { TimelineItem } from '../content.model';

@Component({
  selector: 'app-timeline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <figure class="panel">
      <figcaption>
        <span class="panel__tag">Trajectory · the catch-up clock</span>
        <h3 class="panel__title">Every wall came with a door</h3>
        <p class="panel__cap">
          The historical cadence of Chinese semiconductors: a few years late, but it reliably
          arrives — and the controls keep handing it the reasons to.
        </p>
      </figcaption>

      <ol class="tl">
        @for (t of data(); track t.year + t.milestone; let last = $last) {
          <li class="tl__i" [class.tl__i--fork]="t.milestone.toLowerCase().includes('fork')" appReveal>
            <span class="tl__dot"></span>
            @if (!last) { <span class="tl__line"></span> }
            <div class="tl__body">
              <span class="tl__yr mono">{{ t.year }}</span>
              <h4 class="tl__m">{{ t.milestone }}</h4>
              <p class="tl__d">{{ t.detail }}</p>
            </div>
          </li>
        }
      </ol>
    </figure>
  `,
  styles: [
    `
      :host { display: block; }
      .tl { list-style: none; padding: 0; margin: 1.6rem 0 0; }
      .tl__i { position: relative; padding: 0 0 1.6rem 2.2rem; }
      .tl__dot {
        position: absolute;
        left: 0;
        top: 0.4rem;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: var(--bg);
        border: 2px solid var(--cyan);
        box-shadow: 0 0 0 4px rgba(65, 230, 255, 0.08);
        z-index: 1;
      }
      .tl__line {
        position: absolute;
        left: 6px;
        top: 0.9rem;
        bottom: -0.4rem;
        width: 1px;
        background: linear-gradient(var(--line-2), var(--line));
      }
      .tl__yr {
        font-size: 0.72rem;
        letter-spacing: 0.16em;
        color: var(--cyan);
        font-weight: 600;
      }
      .tl__m { font-family: var(--font-display); font-weight: 600; font-size: 1.08rem; margin: 0.15rem 0 0.35rem; }
      .tl__d { font-family: var(--font-mono); font-size: 0.74rem; line-height: 1.55; color: var(--muted); max-width: 44rem; }
      .tl__i--fork .tl__dot { border-color: var(--gold); background: var(--gold); box-shadow: 0 0 18px var(--gold); }
      .tl__i--fork .tl__m { color: var(--gold); }
      .tl__i--fork .tl__yr { color: var(--gold); }
    `,
  ],
})
export class Timeline {
  readonly data = input.required<TimelineItem[]>();
}

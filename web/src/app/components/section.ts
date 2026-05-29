import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RevealDirective } from '../shared/in-view';
import { inlineMarkup } from '../shared/markup';
import type { Section } from '../content.model';

@Component({
  selector: 'app-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <section class="sec" [id]="data().id">
      <div class="container">
        <header class="sec__head" appReveal>
          <span class="eyebrow">{{ data().eyebrow }}</span>
          <h2 class="sec__title">{{ data().title }}</h2>
          <p class="sec__dek">{{ data().dek }}</p>
        </header>

        <div class="sec__body">
          @for (p of data().body; track $index) {
            <p class="sec__p" appReveal [innerHTML]="md(p)"></p>

            @if ($index === 0 && data().keyStats?.length) {
              <div class="statrow" appReveal>
                @for (s of data().keyStats; track s.label) {
                  <div class="stat">
                    <span class="stat__v">{{ s.value }}</span>
                    <span class="stat__l">{{ s.label }}</span>
                  </div>
                }
              </div>
            }
          }

          @if (data().pullQuote) {
            <blockquote class="pull" appReveal>{{ data().pullQuote }}</blockquote>
          }
        </div>

        <ng-content />
      </div>
    </section>
  `,
})
export class SectionComponent {
  readonly data = input.required<Section>();
  protected md(text: string): string {
    return inlineMarkup(text);
  }
}

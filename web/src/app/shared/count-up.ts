import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { isStill, observeOnce } from './in-view';

/** Animated number that counts up from 0 → `to` the first time it scrolls into view. */
@Component({
  selector: 'app-count',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `{{ prefix() }}{{ display() }}{{ suffix() }}`,
  host: { class: 'count' },
})
export class CountUp {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly to = input.required<number>();
  readonly decimals = input(0);
  readonly duration = input(1300);
  readonly prefix = input('');
  readonly suffix = input('');

  private readonly value = signal(0);
  readonly display = computed(() => this.value().toFixed(this.decimals()));

  constructor() {
    afterNextRender(() => {
      const reduce =
        typeof matchMedia !== 'undefined' &&
        matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce || isStill()) {
        this.value.set(this.to());
        return;
      }
      observeOnce(this.host.nativeElement, () => this.run());
    });
  }

  private run(): void {
    const target = this.to();
    const dur = this.duration();
    const start = performance.now();
    const tick = (now: number): void => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      this.value.set(eased * target);
      if (t < 1) requestAnimationFrame(tick);
      else this.value.set(target);
    };
    requestAnimationFrame(tick);
  }
}

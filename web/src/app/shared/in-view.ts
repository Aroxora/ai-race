import {
  afterNextRender,
  Directive,
  ElementRef,
  inject,
  input,
  signal,
  type WritableSignal,
} from '@angular/core';

/** Fire `cb` once, the first time `el` scrolls into view. SSR/no-IO safe. */
export function observeOnce(el: Element, cb: () => void, threshold = 0.2): void {
  if (typeof IntersectionObserver === 'undefined') {
    cb();
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          cb();
          io.disconnect();
          break;
        }
      }
    },
    { threshold, rootMargin: '0px 0px -6% 0px' },
  );
  io.observe(el);
}

/**
 * Returns a signal that flips to `true` the first time the host element
 * scrolls into view. Call from a field initializer / constructor (injection context).
 */
export function isStill(): boolean {
  return (
    typeof globalThis !== 'undefined' &&
    !!(globalThis as Record<string, unknown>)['__AIRACE_STILL__']
  );
}

export function whenVisible(threshold = 0.22): WritableSignal<boolean> {
  const host = inject<ElementRef<HTMLElement>>(ElementRef);
  const vis = signal(false);
  if (isStill()) {
    vis.set(true);
    return vis;
  }
  afterNextRender(() => observeOnce(host.nativeElement, () => vis.set(true), threshold));
  return vis;
}

/**
 * Adds `.reveal` immediately and `.is-in` when scrolled into view.
 * Optional numeric value = stagger delay in ms: `[appReveal]="120"`.
 */
@Directive({ selector: '[appReveal]' })
export class RevealDirective {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly delay = input<number | ''>('', { alias: 'appReveal' });

  constructor() {
    const el = this.host.nativeElement;
    el.classList.add('reveal');
    afterNextRender(() => {
      if (isStill()) {
        el.classList.add('is-in');
        return;
      }
      const d = this.delay();
      if (typeof d === 'number' && d > 0) {
        el.style.transitionDelay = `${d}ms`;
      }
      observeOnce(el, () => el.classList.add('is-in'), 0.12);
    });
  }
}

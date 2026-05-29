import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ContentService } from './content.service';
import { SectionComponent } from './components/section';
import { TwoLevel } from './components/two-level';
import { PerChipChart } from './components/per-chip-chart';
import { YieldChart } from './components/yield-chart';
import { AggregateChart } from './components/aggregate-chart';
import { SystemChart } from './components/system-chart';
import { PowerStat } from './components/power-stat';
import { PricingChart } from './components/pricing-chart';
import { FoundryMap } from './components/foundry-map';
import { LithoLadder } from './components/litho-ladder';
import { Timeline } from './components/timeline';
import { ScenarioToggle } from './components/scenario-toggle';
import { RebuttalMatrix } from './components/rebuttal-matrix';
import { CountUp } from './shared/count-up';

interface NavItem {
  id: string;
  label: string;
}

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBlceEHjuOS1RMV94o6DbHWBHP9fFRj5HE',
  authDomain: 'ai-race-osint.firebaseapp.com',
  projectId: 'ai-race-osint',
  storageBucket: 'ai-race-osint.firebasestorage.app',
  messagingSenderId: '206303017749',
  appId: '1:206303017749:web:5ab2d1259f630a1bea471c',
  measurementId: 'G-XSCVQN9TWX',
};

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SectionComponent,
    TwoLevel,
    PerChipChart,
    YieldChart,
    AggregateChart,
    SystemChart,
    PowerStat,
    PricingChart,
    FoundryMap,
    LithoLadder,
    Timeline,
    ScenarioToggle,
    RebuttalMatrix,
    CountUp,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly c = inject(ContentService);

  protected readonly nav: NavItem[] = [
    { id: 'thesis', label: 'Thesis' },
    { id: 'jensen', label: 'Jensen Huang' },
    { id: 'economics', label: 'Economics' },
    { id: 'two-levels', label: 'Two Levels' },
    { id: 'silicon', label: 'The Chip' },
    { id: 'system', label: 'The System' },
    { id: 'power', label: 'Power' },
    { id: 'software', label: 'CUDA vs CANN' },
    { id: 'deepseek', label: 'DeepSeek' },
    { id: 'taiwan-litho', label: 'Lithography' },
    { id: 'smic-gap', label: 'SMIC vs TSMC' },
    { id: 'catchup', label: 'Catch-up' },
    { id: 'fork', label: 'The Fork' },
    { id: 'rebuttal-intro', label: 'Rebuttal' },
    { id: 'synthesis', label: 'Synthesis' },
    { id: 'conclusion', label: 'Conclusion' },
  ];

  protected readonly progress = signal(0);
  protected readonly active = signal('thesis');
  protected readonly menuOpen = signal(false);

  protected readonly activeIndex = computed(() => {
    const i = this.nav.findIndex((n) => n.id === this.active());
    return i < 0 ? 0 : i;
  });

  protected activeLabel(): string {
    return this.nav.find((n) => n.id === this.active())?.label ?? 'Dossier';
  }

  protected pad(n: number): string {
    return n.toString().padStart(2, '0');
  }

  protected go(id: string): void {
    this.menuOpen.set(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  protected prev(): void {
    this.goIndex(this.activeIndex() - 1);
  }
  protected next(): void {
    this.goIndex(this.activeIndex() + 1);
  }
  private goIndex(i: number): void {
    const item = this.nav[i];
    if (item) this.go(item.id);
  }

  constructor() {
    // "still" mode (?still): force all reveals/charts visible & collapse the hero — for static
    // captures and a print-friendly read. Harmless when absent.
    if (typeof location !== 'undefined' && /[?&]still\b/.test(location.search)) {
      (globalThis as Record<string, unknown>)['__AIRACE_STILL__'] = true;
      if (typeof document !== 'undefined') document.documentElement.classList.add('still');
      const off = location.search.match(/[?&]off=(\d+)/);
      if (off && typeof document !== 'undefined' && document.body) {
        document.body.style.marginTop = `-${off[1]}px`;
      }
    }
    afterNextRender(() => {
      this.wireScroll();
      this.wireSpy();
      this.wireKeys();
      this.initAnalytics();
      // honor deep links (#section-id) on load
      const hash = location.hash.slice(1);
      if (hash && document.getElementById(hash)) {
        requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView());
      }
      // capture aid: ?scroll=N jumps to a pixel offset (used to verify the chapter dock)
      const sc = location.search.match(/[?&]scroll=(\d+)/);
      if (sc) requestAnimationFrame(() => scrollTo(0, parseInt(sc[1], 10)));
    });
  }

  private wireScroll(): void {
    let raf = 0;
    const update = (): void => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      this.progress.set(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    };
    const onScroll = (): void => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll, { passive: true });
    update();
  }

  private wireSpy(): void {
    const secs = Array.from(document.querySelectorAll<HTMLElement>('section.sec[id]'));
    if (!secs.length || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) this.active.set((e.target as HTMLElement).id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    secs.forEach((s) => io.observe(s));
  }

  private wireKeys(): void {
    addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'Escape') this.menuOpen.set(false);
      else if (e.key === 'ArrowRight') this.next();
      else if (e.key === 'ArrowLeft') this.prev();
    });
  }

  private async initAnalytics(): Promise<void> {
    try {
      const { initializeApp } = await import('firebase/app');
      const { getAnalytics, isSupported } = await import('firebase/analytics');
      const app = initializeApp(FIREBASE_CONFIG);
      if (await isSupported()) getAnalytics(app);
    } catch {
      /* analytics is non-essential; never block the page */
    }
  }
}

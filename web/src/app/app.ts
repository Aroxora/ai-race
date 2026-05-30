import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ContentService } from './content.service';
import { FaviconService } from './favicon.service';
import { LithoPrimer } from './components/litho-primer';
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

const DEFAULT_TITLE = 'The Cage Is the Threat — Bo Shang on the AI Race';

/** Per-chapter favicon accent + glyph — the tab icon reflects what you're reading. */
const SECTION_FAVICON = new Map<string, { color: string; glyph: string }>([
  ['primer', { color: '#41e6ff', glyph: 'lens' }],
  ['thesis', { color: '#ff5d63', glyph: 'cage' }],
  ['jensen', { color: '#76e07b', glyph: 'check' }],
  ['economics', { color: '#ffd166', glyph: 'coin' }],
  ['two-levels', { color: '#b491ff', glyph: 'split' }],
  ['silicon', { color: '#76e07b', glyph: 'chip' }],
  ['system', { color: '#ff5d63', glyph: 'grid' }],
  ['power', { color: '#ff9f45', glyph: 'bolt' }],
  ['software', { color: '#b491ff', glyph: 'code' }],
  ['deepseek', { color: '#41e6ff', glyph: 'loop' }],
  ['taiwan-litho', { color: '#41e6ff', glyph: 'lens' }],
  ['smic-gap', { color: '#ff5d63', glyph: 'steps' }],
  ['catchup', { color: '#ff9f45', glyph: 'trend' }],
  ['fork', { color: '#ffd166', glyph: 'fork' }],
  ['rebuttal-intro', { color: '#ff5d63', glyph: 'rebuttal' }],
  ['synthesis', { color: '#b491ff', glyph: 'merge' }],
  ['conclusion', { color: '#ffd166', glyph: 'flag' }],
]);

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LithoPrimer,
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
    { id: 'primer', label: 'Primer' },
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

  private readonly favicon = inject(FaviconService);
  /** rounded reading-progress percent — throttles favicon redraws to ~100 updates */
  private readonly faviconPct = computed(() => Math.round(this.progress() * 100));

  // Firebase Analytics (lazy-loaded) + custom engagement events
  private analytics: unknown = null;
  private logEventFn: ((a: unknown, e: string, p?: Record<string, unknown>) => void) | null = null;
  private pendingSection: string | null = null;
  private readonly depthSeen = new Set<number>();

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
    // dynamic favicon + tab title reflecting reading progress and the active chapter
    effect(() => {
      const open = this.menuOpen();
      const pct = this.faviconPct();
      const id = this.active();
      let glyph = 'brand';
      let color = '#41e6ff';
      if (open) {
        glyph = 'menu';
      } else if (pct > 1) {
        const m = SECTION_FAVICON.get(id);
        if (m) {
          glyph = m.glyph;
          color = m.color;
        }
      }
      this.favicon.draw({ progress: pct / 100, color, glyph });
      if (typeof document !== 'undefined') {
        document.title =
          !open && pct > 1 && SECTION_FAVICON.has(id)
            ? `${this.pad(this.activeIndex() + 1)}/${this.pad(this.nav.length)} · ${this.activeLabel()} — The Cage Is the Threat`
            : DEFAULT_TITLE;
      }
    });

    // analytics: fire a section_view whenever the active chapter changes
    effect(() => this.logSection(this.active()));

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
      const p = max > 0 ? Math.min(1, h.scrollTop / max) : 0;
      this.progress.set(p);
      const pc = Math.round(p * 100);
      for (const m of [25, 50, 75, 100]) {
        if (pc >= m && !this.depthSeen.has(m)) {
          this.depthSeen.add(m);
          this.logDepth(m);
        }
      }
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
      const { getAnalytics, isSupported, logEvent } = await import('firebase/analytics');
      if (!(await isSupported())) return;
      const app = initializeApp(FIREBASE_CONFIG);
      this.analytics = getAnalytics(app);
      this.logEventFn = logEvent as (a: unknown, e: string, p?: Record<string, unknown>) => void;
      // flush the chapter that was active before analytics finished loading
      if (this.pendingSection) {
        const id = this.pendingSection;
        this.pendingSection = null;
        this.logSection(id);
      }
    } catch {
      /* analytics is non-essential; never block the page */
    }
  }

  private logSection(id: string): void {
    if (this.logEventFn && this.analytics) {
      this.logEventFn(this.analytics, 'section_view', {
        section_id: id,
        section_index: this.activeIndex() + 1,
        section_label: this.activeLabel(),
      });
    } else {
      this.pendingSection = id;
    }
  }

  private logDepth(pct: number): void {
    if (this.logEventFn && this.analytics) {
      this.logEventFn(this.analytics, 'scroll_depth', { percent: pct });
    }
  }
}

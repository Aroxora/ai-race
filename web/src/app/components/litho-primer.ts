import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RevealDirective, whenVisible } from '../shared/in-view';

type Mode = 'euv' | 'duv';

interface Vector {
  horizon: 'Now' | 'Mid-term' | 'Long shot';
  tone: 'now' | 'mid' | 'long';
  title: string;
  detail: string;
}

@Component({
  selector: 'app-litho-primer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <section class="sec" id="primer">
      <div class="container">
        <header class="sec__head" appReveal>
          <span class="eyebrow">Primer · the physics of the bottleneck</span>
          <h2 class="sec__title">Why Lithography Is the Whole Game</h2>
          <p class="sec__dek">
            Every figure in this dossier hangs off one machine and one number. Before the argument,
            the 90-second version of <em>why</em> the chip gap exists — and an honest map of how China
            could close it.
          </p>
        </header>

        <!-- 1 · printing with light -->
        <div class="prose measure" appReveal>
          <p>
            A microchip is not carved; it is <strong>printed</strong>. A machine called a
            lithography scanner shines light through a stencil of the circuit (the
            <em>mask</em>) and projects it, shrunk, onto a silicon wafer coated in light-sensitive
            resist. Print, etch, repeat — sixty-plus layers stacked into a processor. The single
            most important variable is how <strong>fine a line the light can draw</strong>, because
            that sets how many transistors fit per millimetre.
          </p>
          <p>
            And the sharpness of that line is bounded by physics — the Rayleigh criterion:
          </p>
          <div class="formula mono" aria-label="critical dimension equals k-one times wavelength divided by numerical aperture">
            <span class="formula__lhs">CD</span>
            <span class="formula__eq">=</span>
            <span class="formula__frac">
              <span class="formula__num">k₁ · λ</span>
              <span class="formula__den">NA</span>
            </span>
            <span class="formula__leg">
              <b>λ</b> wavelength of light · <b>NA</b> lens aperture · <b>k₁</b> ≈ 0.3 process floor
            </span>
          </div>
          <p>
            The smallest feature you can resolve shrinks with the <strong>wavelength</strong>. Use
            longer light and you simply cannot draw a fine enough line in one pass — no matter how
            good your engineers are. That single dependency is the entire bottleneck.
          </p>
        </div>

        <!-- 2 · interactive DUV vs EUV -->
        <figure class="panel compare" appReveal>
          <figcaption>
            <span class="panel__tag">Two kinds of light · one decides everything</span>
            <h3 class="panel__title">193 nanometres vs 13.5</h3>
            <p class="panel__cap">
              Toggle the light source. EUV draws the line in a single shot; DUV has to fake it with
              many — and the faking is where the cost, the yield, and the wall come from.
            </p>
          </figcaption>

          <div class="seg" role="tablist">
            <button type="button" class="seg__b" [class.on]="mode() === 'euv'" (click)="mode.set('euv')">
              EUV · the frontier
            </button>
            <button type="button" class="seg__b seg__b--duv" [class.on]="mode() === 'duv'" (click)="mode.set('duv')">
              DUV · China’s ceiling
            </button>
          </div>

          <div class="wave" [class.wave--duv]="mode() === 'duv'">
            <svg viewBox="0 0 340 56" preserveAspectRatio="none" aria-hidden="true">
              <path [attr.d]="wavePath()" />
            </svg>
            <span class="wave__lab mono">{{ spec().waveLabel }}</span>
          </div>

          <div class="specrow">
            <div class="spec"><span class="spec__v">{{ spec().lambda }}</span><span class="spec__l mono">wavelength (λ)</span></div>
            <div class="spec"><span class="spec__v">{{ spec().na }}</span><span class="spec__l mono">numerical aperture</span></div>
            <div class="spec"><span class="spec__v">{{ spec().res }}</span><span class="spec__l mono">1-shot resolution</span></div>
            <div class="spec"><span class="spec__v">{{ spec().passes }}×</span><span class="spec__l mono">exposures / critical layer</span></div>
          </div>

          <!-- multi-patterning strip -->
          <div class="mp">
            <span class="mp__h mono">To print one dense layer:</span>
            <div class="mp__stack">
              @for (p of passList(); track p) {
                <div class="mp__pass" [class.mp__pass--duv]="mode() === 'duv'">
                  <span class="mp__n mono">pass {{ p }}</span>
                  <div class="mp__lines">
                    @for (l of lineList; track l) { <i [style.left.%]="lineLeft(p, l)"></i> }
                  </div>
                </div>
              }
            </div>
          </div>

          <p class="panel__foot">{{ spec().note }}</p>
        </figure>

        <!-- 3 · why it's a wall -->
        <div class="block" appReveal>
          <h3 class="block__h">Why it’s a <span class="hl-gold">wall</span>, not a hill</h3>
          <div class="cards">
            @for (w of walls; track w.t) {
              <div class="card">
                <span class="card__k mono">{{ w.k }}</span>
                <h4 class="card__t">{{ w.t }}</h4>
                <p class="card__d">{{ w.d }}</p>
              </div>
            }
          </div>
        </div>

        <!-- 4 · how China catches up -->
        <div class="block" appReveal>
          <h3 class="block__h">How China <span class="hl-cyan">could</span> catch up</h3>
          <p class="block__sub measure">
            None of these are fantasies — each is funded and under way. They sort cleanly by horizon.
            The near-term moves buy <em>density and time</em>; the one genuine wall is an indigenous
            EUV source, a long-shot bet China is nonetheless making.
          </p>
          <div class="vectors">
            @for (v of vectors; track v.title) {
              <div class="vec" [class]="'vec--' + v.tone">
                <span class="vec__h mono">{{ v.horizon }}</span>
                <h4 class="vec__t">{{ v.title }}</h4>
                <p class="vec__d">{{ v.detail }}</p>
              </div>
            }
          </div>
          <p class="block__foot mono">
            Behind all of it: <b>Big Fund III (~$47.5B)</b>, a state-guaranteed demand curve that
            de-risks immature domestic tools, and repatriated TSMC/Samsung talent. The historical
            cadence is the whole point — China arrives a few years late, but it
            <b>reliably arrives</b>.
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      .prose { margin-bottom: 2.4rem; }
      .prose p { margin-block: 1.1rem; color: var(--ink-dim); }
      .prose strong { color: var(--ink); font-weight: 600; }
      .prose em { color: var(--cyan); font-style: italic; }

      .formula {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.8rem 1.1rem;
        margin: 1.6rem 0;
        padding: 1.1rem 1.3rem;
        border: 1px solid var(--line);
        border-left: 3px solid var(--cyan);
        border-radius: var(--radius-sm);
        background: rgba(65, 230, 255, 0.04);
      }
      .formula__lhs { font-size: 1.5rem; color: var(--ink); }
      .formula__eq { font-size: 1.3rem; color: var(--faint); }
      .formula__frac { display: inline-flex; flex-direction: column; text-align: center; line-height: 1.15; }
      .formula__num { color: var(--cyan); font-size: 1.15rem; }
      .formula__den { border-top: 1.5px solid var(--muted); padding-top: 0.15rem; color: var(--ink-dim); font-size: 1.05rem; }
      .formula__leg { font-size: 0.7rem; color: var(--muted); max-width: 22rem; line-height: 1.5; }
      .formula__leg b { color: var(--ink-dim); font-weight: 600; }

      /* compare panel */
      .seg { display: inline-flex; gap: 0.4rem; padding: 0.3rem; border: 1px solid var(--line); border-radius: 999px; margin: 1.4rem 0 1.2rem; }
      .seg__b { padding: 0.55rem 1.1rem; border-radius: 999px; font-family: var(--font-mono); font-size: 0.74rem; color: var(--muted); transition: background 0.25s, color 0.25s; }
      .seg__b.on { background: var(--cyan); color: #04121a; font-weight: 600; }
      .seg__b--duv.on { background: var(--amber); }

      .wave { position: relative; margin: 0.4rem 0 1.4rem; }
      .wave svg { width: 100%; height: 56px; }
      .wave path { fill: none; stroke: var(--cyan); stroke-width: 2; transition: stroke 0.3s; }
      .wave--duv path { stroke: var(--amber); }
      .wave__lab { position: absolute; right: 0; top: -1.1rem; font-size: 0.66rem; color: var(--faint); }

      .specrow { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: var(--radius-sm); overflow: hidden; }
      @media (max-width: 560px) { .specrow { grid-template-columns: 1fr 1fr; } }
      .spec { background: var(--panel); padding: 0.9rem 1rem; }
      .spec__v { display: block; font-family: var(--font-display); font-weight: 700; font-size: 1.5rem; letter-spacing: -0.02em; color: var(--ink); }
      .wave--duv ~ .specrow .spec__v { }
      .spec__l { display: block; margin-top: 0.3rem; font-size: 0.62rem; color: var(--muted); line-height: 1.4; }

      .mp { margin-top: 1.5rem; }
      .mp__h { font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--faint); }
      .mp__stack { display: grid; gap: 0.4rem; margin-top: 0.7rem; }
      .mp__pass { display: grid; grid-template-columns: 4rem 1fr; align-items: center; gap: 0.8rem; }
      .mp__n { font-size: 0.64rem; color: var(--muted); }
      .mp__lines { position: relative; height: 20px; background: rgba(255,255,255,0.03); border-radius: 4px; overflow: hidden; }
      .mp__lines i { position: absolute; top: 0; bottom: 0; width: 3px; background: var(--cyan); border-radius: 2px; transition: left 0.5s var(--ease); }
      .mp__pass--duv .mp__lines i { background: var(--amber); }

      /* blocks */
      .block { margin-top: 2.8rem; }
      .block__h { font-size: clamp(1.3rem, 1rem + 1.4vw, 2rem); margin-bottom: 1.2rem; }
      .hl-gold { color: var(--gold); }
      .hl-cyan { color: var(--cyan); }
      .block__sub { color: var(--muted); margin-bottom: 1.4rem; }
      .block__sub em { color: var(--ink-dim); font-style: italic; }
      .block__foot { margin-top: 1.3rem; font-size: 0.74rem; line-height: 1.6; color: var(--muted); border-top: 1px dashed var(--line); padding-top: 1rem; }
      .block__foot b { color: var(--ink-dim); }

      .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.8rem; }
      .card { border: 1px solid var(--line); border-radius: var(--radius-sm); padding: 1.1rem; background: rgba(255,255,255,0.015); }
      .card__k { font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); }
      .card__t { font-family: var(--font-display); font-weight: 600; font-size: 1.05rem; margin: 0.4rem 0 0.5rem; }
      .card__d { font-family: var(--font-mono); font-size: 0.74rem; line-height: 1.55; color: var(--muted); }

      .vectors { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.8rem; }
      .vec { border: 1px solid var(--line); border-left-width: 3px; border-radius: var(--radius-sm); padding: 1.1rem; background: rgba(255,255,255,0.015); }
      .vec--now { border-left-color: var(--nvidia); }
      .vec--mid { border-left-color: var(--amber); }
      .vec--long { border-left-color: var(--huawei); }
      .vec__h { font-size: 0.6rem; letter-spacing: 0.16em; text-transform: uppercase; padding: 0.15rem 0.5rem; border-radius: 999px; }
      .vec--now .vec__h { background: rgba(118,224,123,0.16); color: var(--nvidia); }
      .vec--mid .vec__h { background: rgba(255,159,69,0.16); color: var(--amber); }
      .vec--long .vec__h { background: rgba(255,93,99,0.16); color: var(--huawei); }
      .vec__t { font-family: var(--font-display); font-weight: 600; font-size: 1.02rem; margin: 0.5rem 0 0.5rem; }
      .vec__d { font-family: var(--font-mono); font-size: 0.73rem; line-height: 1.55; color: var(--muted); }
    `,
  ],
})
export class LithoPrimer {
  protected readonly vis = whenVisible();
  protected readonly mode = signal<Mode>('duv');

  private readonly specs: Record<Mode, {
    lambda: string; na: string; res: string; passes: number; waveLabel: string; note: string;
  }> = {
    euv: {
      lambda: '13.5 nm',
      na: '0.33',
      res: '~13 nm',
      passes: 1,
      waveLabel: 'EUV · 13.5 nm — short, sharp, single-exposure',
      note: 'Extreme ultraviolet draws the finest layers in ONE pass. Only ASML makes an EUV scanner; High-NA (0.55) pushes the single-shot floor to ~8 nm. This is the node TSMC builds Nvidia’s leading silicon on — and the one China is wholly denied.',
    },
    duv: {
      lambda: '193 nm',
      na: '1.35',
      res: '~38 nm',
      passes: 4,
      waveLabel: 'DUV · 193 nm — long wavelength, faked with many masks',
      note: 'Deep ultraviolet (193 nm ArF, water-immersion) can only resolve ~38 nm in one shot — far coarser than a 7 nm transistor. SMIC reaches 7 nm by self-aligned double/quad patterning (SADP/SAQP): split one layer into 3–4 litho-etch passes. Across a node, ~9 EUV exposures balloon to ~34 DUV ones — multiplying masks, cost, cycle time, and overlay defects, which is why SMIC yields ~50–60% vs TSMC’s 80–90%.',
    },
  };

  protected readonly spec = computed(() => this.specs[this.mode()]);
  protected readonly passList = computed(() => Array.from({ length: this.spec().passes }, (_, i) => i + 1));
  protected readonly lineList = [0, 1, 2, 3, 4, 5, 6, 7];

  /** spread 8 fine lines; in multi-pass DUV each pass prints a staggered subset of the comb. */
  protected lineLeft(pass: number, line: number): number {
    const passes = this.spec().passes;
    const base = (line / 8) * 100 + 3;
    const offset = passes > 1 ? ((pass - 1) / passes) * (100 / 8) : 0;
    return base + offset;
  }

  protected wavePath = computed(() => {
    const periods = this.mode() === 'euv' ? 16 : 2.2;
    const w = 340;
    const mid = 28;
    const amp = 18;
    const steps = 120;
    let d = `M0 ${mid}`;
    for (let i = 1; i <= steps; i++) {
      const x = (i / steps) * w;
      const y = mid - Math.sin((i / steps) * periods * 2 * Math.PI) * amp;
      d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return d;
  });

  protected readonly walls = [
    { k: 'Monopoly', t: 'One company, on Earth', d: 'Only ASML (Netherlands) makes an EUV scanner — a 30-year, multinational effort (Zeiss optics, Trumpf/Cymer light source). ~$200M per tool, 100,000+ parts. There is no second source to buy from.' },
    { k: 'Physics', t: 'EUV is brutally hard', d: '13.5 nm light is absorbed by air and glass, so it runs in vacuum off all-reflective mirrors polished to near-atomic flatness — illuminated by tin droplets vaporized by a laser ~50,000×/sec into plasma.' },
    { k: 'Controls', t: 'Walled off by policy', d: 'The Dutch government has blocked EUV exports to China since 2019, and curbed advanced DUV-immersion sales and servicing since 2023 — capping SMIC at 193 nm tools it already owns.' },
    { k: 'Yield', t: 'The penalty compounds', d: 'Each extra patterning pass multiplies cost and stacks overlay/edge-placement defects. Brute-forcing 7 nm is possible; 5 nm and below spirals past economic sense — Intel’s 10 nm lost ~5 years to the same trap.' },
  ];

  protected readonly vectors: Vector[] = [
    { horizon: 'Now', tone: 'now', title: 'Push DUV multi-patterning further', detail: 'Extend SADP/SAQP toward a 5 nm-class node — reportedly in development with Huawei, but at ~33% yield and 40–50% higher cost per wafer. It buys density, not economics.' },
    { horizon: 'Now', tone: 'now', title: 'Go up, not down — packaging & HBM', detail: 'Chiplets, 3D stacking, and domestic HBM (CXMT) recover system-level density without a smaller transistor. CloudMatrix’s scale-out is the same move at rack scale.' },
    { horizon: 'Now', tone: 'now', title: 'Stockpiles & grey-market servicing', detail: 'Keep the pre-control ASML DUV-immersion tools running, and source parts and maintenance around the restrictions to preserve 7 nm output.' },
    { horizon: 'Mid-term', tone: 'mid', title: 'Indigenous DUV scanners (SMEE)', detail: 'A domestic immersion-DUV scanner removes ASML dependence and servicing risk. SMEE is at ~28 nm-class today; the gating items are the light source, optics, and overlay precision.' },
    { horizon: 'Mid-term', tone: 'mid', title: 'A domestic toolchain', detail: 'Etch (AMEC), deposition (Naura), metrology, and the SiCarrier ecosystem to replace Applied Materials / Lam / TEL / KLA across the whole line.' },
    { horizon: 'Long shot', tone: 'long', title: 'Indigenous EUV — the real wall', detail: 'Alternative sources — laser-discharge plasma, or SSMB-EUV (steady-state microbunching) at Tsinghua — plus homegrown optics. High-risk, late-2020s-and-beyond, and reportedly under trial at Huawei / Harbin Institute.' },
  ];
}

import { Injectable } from '@angular/core';

export interface FaviconState {
  /** 0..1 reading progress */
  progress: number;
  /** accent hex color */
  color: string;
  /** glyph key reflecting the active section / mode */
  glyph: string;
}

/**
 * Renders a dynamic favicon on a canvas: a reading-progress ring plus a
 * per-chapter glyph in the chapter's accent color. Updated reactively as the
 * reader scrolls — the tab icon reflects exactly what they're reading/doing.
 */
@Injectable({ providedIn: 'root' })
export class FaviconService {
  private canvas: HTMLCanvasElement | null = null;
  private link: HTMLLinkElement | null = null;
  private readonly S = 64; // render size; browsers downscale crisply

  private ctx(): CanvasRenderingContext2D | null {
    if (typeof document === 'undefined') return null;
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.width = this.S;
      this.canvas.height = this.S;
    }
    return this.canvas.getContext('2d');
  }

  private linkEl(): HTMLLinkElement | null {
    if (typeof document === 'undefined') return null;
    if (!this.link) {
      let l = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
      if (!l) {
        l = document.createElement('link');
        l.rel = 'icon';
        document.head.appendChild(l);
      }
      l.type = 'image/png';
      this.link = l;
    }
    return this.link;
  }

  draw(state: FaviconState): void {
    const ctx = this.ctx();
    const link = this.linkEl();
    if (!ctx || !link) return;
    try {
      const S = this.S;
      const c = S / 2;
      ctx.clearRect(0, 0, S, S);

      // rounded dark tile
      ctx.fillStyle = '#0b0d13';
      this.roundRect(ctx, 2, 2, S - 4, S - 4, 14);
      ctx.fill();

      // progress ring track + arc
      const R = 27;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 4.5;
      ctx.strokeStyle = 'rgba(255,255,255,0.10)';
      ctx.beginPath();
      ctx.arc(c, c, R, 0, Math.PI * 2);
      ctx.stroke();

      const p = Math.max(0, Math.min(1, state.progress));
      if (p > 0.001) {
        ctx.strokeStyle = state.color;
        ctx.beginPath();
        ctx.arc(c, c, R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p);
        ctx.stroke();
      }

      // glyph
      ctx.strokeStyle = state.color;
      ctx.fillStyle = state.color;
      ctx.lineWidth = 5;
      this.glyph(ctx, state.glyph, c);

      link.href = this.canvas!.toDataURL('image/png');
    } catch {
      /* favicon is non-essential; never throw into the page */
    }
  }

  private roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
  ): void {
    if (typeof ctx.roundRect === 'function') {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      return;
    }
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  /** Draw a glyph centered at (c,c). Coordinates tuned for a 64px canvas. */
  private glyph(ctx: CanvasRenderingContext2D, key: string, c: number): void {
    const line = (pts: Array<[number, number]>, close = false): void => {
      ctx.beginPath();
      pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      if (close) ctx.closePath();
      ctx.stroke();
    };
    const fillPoly = (pts: Array<[number, number]>): void => {
      ctx.beginPath();
      pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.closePath();
      ctx.fill();
    };
    const dot = (x: number, y: number, r = 2.4): void => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };
    const text = (t: string, px = 24): void => {
      ctx.font = `700 ${px}px ui-sans-serif, system-ui, "Segoe UI", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(t, c, c + 1);
    };

    switch (key) {
      case 'cage': // thesis — the cage
        [23, 29, 35, 41].forEach((x) => line([[x, 22], [x, 42]]));
        line([[21, 22], [43, 22]]);
        line([[21, 42], [43, 42]]);
        break;
      case 'check': // jensen — agreement
        line([[22, 33], [29, 40], [43, 23]]);
        break;
      case 'coin': // economics
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(c, c, 12, 0, Math.PI * 2);
        ctx.stroke();
        text('$', 18);
        break;
      case 'split': // two levels
        ctx.fillRect(21, 25, 22, 5);
        ctx.fillRect(27, 36, 16, 5);
        break;
      case 'chip': // silicon
        ctx.lineWidth = 4;
        ctx.strokeRect(23, 23, 18, 18);
        [27, 32, 37].forEach((x) => {
          line([[x, 18], [x, 23]]);
          line([[x, 41], [x, 46]]);
        });
        [27, 32, 37].forEach((y) => {
          line([[18, y], [23, y]]);
          line([[41, y], [46, y]]);
        });
        ctx.fillRect(29, 29, 6, 6);
        break;
      case 'grid': // system
        [24, 32, 40].forEach((x) => [24, 32, 40].forEach((y) => dot(x, y)));
        break;
      case 'bolt': // power
        fillPoly([[35, 20], [23, 34], [31, 34], [29, 44], [41, 29], [33, 29]]);
        break;
      case 'code': // software
        line([[28, 23], [20, 32], [28, 41]]);
        line([[36, 23], [44, 32], [36, 41]]);
        break;
      case 'loop': // deepseek — closed loop
        ctx.lineWidth = 4.5;
        ctx.beginPath();
        ctx.arc(c, c, 11, -0.35 * Math.PI, 1.25 * Math.PI);
        ctx.stroke();
        dot(40, 24, 3);
        break;
      case 'lens': // lithography — wafer / lens
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(c, c, 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(c, c, 5.5, 0, Math.PI * 2);
        ctx.stroke();
        break;
      case 'steps': // smic gap — descending steps
        line([[22, 23], [22, 30], [30, 30], [30, 37], [40, 37]]);
        break;
      case 'trend': // catch-up — rising
        line([[21, 41], [41, 23]]);
        line([[41, 23], [31, 23]]);
        line([[41, 23], [41, 33]]);
        break;
      case 'fork': // the fork
        line([[32, 43], [32, 31]]);
        line([[32, 31], [22, 21]]);
        line([[32, 31], [42, 21]]);
        break;
      case 'rebuttal': // answering — vs
        text('vs', 19);
        break;
      case 'merge': // synthesis
        line([[22, 21], [32, 32]]);
        line([[42, 21], [32, 32]]);
        line([[32, 32], [32, 44]]);
        break;
      case 'flag': // conclusion
        line([[24, 20], [24, 45]]);
        fillPoly([[24, 20], [43, 25], [24, 30]]);
        break;
      case 'menu': // contents open
        [25, 32, 39].forEach((y) => line([[22, y], [42, y]]));
        break;
      case 'brand': // idle / top — diamond mark
      default:
        ctx.lineWidth = 4;
        line([[32, 19], [45, 32], [32, 45], [19, 32]], true);
        dot(32, 32, 3);
        break;
    }
  }
}

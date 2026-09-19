// Procedural Web Audio API sound synthesizer
// Zero external assets required, immediate response, mobile compatible

class SoundService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // AudioContext will be initialized on first user interaction to satisfy browser autoplay policies
  }

  private getContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    try {
      localStorage.setItem('aghanya_sound_muted', muted ? 'true' : 'false');
    } catch {
      // ignore
    }
  }

  public getMuted(): boolean {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aghanya_sound_muted');
      if (saved !== null) {
        this.isMuted = saved === 'true';
      }
    }
    return this.isMuted;
  }

  // Play a soft tap/click sound
  public playClick() {
    const ctx = this.getContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }

  // Play a cheerful "Ding! Correct!" chord
  public playCorrect() {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.3);
    });
  }

  // Play a gentle, encouraging "Let's try again!" chime (never harsh or buzzer-like!)
  public playEncouragement() {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [440, 392]; // A4, G4 - gentle descending pair
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

      gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.25);
    });
  }

  // Play a star sparkle sound
  public playStar(starIndex: number = 0) {
    const ctx = this.getContext();
    if (!ctx) return;

    const baseFreq = 587.33 + starIndex * 150; // D5, E5, F#5
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  }

  // Play a celebratory level-complete fanfare!
  public playLevelComplete() {
    const ctx = this.getContext();
    if (!ctx) return;

    // Fanfare chords: C -> E -> G -> High C + High E
    const chords = [
      { freqs: [261.63, 329.63, 392.00], time: 0, dur: 0.15 },
      { freqs: [293.66, 369.99, 440.00], time: 0.15, dur: 0.15 },
      { freqs: [329.63, 415.30, 493.88], time: 0.30, dur: 0.2 },
      { freqs: [523.25, 659.25, 783.99, 1046.50], time: 0.55, dur: 0.6 },
    ];

    chords.forEach(c => {
      c.freqs.forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + c.time);

        gain.gain.setValueAtTime(0.12, ctx.currentTime + c.time);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + c.time + c.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + c.time);
        osc.stop(ctx.currentTime + c.time + c.dur);
      });
    });
  }

  // Play an XP collect pop
  public playXpGain() {
    const ctx = this.getContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(700, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  }
}

export const soundService = new SoundService();

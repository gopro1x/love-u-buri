class SoundManager {
  private context: AudioContext | null = null;
  private isMuted: boolean = false;
  private isInitialized: boolean = false;
  private reverbBuffer: AudioBuffer | null = null;
  private masterGain: GainNode | null = null;

  constructor() {
    // Lazy load - no logic here
  }

  /**
   * Initializes audio context.
   * MUST be called from a direct click handler or interaction.
   */
  public async ensureInitialized() {
    try {
      // 1. Create Context if missing
      if (!this.context) {
        const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
        if (AudioContextClass) {
          this.context = new AudioContextClass();
        }
      }

      // 2. Force Resume (Critical for browser autoplay policies)
      if (this.context && this.context.state === 'suspended') {
        await this.context.resume();
      }

      // 3. Create master gain
      if (this.context && !this.masterGain) {
        this.masterGain = this.context.createGain();
        this.masterGain.gain.value = 1.0;
        this.masterGain.connect(this.context.destination);
      }

      // 4. Build reverb impulse response
      if (this.context && !this.reverbBuffer) {
        this.reverbBuffer = this.buildReverbImpulse(this.context, 2.0, 2.5);
      }

      if (!this.isInitialized) {
        this.isInitialized = true;
        console.log("Audio Context initialized/resumed");
      }

    } catch (error) {
      console.error("Audio initialization failed:", error);
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public toggleMute() {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public getMuted() {
    return this.isMuted;
  }

  // ═══════════════════════════════════════════
  //  AUDIO ENGINE — Warm, Romantic Sound Design
  // ═══════════════════════════════════════════

  /**
   * Build a synthetic reverb impulse response.
   * Creates an ethereal tail that makes every tone feel like
   * it's played inside a candlelit cathedral.
   */
  private buildReverbImpulse(ctx: AudioContext, duration: number, decay: number): AudioBuffer {
    const sampleRate = ctx.sampleRate;
    const length = sampleRate * duration;
    const buffer = ctx.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        // Exponential decay with random noise = natural reverb
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
      }
    }

    return buffer;
  }

  /**
   * Creates a warm, detuned tone with low-pass filtering.
   * Two oscillators slightly detuned from each other produce
   * a rich "chorus" effect — like a real instrument, not a beep.
   */
  private createWarmTone(
    freq: number,
    startTime: number,
    duration: number,
    volume: number = 0.04,
    waveType: OscillatorType = 'sine',
    useReverb: boolean = false,
  ) {
    if (!this.context || !this.masterGain) return;

    const ctx = this.context;

    // --- Two detuned oscillators for warmth ---
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    osc1.type = waveType;
    osc2.type = waveType;
    osc1.frequency.setValueAtTime(freq, startTime);
    osc2.frequency.setValueAtTime(freq, startTime);
    // Slight detune creates a shimmer / chorus
    osc1.detune.setValueAtTime(-6, startTime);
    osc2.detune.setValueAtTime(+6, startTime);

    // --- Low-pass filter to remove harsh overtones ---
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(Math.min(freq * 3, 4000), startTime);
    filter.Q.setValueAtTime(0.7, startTime);

    // --- Smooth ADSR envelope ---
    const envelope = ctx.createGain();
    const attack = Math.min(0.08, duration * 0.15);
    const release = Math.min(duration * 0.6, 1.5);

    envelope.gain.setValueAtTime(0, startTime);
    // Attack: gentle fade in
    envelope.gain.linearRampToValueAtTime(volume, startTime + attack);
    // Sustain briefly at peak
    envelope.gain.setValueAtTime(volume, startTime + duration - release);
    // Release: long, smooth fade out
    envelope.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // --- Wire up the signal chain ---
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(envelope);

    if (useReverb && this.reverbBuffer) {
      // Dry path (direct)
      const dryGain = ctx.createGain();
      dryGain.gain.setValueAtTime(0.7, startTime);
      envelope.connect(dryGain);
      dryGain.connect(this.masterGain);

      // Wet path (reverb)
      const convolver = ctx.createConvolver();
      convolver.buffer = this.reverbBuffer;
      const wetGain = ctx.createGain();
      wetGain.gain.setValueAtTime(0.3, startTime);
      envelope.connect(convolver);
      convolver.connect(wetGain);
      wetGain.connect(this.masterGain);
    } else {
      envelope.connect(this.masterGain);
    }

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration + 0.1);
    osc2.stop(startTime + duration + 0.1);
  }

  // ═══════════════════════════════════════════
  //  PUBLIC SOUND EFFECTS
  // ═══════════════════════════════════════════

  /**
   * Card Flip — Gentle music-box chime
   * Two quick notes from a Cmaj7 chord,
   * like tapping a crystal glass softly.
   */
  public playCardFlip() {
    if (this.isMuted || !this.context) return;

    try {
      const now = this.context.currentTime;

      // E5 → G5 — a gentle major third
      this.createWarmTone(659.25, now, 0.35, 0.06, 'sine', false);
      this.createWarmTone(783.99, now + 0.06, 0.30, 0.04, 'sine', false);
    } catch (e) {
      console.warn("Card flip sound error:", e);
    }
  }

  /**
   * Transition — Soft ascending shimmer
   * A gentle harp-like sweep of notes rising upward,
   * creating the feeling of turning a page in a love story.
   */
  public playTransition() {
    if (this.isMuted || !this.context) return;

    try {
      const now = this.context.currentTime;

      // Ascending Cmaj7 voicing: C4 → E4 → G4 → B4
      const notes = [261.63, 329.63, 392.00, 493.88];
      const spacing = 0.07;

      notes.forEach((freq, i) => {
        this.createWarmTone(
          freq,
          now + i * spacing,
          0.5 - i * 0.05,
          0.035 - i * 0.005,
          'sine',
          true,
        );
      });
    } catch (e) {
      console.warn("Transition sound error:", e);
    }
  }

  /**
   * Success — Beautiful romantic chord progression
   * A rising Cmaj7 → Fmaj7 arpeggio with full reverb,
   * like church bells ringing at a wedding.
   */
  public playSuccess() {
    if (this.isMuted || !this.context) return;

    try {
      const now = this.context.currentTime;

      // Phase 1: Cmaj7 arpeggio (C4 → E4 → G4 → B4)
      const cmaj7 = [261.63, 329.63, 392.00, 493.88];
      cmaj7.forEach((freq, i) => {
        this.createWarmTone(freq, now + i * 0.12, 2.0, 0.045, 'sine', true);
      });

      // Phase 2: Fmaj7 arpeggio (F4 → A4 → C5 → E5) — starts after Cmaj7
      const fmaj7 = [349.23, 440.00, 523.25, 659.25];
      const phase2Start = now + 0.6;
      fmaj7.forEach((freq, i) => {
        this.createWarmTone(freq, phase2Start + i * 0.12, 2.5, 0.04, 'sine', true);
      });

      // Phase 3: High octave shimmer — a sparkling finish
      const shimmer = [783.99, 1046.50]; // G5, C6
      const phase3Start = now + 1.3;
      shimmer.forEach((freq, i) => {
        this.createWarmTone(freq, phase3Start + i * 0.15, 3.0, 0.025, 'sine', true);
      });

    } catch (e) {
      console.warn("Success sound error:", e);
    }
  }
}

export const soundManager = new SoundManager();
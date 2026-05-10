"use client";

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let bgmGain: GainNode | null = null;
let bgmTimer: number | null = null;
let bgmStep = 0;
let bgmEnabled = false;

const NOTE_FREQ: Record<string, number> = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
};

const BGM_LEAD = [
  "E4",
  "G4",
  "C5",
  "G4",
  "E4",
  "G4",
  "C5",
  "E5",
  "D5",
  "B4",
  "G4",
  "B4",
  "D5",
  "B4",
  "G4",
  "E4",
  "F4",
  "A4",
  "C5",
  "A4",
  "F4",
  "A4",
  "C5",
  "F4",
  "E4",
  "G4",
  "C5",
  "G4",
  "E4",
  "C4",
  "G4",
  "E4",
];

const BGM_BASS = [
  "C4",
  "C4",
  "G4",
  "G4",
  "A4",
  "A4",
  "F4",
  "F4",
  "C4",
  "C4",
  "G4",
  "G4",
  "F4",
  "F4",
  "C4",
  "C4",
];

const BPM = 108;
const STEP = 60 / BPM / 2;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (ctx) return ctx;
  const C =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  if (!C) return null;
  ctx = new C();
  masterGain = ctx.createGain();
  masterGain.gain.value = 0.0;
  masterGain.connect(ctx.destination);
  bgmGain = ctx.createGain();
  bgmGain.gain.value = 0.18;
  bgmGain.connect(masterGain);
  return ctx;
}

function blip(
  freq: number,
  start: number,
  duration: number,
  type: OscillatorType,
  gainTarget: GainNode,
  peak = 0.5,
) {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(peak, start + 0.01);
  g.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.connect(g);
  g.connect(gainTarget);
  osc.start(start);
  osc.stop(start + duration + 0.05);
}

function scheduleBgmTick() {
  if (!ctx || !bgmGain || !bgmEnabled) return;
  const lookahead = 0.25;
  const horizon = ctx.currentTime + lookahead;
  while (bgmStep * STEP + bgmStartTime < horizon) {
    const t = bgmStartTime + bgmStep * STEP;
    const lead = BGM_LEAD[bgmStep % BGM_LEAD.length];
    const bass = BGM_BASS[Math.floor(bgmStep / 2) % BGM_BASS.length];
    if (lead) blip(NOTE_FREQ[lead], t, STEP * 0.85, "square", bgmGain, 0.35);
    if (bass && bgmStep % 2 === 0)
      blip(NOTE_FREQ[bass] / 2, t, STEP * 1.6, "triangle", bgmGain, 0.5);
    bgmStep++;
  }
  bgmTimer = window.setTimeout(scheduleBgmTick, 80);
}

let bgmStartTime = 0;

export async function setSoundEnabled(enabled: boolean) {
  const c = getCtx();
  if (!c || !masterGain) return;
  if (c.state === "suspended") {
    try {
      await c.resume();
    } catch {}
  }
  const target = enabled ? 0.6 : 0.0;
  masterGain.gain.cancelScheduledValues(c.currentTime);
  masterGain.gain.setTargetAtTime(target, c.currentTime, 0.05);
  if (enabled && !bgmEnabled) {
    bgmEnabled = true;
    bgmStep = 0;
    bgmStartTime = c.currentTime + 0.05;
    scheduleBgmTick();
  } else if (!enabled && bgmEnabled) {
    bgmEnabled = false;
    if (bgmTimer !== null) {
      clearTimeout(bgmTimer);
      bgmTimer = null;
    }
  }
}

export function playJump() {
  const c = getCtx();
  if (!c || !masterGain || !bgmEnabled) return;
  const t = c.currentTime;
  blip(440, t, 0.08, "square", masterGain, 0.3);
  blip(660, t + 0.05, 0.1, "square", masterGain, 0.25);
}

export function playInteract() {
  const c = getCtx();
  if (!c || !masterGain || !bgmEnabled) return;
  const t = c.currentTime;
  blip(NOTE_FREQ.E5, t, 0.1, "square", masterGain, 0.3);
  blip(NOTE_FREQ.C5, t + 0.07, 0.18, "square", masterGain, 0.25);
}

export function playClose() {
  const c = getCtx();
  if (!c || !masterGain || !bgmEnabled) return;
  const t = c.currentTime;
  blip(NOTE_FREQ.C5, t, 0.08, "square", masterGain, 0.25);
  blip(NOTE_FREQ.G4, t + 0.05, 0.14, "square", masterGain, 0.2);
}

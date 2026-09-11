import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import type { ContentData } from '../Types';

interface AudioContextWindow extends Window {
  webkitAudioContext?: typeof AudioContext;
}

class RoyalMelodySynth {
  ctx: AudioContext | null = null;
  isPlaying = false;
  timer: ReturnType<typeof setTimeout> | null = null;

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as AudioContextWindow).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
  }

  playNote(freq: number, start: number, dur: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, start);

    gain.gain.setValueAtTime(0.001, start);
    gain.gain.exponentialRampToValueAtTime(0.06, start + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(start);
    osc.stop(start + dur);
  }

  start() {
    this.init();
    this.isPlaying = true;
    const notes = [329.63, 415.3, 493.88, 554.37, 622.25, 659.25, 493.88, 415.3];
    let noteIdx = 0;

    const loop = () => {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      this.playNote(notes[noteIdx % notes.length], now, 1.3);
      if (noteIdx % 2 === 0) {
        this.playNote(notes[(noteIdx + 2) % notes.length] / 2, now + 0.1, 1.5);
      }
      noteIdx++;
      this.timer = setTimeout(loop, 1100);
    };

    loop();
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) clearTimeout(this.timer);
  }
}

export default function Music({ labels }: { labels: ContentData }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef<RoyalMelodySynth | null>(null);

  useEffect(() => {
    synthRef.current = new RoyalMelodySynth();
    return () => synthRef.current?.stop();
  }, []);

  const toggleMusic = () => {
    if (!synthRef.current) return;
    if (isPlaying) {
      synthRef.current.stop();
      setIsPlaying(false);
    } else {
      synthRef.current.start();
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={toggleMusic}
      aria-label={isPlaying ? labels.musicOn.text : labels.music.text}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FDFBF7]/90 backdrop-blur-md border border-[#B09060]/35 shadow-sm text-xs font-montserrat uppercase tracking-wider text-[#4A3E20] hover:bg-white transition-all cursor-pointer"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#B58A3C] animate-pulse" />
          <span className="text-[10px]">{labels.musicOn.text}</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-[#7A6840]" />
          <span className="text-[10px]">{labels.music.text}</span>
        </>
      )}
    </button>
  );
}
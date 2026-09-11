import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import type { PageProps } from '../Types';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Count_Down({ data }: PageProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const weddingDate = new Date(data.countDown.date);
    const updateTimer = () => {
      const diff = weddingDate.getTime() - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [data.countDown.date]);

  const timerUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MIN', value: timeLeft.minutes },
    { label: 'SEC', value: timeLeft.seconds },
  ];

  return (
    <section
      id="countdown"
      className="relative w-full h-svh min-h-svh py-8 px-4 overflow-hidden flex flex-col items-center justify-center select-none"
    >
      <img
        alt=""
        aria-hidden="true"
        src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=85"
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-[#FDFBF7]/30" />

      {/* <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
        {LEAVES.map((leaf, idx) => (
          <div
            key={idx}
            className="absolute top-[8%] animate-leaf-flutter"
            style={{
              left: leaf.left,
              width: `${leaf.width}px`,
              height: `${leaf.height}px`,
              animationDelay: `${leaf.delay}s`,
            }}
          >
            <svg viewBox="0 0 40 60" width="100%" height="100%">
              <path d="M 20 5 C 40 20, 35 45, 20 55 C 5 45, 0 20, 20 5 Z" fill="#404D29" />
              <path d="M 20 5 Q 16 30, 20 55" stroke="#2B351B" strokeWidth="0.8" fill="none" opacity="0.6" />
              <path d="M 20 55 L 20 59" stroke="#2B351B" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        ))}
      </div> */}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-20 flex flex-col items-center text-center px-4 w-full max-w-110"
      >
        <div className="flex justify-center mb-6">
          <span className="font-religath text-sm md:text-lg font-normal uppercase tracking-[0.3em] text-[#2B3B25]">
            {data.content.countdown.text}
          </span>
        </div>

        <div className="flex justify-center items-center gap-2 sm:gap-4 bg-[#FDFBF7]/85 backdrop-blur-sm px-5 py-4 rounded-xl border border-[#B58A3C]/30 shadow-md">
          {timerUnits.map((unit, index) => (
            <React.Fragment key={unit.label}>
              {index > 0 && <div className="h-7 w-[1.5px] bg-[#7B0F1A]/20" />}
              <div className="text-center px-2 py-1">
                <div className="font-religath text-2xl md:text-4xl text-[#2B3B25] tabular-nums font-normal">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div className="mt-1 font-religath text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#4E6540]">
                  {unit.label}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

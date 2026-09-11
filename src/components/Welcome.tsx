import React from 'react';
import { motion } from 'motion/react';
import type { PageProps } from '../Types';

export default function Welcome({ data, isEditor, onUpdateText }: PageProps) {
  return (
    <section
      id="welcome"
      aria-label={data.content.welcome.text}
      className="relative w-full h-svh min-h-svh overflow-hidden flex items-center justify-center select-none py-8 px-4"
    >
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img
          alt="Traditional wedding mandap welcome backdrop"
          aria-hidden="true"
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=85"
          className="w-full h-full object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 bg-[#FDFBF7]/35" />
      </div>

      <div className="relative z-10 w-[84%] max-w-85 lg:max-w-150 mx-auto lg:text-center text-left flex flex-col items-start lg:items-center px-4 box-border">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-modernline text-[clamp(22px,3.8vw,28px)] lg:text-[clamp(24px,2.2vw,32px)] text-[#4A3E20] mb-1 leading-none normal-case"
        >
          {data.invite.label.text}
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="font-religath text-[clamp(19px,4.5vw,25px)] lg:text-[clamp(24px,2.8vw,34px)] uppercase text-[#7A6840] mb-0.5 leading-[1.1] tracking-[0.04em] font-normal"
        >
          {isEditor && onUpdateText ? (
            <input
              value={data.brideParents.text}
              onChange={(e) => onUpdateText('brideParents', e.target.value)}
              className="w-full border border-[#D5A967] bg-[#FFF9F0] px-2 py-1 text-center outline-none"
            />
          ) : (
            data.brideParents.text
          )}
        </motion.h3>

        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="font-religath text-[clamp(19px,4.5vw,25px)] lg:text-[clamp(24px,2.8vw,34px)] uppercase text-[#7A6840] mb-2.5 leading-[1.1] tracking-[0.04em] font-normal"
        >
          {isEditor && onUpdateText ? (
            <input
              value={data.groomParents.text}
              onChange={(e) => onUpdateText('groomParents', e.target.value)}
              className="w-full border border-[#D5A967] bg-[#FFF9F0] px-2 py-1 text-center outline-none"
            />
          ) : (
            data.groomParents.text
          )}
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 0.8, scaleX: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
          className="w-11 h-[0.75px] bg-[#B09060] mb-3 lg:mx-auto origin-left lg:origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          className="font-cormorant font-semibold text-[clamp(13.5px,3.5vw,15.5px)] lg:text-[clamp(15px,1.3vw,18px)] text-[#4A3E20] leading-normal m-0 max-w-full lg:max-w-120"
        >
          {data.invite.blessing.text}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
          aria-hidden="true"
          className="flex items-center gap-2 mt-3.5 self-start lg:self-center"
        >
          <div className="w-7 h-[0.75px] bg-[#B58A3C] opacity-55" />
          <svg viewBox="0 0 40 22" width="36" height="18" fill="none">
            <path
              d="M20 20 C20 20 9 11 5 4 C9 7 14 9 20 9 C26 9 31 7 35 4 C31 11 20 20 20 20Z"
              fill="#B58A3C"
              opacity="0.65"
            />
            <path
              d="M20 20 C20 20 13 13 11 7 C14 9.5 17 11 20 11 C23 11 26 9.5 29 7 C27 13 20 20 20 20Z"
              fill="#B58A3C"
              opacity="0.4"
            />
            <circle cx="20" cy="7" r="2.2" fill="#B58A3C" opacity="0.55" />
          </svg>
          <div className="w-7 h-[0.75px] bg-[#B58A3C] opacity-55" />
        </motion.div>
      </div>
    </section>
  );
}

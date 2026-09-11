import React from 'react';
import type { PageProps } from '../Types';

export default function Footer({ data }: PageProps) {
  return (
    <footer
      id="footer"
      className="relative w-full py-12 sm:py-14 px-4 overflow-hidden select-none bg-[#FAF7F2] text-center border-t border-[#E8DFC8]/60 flex flex-col items-center justify-center"
    >
      <img
        alt=""
        aria-hidden="true"
        src="https://images.unsplash.com/photo-1507504031003-b417c9a?auto=format&fit=crop&w=1800&q=85"
        className="absolute inset-0 h-full w-full object-cover opacity-10 pointer-events-none"
      />
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="wavy-lattice" width="64" height="32" patternUnits="userSpaceOnUse">
            <path
              d="M0 16 C16 0, 32 32, 48 16 C56 8, 60 8, 64 16 M-16 16 C0 0, 16 32, 32 16"
              fill="none"
              stroke="#D8CCB7"
              strokeWidth="0.8"
            />
            <path
              d="M0 0 C16 16, 32 -16, 48 0 C56 8, 60 8, 64 0"
              fill="none"
              stroke="#D8CCB7"
              strokeWidth="0.8"
            />
            <path
              d="M0 32 C16 48, 32 16, 48 32 C56 40, 60 40, 64 32"
              fill="none"
              stroke="#D8CCB7"
              strokeWidth="0.8"
            />
            <circle cx="32" cy="16" r="1.2" fill="#CBBDA4" opacity="0.65" />
            <circle cx="0" cy="16" r="1.2" fill="#CBBDA4" opacity="0.65" />
            <circle cx="64" cy="16" r="1.2" fill="#CBBDA4" opacity="0.65" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wavy-lattice)" />
      </svg>

      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 whitespace-nowrap opacity-[0.14]"
      >
        <span className="font-montserrat text-[26px] sm:text-[34px] md:text-[40px] tracking-[0.45em] text-[#55634A] font-light">
          {data.content.footerWatermark.text}
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-md mx-auto">
        <p className="font-montserrat font-medium text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-[#616D54] mb-1.5">
          {data.content.footerCraftedBy.text}
        </p>

        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="w-10 h-10 rounded-full bg-[#7D0C1E] flex items-center justify-center shadow-[0_2px_10px_rgba(125,12,30,0.28)] shrink-0">
            <svg viewBox="0 0 36 36" width="25" height="25" fill="none">
              <path
                d="M18 9.5 C14.2 4.2, 9.8 7.5, 11.2 13 C12.6 18.2, 18 21.8, 18 21.8 C18 21.8, 23.4 18.2, 24.8 13 C26.2 7.5, 21.8 4.2, 18 9.5 Z"
                stroke="#FAF7F2"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 10.8 L18.7 12.8 L20.7 13.5 L18.7 14.2 L18 16.2 L17.3 14.2 L15.3 13.5 L17.3 12.8 Z"
                fill="#FAF7F2"
              />
              <path
                d="M9.5 19.5 L9.5 27 C9.5 27.8 10.2 28.5 11 28.5 L25 28.5 C25.8 28.5 26.5 27.8 26.5 27 L26.5 19.5"
                stroke="#FAF7F2"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.5 20.2 L18 25 L26.5 20.2"
                stroke="#FAF7F2"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 27.5 L15 23 M26 27.5 L21 23"
                stroke="#FAF7F2"
                strokeWidth="1.1"
                strokeLinecap="round"
                opacity="0.8"
              />
            </svg>
          </div>

          <span className="font-parisienne text-[32px] sm:text-[38px] text-[#22331D] leading-none tracking-normal font-normal">
            {data.content.footerBrand.text}
          </span>
        </div>

        <div className="font-montserrat text-[11px] sm:text-[12px] text-[#55634A] leading-relaxed mb-3.5 space-y-0.5">
          <p className="m-0">{data.content.footerLineOne.text}</p>
          <p className="m-0">{data.content.footerLineTwo.text}</p>
        </div>

        <div className="flex items-center gap-3 justify-center mb-3.5">
          <a
            href="https://www.instagram.com/craftyart_invitation?stkn=MWxpNG8zazh6Z283cw=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-8 h-8 rounded-full border border-[#D5C7B2] flex items-center justify-center text-[#55634A] hover:border-[#7D0C1E] hover:text-[#7D0C1E] hover:bg-white/60 transition-all cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
            </svg>
          </a>

          <a
            href="https://wa.me/inviteque"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-8 h-8 rounded-full border border-[#D5C7B2] flex items-center justify-center text-[#55634A] hover:border-[#7D0C1E] hover:text-[#7D0C1E] hover:bg-white/60 transition-all cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              <path d="M9.5 9a1.5 1.5 0 0 0-1.5 1.5c0 2.5 2.5 5 5 5a1.5 1.5 0 0 0 1.5-1.5v-1a.5.5 0 0 0-.5-.5l-1.5-.3a.5.5 0 0 0-.5.2l-.5.6a4.3 4.3 0 0 1-2.5-2.5l.6-.5a.5.5 0 0 0 .2-.5l-.3-1.5a.5.5 0 0 0-.5-.5h-1z" strokeWidth="1.2" fill="currentColor" fillOpacity="0.2" />
            </svg>
          </a>
        </div>

        <a
          href="https://www.inviteque.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-montserrat text-[11px] sm:text-[11.5px] tracking-[0.08em] text-[#55634A] hover:text-[#22331D] transition-colors"
        >
          {data.hashtag.text}
        </a>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-2 left-2 sm:left-4 pointer-events-none select-none opacity-45"
      >
        <svg viewBox="0 0 120 45" width="90" height="34" fill="none">
          <path d="M5 40 Q45 28 115 10" stroke="#7E8F74" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M18 35 Q14 22 28 20 Q24 33 18 35 Z" fill="#7E8F74" opacity="0.8" />
          <path d="M38 29 Q34 16 48 15 Q44 28 38 29 Z" fill="#7E8F74" opacity="0.75" />
          <path d="M58 24 Q54 11 68 10 Q64 23 58 24 Z" fill="#7E8F74" opacity="0.7" />
          <path d="M78 19 Q75 7 88 6 Q84 18 78 19 Z" fill="#7E8F74" opacity="0.65" />
          <path d="M98 14 Q95 3 107 3 Q104 14 98 14 Z" fill="#7E8F74" opacity="0.6" />
        </svg>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-2 right-2 sm:right-4 pointer-events-none select-none opacity-45 -scale-x-100"
      >
        <svg viewBox="0 0 120 45" width="90" height="34" fill="none">
          <path d="M5 40 Q45 28 115 10" stroke="#7E8F74" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M18 35 Q14 22 28 20 Q24 33 18 35 Z" fill="#7E8F74" opacity="0.8" />
          <path d="M38 29 Q34 16 48 15 Q44 28 38 29 Z" fill="#7E8F74" opacity="0.75" />
          <path d="M58 24 Q54 11 68 10 Q64 23 58 24 Z" fill="#7E8F74" opacity="0.7" />
          <path d="M78 19 Q75 7 88 6 Q84 18 78 19 Z" fill="#7E8F74" opacity="0.65" />
          <path d="M98 14 Q95 3 107 3 Q104 14 98 14 Z" fill="#7E8F74" opacity="0.6" />
        </svg>
      </div>
    </footer>
  );
}

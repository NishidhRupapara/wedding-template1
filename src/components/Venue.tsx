import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Copy, Check, ExternalLink, Pencil, X } from 'lucide-react';
import type { PageProps } from '../Types';

export default function Venue({ data, isEditor, onUpdateText }: PageProps) {
  const [copied, setCopied] = useState(false);
  const [locationUrlOpen, setLocationUrlOpen] = useState(false);
  const venueAddress = data.weddingVenue.text;
  const mapsUrl = data.weddingMapUrl?.text || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.weddingMapQuery.text)}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(venueAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="venue"
      aria-label={data.content.venue.text}
      className="relative w-full h-svh min-h-svh flex flex-col items-center justify-center overflow-hidden py-8 px-4 select-none"
    >
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img
          alt="Traditional Indian wedding mandap venue illustration"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnSLVT-qOU4SD6Z1FcF2GIXDggSNKENJQ1mdAJ7xkgpzz64A7W9rhIoVU&s=10"
          onError={(e) => {
            e.currentTarget.src = '/assets/templates/midnight-waltz/venue-mobile.svg';
          }}
          className="w-full h-full object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 bg-[#FDFBF7]/30" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-95 lg:max-w-140 mx-auto box-border">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-modernline text-[clamp(20px,4vw,28px)] text-[#4A3E20] mb-1 leading-none normal-case"
        >
          {data.content.venue.text}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0.8 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          aria-hidden="true"
          className="flex items-center justify-center gap-2 mt-0.5 mb-2.5"
        >
          <div className="w-6.5 h-[0.7px] bg-[#B09060] opacity-55" />
          <svg viewBox="0 0 32 18" width="30" height="17" fill="none">
            <path
              d="M16 16C16 16 8 9 5 4C8 6 12 8 16 8C20 8 24 6 27 4C24 9 16 16 16 16Z"
              fill="#B09060"
              opacity="0.65"
            />
            <path
              d="M16 16C16 16 11 10 10 6C12.5 8 14.5 9 16 9C17.5 9 19.5 8 22 6C21 10 16 16 16 16Z"
              fill="#B09060"
              opacity="0.4"
            />
            <circle cx="16" cy="6" r="1.8" fill="#B09060" opacity="0.55" />
          </svg>
          <div className="w-6.5 h-[0.7px] bg-[#B09060] opacity-55" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="font-religath text-[clamp(21px,5.2vw,30px)] uppercase text-[#7A6840] mt-1 mb-1.5 leading-[1.15] tracking-[0.04em] font-normal"
        >
          {isEditor && onUpdateText ? (
            <input
              value={data.weddingVenue.text}
              onChange={(e) => onUpdateText('weddingVenue', e.target.value)}
              className="border border-[#D5A967] bg-[#FFF9F0] px-2 py-1 text-center outline-none"
            />
          ) : (
            data.weddingVenue.text
          )}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
          className="flex flex-col items-center gap-0.5 mb-2.5 px-4"
        >
          <p className="font-cormorant font-semibold text-[clamp(12px,3.2vw,14.5px)] text-[#4A3E20] m-0 leading-[1.35] opacity-90">
            {isEditor && onUpdateText ? (
              <input
                value={data.weddingMapQuery.text}
                onChange={(e) => onUpdateText('weddingMapQuery', e.target.value)}
                className="border border-[#D5A967] bg-[#FFF9F0] px-2 py-1 text-center outline-none"
              />
            ) : (
              data.weddingMapQuery.text
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 14 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          className="flex flex-col items-center gap-1 mb-3.5"
        >
          <div className="w-20 h-20 sm:w-22 sm:h-22 bg-[#FDFBF7] rounded p-1.5 border border-[#B09060]/35 shadow-[0_4px_16px_rgba(63,73,48,0.08)] relative group">
            <img
              alt="QR code for venue location"
              loading="lazy"
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(mapsUrl)}&size=200x200&color=3F4930&bgcolor=FDFBF7&qzone=2&format=png`}
              onError={(e) => {
                e.currentTarget.src =
                  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%234A3E20"><rect x="10" y="10" width="30" height="30" fill="none" stroke="%234A3E20" stroke-width="6"/><rect x="20" y="20" width="10" height="10"/><rect x="60" y="10" width="30" height="30" fill="none" stroke="%234A3E20" stroke-width="6"/><rect x="70" y="20" width="10" height="10"/><rect x="10" y="60" width="30" height="30" fill="none" stroke="%234A3E20" stroke-width="6"/><rect x="20" y="70" width="10" height="10"/><rect x="50" y="50" width="15" height="15"/><rect x="70" y="70" width="20" height="20"/></svg>';
              }}
              className="w-full h-full object-contain rounded-xs"
            />
          </div>
          <p className="font-cormorant font-semibold text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#B09060] m-0 opacity-90">
            {data.content.scanForLocation.text}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-2.5"
        >
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open venue location in maps"
            className="inline-flex items-center gap-2 border border-[#B09060] rounded px-4 py-2 bg-[#FDFBF7]/90 backdrop-blur-sm no-underline shadow-[0_4px_15px_rgba(176,144,96,0.14)] hover:bg-white hover:border-[#8E7040] transition-all hover:scale-[1.02] cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-[#4A3E20]" />
            <span className="font-cormorant font-semibold text-[10.5px] sm:text-[11.5px] tracking-[0.22em] uppercase text-[#4A3E20]">
              {data.content.openLocation.text}
            </span>
            <ExternalLink className="w-3 h-3 text-[#B09060] opacity-80" />
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 border border-[#B09060]/40 rounded px-3.5 py-2 bg-white/75 backdrop-blur-sm text-[#4A3E20] hover:bg-white transition-all text-[10.5px] sm:text-[11.5px] font-cormorant uppercase tracking-[0.16em] cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">{data.content.addressCopied.text}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#7A6840]" />
                <span>{data.content.copyAddress.text}</span>
              </>
            )}
          </button>
        </motion.div>

        {isEditor && onUpdateText && (
          <div className="mt-3 flex w-full max-w-xl flex-col items-center gap-2">
            {!locationUrlOpen ? (
              <button
                type="button"
                onClick={() => setLocationUrlOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#C85F3D]/50 bg-[#FFF9F0]/90 px-3.5 py-2 font-montserrat text-[10px] font-semibold uppercase tracking-wide text-[#C85F3D] shadow-sm transition hover:bg-white"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit Location URL
              </button>
            ) : (
              <div className="w-full rounded-2xl border border-[#D5A967] bg-[#FFF9F0]/95 p-3 text-left shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="venue-location-url" className="font-montserrat text-[10px] font-semibold uppercase tracking-wide text-[#C85F3D]">Venue location URL</label>
                  <button type="button" onClick={() => setLocationUrlOpen(false)} aria-label="Close location URL editor" className="rounded-full p-1 text-[#746D67] hover:bg-white"><X className="h-4 w-4" /></button>
                </div>
                <input
                  id="venue-location-url"
                  value={data.weddingMapUrl?.text ?? ''}
                  onChange={(event) => onUpdateText('weddingMapUrl', event.target.value)}
                  placeholder="https://maps.google.com/..."
                  className="w-full rounded-xl border border-[#D9D4CE] bg-white px-3 py-2.5 font-montserrat text-xs text-[#3D3936] outline-none focus:border-[#C85F3D] focus:ring-2 focus:ring-[#C85F3D]/10"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

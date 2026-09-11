import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Pencil, Share2, Check } from 'lucide-react';
import Memory from './Memory';
import Welcome from './Welcome';
import Venue from './Venue';
import Schedule from './Schedule';
import Count_Down from './Count_Down';
import Footer from './Footer';
import RSVP from './RSVP';
import PetalCanvas from './PetalCanvas';
import Music from './Music';
import type { PageProps } from '../Types';

function EditableText({
  label,
  value,
  onChange,
  className,
  isEditor,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  isEditor?: boolean;
}) {
  if (!isEditor) return <span className={className}>{value}</span>;

  return (
    <label className="group relative inline-flex items-center gap-2 rounded-xl border border-dashed border-[#D5A967]/80 bg-[#FFF9F0]/40 px-2 py-1 shadow-[0_0_0_1px_rgba(213,169,103,0.12)] transition hover:bg-[#FFF9F0]/80">
      <span className={`${className} relative z-10`}>{value}</span>
      <span className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-[#D5A967] bg-[#FFF9F0] text-[#C85F3D] opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
        <Pencil className="h-3 w-3" />
      </span>
      <input
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="absolute inset-0 z-20 h-full w-full rounded-xl border border-[#D5A967] bg-[#FFF9F0]/90 px-2 py-1 text-center font-inherit tracking-inherit text-[#3D3936] shadow-[0_8px_24px_rgba(72,57,38,0.08)] outline-none ring-2 ring-[#D5A967]/18"
        style={{ font: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit' }}
      />
    </label>
  );
}

const revealEase = [0.16, 1, 0.3, 1] as const;

export default function Home({ data, isEditor, onAddPhoto, onUpdatePhoto, onDeletePhoto, onAddEvent, onUpdateEvent, onDeleteEvent, onOpenEditor, onUpdateText, onUpdateEventField }: PageProps) {
  const weddingDate = data.weddingDate.text.split(' ');
  const weddingEvent = data.weddingEvents.find((event) => event.id === 'shaadi');
  const brideDisplayName = data.brideFullName?.text || data.brideName.text;
  const groomDisplayName = data.groomFullName?.text || data.groomName.text;
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const parseIsoDate = (value: string) => {
    if (!value) return '';
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) return value;

    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString().slice(0, 10);
    }

    return '';
  };

  const dateInputValue = parseIsoDate(data.countDown.date.slice(0, 10)) || parseIsoDate(data.weddingDate.text);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Wedding Invitation: ${brideDisplayName} & ${groomDisplayName}`,
        text: `Join us in celebrating the wedding of ${brideDisplayName} & ${groomDisplayName} on ${data.weddingDate.text}.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleScrollToMoments = () =>
    document.getElementById('moments')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="relative w-full min-h-screen bg-[#FDFBF7] text-[#4A3E20] selection:bg-[#B58A3C]/20 font-cormorant flex flex-col items-center overflow-x-clip">
            <header className="fixed top-3 right-3 sm:right-8 z-50 flex items-center gap-2 pointer-events-auto">
        <Music labels={data.content} />

        <button
          onClick={handleShare}
          aria-label={data.content.shareInvitation.text}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FDFBF7]/90 backdrop-blur-md border border-[#B09060]/35 shadow-sm text-xs font-montserrat uppercase tracking-wider text-[#4A3E20] hover:bg-white transition-all cursor-pointer"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[10px] text-emerald-700">{data.content.copied.text}</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-[#B58A3C]" />
              <span className="text-[10px]">{data.content.share.text}</span>
            </>
          )}
        </button>
      </header>

      <main className="relative w-full flex flex-col items-center">
        <section
          id="hero"
          aria-label={data.content.heroLabel.text}
          className="relative w-full h-svh min-h-svh flex flex-col items-center justify-between text-center pt-[22svh] sm:pt-[24svh] px-4 pb-4 box-border select-none overflow-hidden"
        >
          <div className="absolute inset-0 z-0 origin-center">
            <img
              alt="Midnight Waltz Couple Backdrop"
              aria-hidden="true"
              src="https://www.inviteque.com/assets/templates/midnight-waltz/hero-mobile.webp"
              onError={(e) => {
                e.currentTarget.src = '/hero.webp';
              }}
              className="w-full h-full object-cover object-top block opacity-55"
            />
            <div className="absolute inset-0 bg-[#FDFBF7]/30" />
          </div>

          <PetalCanvas className="absolute inset-0 z-10 pointer-events-none" />

          <div className="relative z-20 flex flex-col items-center w-full max-w-155 mx-auto">
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1.4, ease: revealEase }}
              className="mb-1.5 animate-lantern-glow"
              aria-hidden="true"
            >
              <svg viewBox="0 0 32 36" width="28" height="32" fill="none">
                <line x1="16" y1="28" x2="16" y2="34" stroke="#B09060" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
                <path d="M16 2 C10 8 8 14 8 18 C8 23 11.5 26 16 26 C20.5 26 24 23 24 18 C24 14 22 8 16 2Z" stroke="#B09060" strokeWidth="1.1" fill="#B09060" fillOpacity="0.1" opacity="0.8" />
                <path d="M11 18 Q16 10 21 18" stroke="#B09060" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.55" />
                <circle cx="16" cy="2" r="1.8" fill="#B09060" opacity="0.75" />
                <circle cx="16" cy="34" r="1.6" fill="#B09060" opacity="0.6" />
              </svg>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.5, ease: revealEase }}
              className="font-modernline text-[clamp(24px,3vw,34px)] text-[#4A3E20] mb-1 leading-none"
            >
              {data.content.saveTheDate.text}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.8, duration: 1.8, ease: revealEase }}
              aria-label={brideDisplayName}
              className="font-religath text-[clamp(3.4rem,6.2vw,5rem)] tracking-[0.06em] uppercase text-[#4A3E20] leading-none relative"
            >
              <span className="relative block">
                <EditableText
                  label="Bride name"
                  isEditor={isEditor}
                  value={brideDisplayName}
                  onChange={(value) => onUpdateText?.('brideFullName', value)}
                  className="relative z-10 block"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 gold-shimmer pointer-events-none select-none z-20"
                >
                  {brideDisplayName}
                </span>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 1.4, ease: revealEase }}
              className="font-modernline text-[clamp(2.2rem,3.8vw,3.2rem)] text-[#4A3E20] -my-1 leading-none lowercase"
            >
              {data.content.and.text}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 1.3, duration: 1.8, ease: revealEase }}
              aria-label={groomDisplayName}
              className="font-religath text-[clamp(3.4rem,6.2vw,5rem)] tracking-[0.06em] uppercase text-[#4A3E20] leading-none relative"
            >
              <span className="relative block">
                <EditableText
                  label="Groom name"
                  isEditor={isEditor}
                  value={groomDisplayName}
                  onChange={(value) => onUpdateText?.('groomFullName', value)}
                  className="relative z-10 block"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 gold-shimmer pointer-events-none select-none z-20"
                >
                  {groomDisplayName}
                </span>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 1.5, ease: revealEase }}
              className="font-cormorant font-normal text-[clamp(15px,2.4vw,22px)] tracking-[0.3em] uppercase text-[#7A6840] mt-2 mb-1"
            >
              {data.content.gettingMarried.text}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.8, duration: 1.4, ease: revealEase }}
              className="mb-1.5 flex items-center gap-2 w-44 origin-center"
              aria-hidden="true"
            >
              <div className="flex-1 h-[0.75px] bg-[#7A6840] opacity-60 rounded-full" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#7A6840] opacity-75 shrink-0" />
              <div className="flex-1 h-[0.75px] bg-[#7A6840] opacity-60 rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 2.0, duration: 1.7, ease: revealEase }}
              className="flex flex-col items-center justify-center gap-2.5 text-[#4A3E20]"
            >
              <div className="flex items-center justify-center gap-4 px-4 py-1.5" aria-label={data.content.gettingMarried.text}>
                <div className="h-px w-10 bg-[#7A6840]/60" aria-hidden="true" />
                <span className="font-religath text-[clamp(14px,2vw,20px)] tracking-[0.18em] uppercase text-[#7A6840]">
                  {data.content.gettingMarried.text}
                </span>
                <div className="h-px w-10 bg-[#7A6840]/60" aria-hidden="true" />
              </div>

              <div className="flex items-center gap-2.5 rounded-[18px] border border-[#D0B07A]/70 bg-[#F5EFE5]/80 px-5 py-2 shadow-[0_4px_20px_rgba(84,65,32,0.08)] backdrop-blur-[2px]">
                <time
                  dateTime={data.countDown.date}
                  className="font-cormorant text-[clamp(18px,2.4vw,28px)] font-semibold tracking-[0.18em] uppercase text-[#4A3E20]"
                >
                  {weddingEvent?.time.text}
                </time>
              </div>

              <div className="flex items-center justify-center gap-2.5 rounded-[18px] border border-[#D0B07A]/70 bg-[#F5EFE5]/80 px-4 py-2 shadow-[0_4px_20px_rgba(84,65,32,0.08)] backdrop-blur-[2px]">
                <span className="font-religath text-[clamp(17px,2.4vw,26px)] tracking-[0.12em] text-[#4A3E20]">
                  {data.weddingDate.text}
                </span>
                {isEditor && onUpdateText && (
                  <>
                    <input
                      ref={dateInputRef}
                      type="date"
                      value={dateInputValue}
                      onChange={(event) => {
                        const value = event.target.value;
                        if (!value) return;
                        const date = new Date(`${value}T12:00:00`);
                        const formatted = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).format(date).replace(',', '');
                        onUpdateText('weddingDate', formatted);
                      }}
                      className="sr-only"
                      aria-label="Change wedding date"
                    />
                    <button
                      type="button"
                      onClick={() => dateInputRef.current?.showPicker?.() ?? dateInputRef.current?.click()}
                      className="inline-flex items-center justify-center rounded-full border border-[#D0B07A] bg-[#FFF9F0] p-1.5 text-[#7A6840] transition hover:bg-white"
                      aria-label="Open date picker"
                    >
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="opacity-80">
                        <rect x="3" y="5" width="18" height="16" rx="2" />
                        <path d="M8 3v4M16 3v4M3 10h18" />
                      </svg>
                    </button>
                  </>
                )}
                {!isEditor && (
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#7A6840" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="opacity-80">
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M8 3v4M16 3v4M3 10h18" />
                  </svg>
                )}
              </div>

              <p className="font-religath text-[clamp(22px,3vw,32px)] italic tracking-[0.08em] text-[#4A3E20] m-0">
                {data.weddingDay.text}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.6, duration: 1.4, ease: revealEase }}
              className="mb-0.5"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#7A6840" aria-hidden="true" className="opacity-80">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </motion.div>

            <motion.address
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 1.7, ease: revealEase }}
              className="flex w-full max-w-[90%] flex-col items-center gap-0 mx-auto not-italic"
            >
              <EditableText
                label="Full venue name and address"
                isEditor={isEditor}
                value={data.weddingVenue.text}
                onChange={(value) => onUpdateText?.('weddingVenue', value)}
                className="block max-w-full whitespace-normal break-words text-center font-cormorant font-semibold text-[clamp(14px,2vw,20px)] tracking-[0.14em] uppercase text-[#4A3E20] m-0 leading-[1.4] opacity-95"
              />
            </motion.address>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 3.1, duration: 1.4 }}
            onClick={handleScrollToMoments}
            aria-label={data.content.scrollToMoments.text}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 cursor-pointer hover:opacity-100 transition-opacity"
          >
            <div className="flex flex-col items-center gap-0.5 animate-scroll-bob">
              <span className="font-cormorant font-semibold text-[8.5px] tracking-[0.28em] uppercase text-[#4A3E20]">
                {data.content.scroll.text}
              </span>
              <svg viewBox="0 0 18 11" width="12" height="7" fill="none" stroke="#4A3E20" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" className="opacity-60">
                <path d="M1 1.5 L9 9.5 L17 1.5" />
              </svg>
            </div>
          </motion.button>
        </section>

        <Memory data={data} isEditor={isEditor} onAddPhoto={onAddPhoto} onUpdatePhoto={onUpdatePhoto} onDeletePhoto={onDeletePhoto} />
        <Welcome data={data} isEditor={isEditor} onUpdateText={onUpdateText} />
        <Venue data={data} isEditor={isEditor} onUpdateText={onUpdateText} />
        <Schedule data={data} isEditor={isEditor} onAddEvent={onAddEvent} onUpdateEvent={onUpdateEvent} onDeleteEvent={onDeleteEvent} />
        <RSVP data={data} isEditor={isEditor} onOpenEditor={onOpenEditor} />
        <Count_Down data={data} />
        <Footer data={data} />
      </main>
    </div>
  );
}

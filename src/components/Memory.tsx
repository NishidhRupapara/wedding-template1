import React, { useState, useEffect, useRef } from 'react';
import { ImagePlus, Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import type { PageProps } from '../Types';

interface MemoryCard {
  id: string;
  quote: string;
  fallback: string;
  photo: string;
  rotate: number;
  y: number;
  op: number;
  scale: number;
  z: number;
}

export default function Memory({ data, isEditor, onAddPhoto, onUpdatePhoto, onDeletePhoto }: PageProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [photoFormOpen, setPhotoFormOpen] = useState(false);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;
      setScrollProgress(Math.min(Math.max(-rect.top / totalScrollable, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openAddPhoto = () => {
    setEditingPhotoId(null);
    setPhotoUrl('');
    setPhotoFormOpen(true);
  };

  const openEditPhoto = (photoId: string, url: string) => {
    setEditingPhotoId(photoId);
    setPhotoUrl(url);
    setPhotoFormOpen(true);
  };

  const savePhoto = () => {
    const url = photoUrl.trim() || '/assets/templates/midnight-waltz/sample-photo-1.svg';
    if (editingPhotoId) onUpdatePhoto?.(editingPhotoId, url);
    else onAddPhoto?.(url);
    setPhotoFormOpen(false);
    setPhotoUrl('');
  };

  const cards: MemoryCard[] = data.carouselPhotos.map((photo, index) => ({
    ...data.memory[index % data.memory.length],
    quote: data.memory[index % data.memory.length].quote.text,
    fallback: data.memory[index % data.memory.length].fallback.url,
    photo: photo.image.url,
    id: photo.id,
    rotate: [-5, 4, -3, 5][index % 4],
    y: (() => {
      const progress = Math.min(Math.max((scrollProgress - (index / Math.max(data.carouselPhotos.length, 1)) * 0.78) / 0.22, 0), 1);
      return (1 - progress) * (45 + index * 5);
    })(),
    op: (() => {
      const progress = Math.min(Math.max((scrollProgress - (index / Math.max(data.carouselPhotos.length, 1)) * 0.78) / 0.22, 0), 1);
      return Math.min(progress * 1.6, 1);
    })(),
    scale: 1 - Math.max((scrollProgress - ((index + 1) / Math.max(data.carouselPhotos.length, 1))) * 0.08, 0),
    z: (index + 1) * 10,
  }));

  return (
    <section
      id="moments"
      ref={containerRef}
      aria-label={`${data.content.celebratingMoments.text} — Photo Gallery`}
      className="relative w-full h-[175vh] bg-[#FDFBF7] select-none"
    >
      <div className="sticky top-0 w-full h-svh min-h-svh overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            alt=""
            aria-hidden="true"
            src="https://image.wedmegood.com/resized/450X/uploads/images/9ef3e78409514968a344a8b47e287a91realwedding/88-HAR03808.jpg"
            onError={(e) => {
              e.currentTarget.src = '/assets/templates/midnight-waltz/photo-bg-mobile.svg';
            }}
            className="w-full h-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-[#FDFBF7]/30" />
        </div>

        <div className="absolute top-[2%] pointer-events-none z-10 opacity-20 select-none">
          <span className="font-montserrat text-xs tracking-[0.25em] text-[#4A3E20]">
            {data.hashtag.text}
          </span>
        </div>

        <div className="absolute top-[6%] sm:top-[7%] z-20 text-center px-4">
          <p className="font-modernline text-[clamp(20px,3.8vw,28px)] text-[#4A3E20] leading-none mb-1">
            {data.content.celebratingMoments.text}
          </p>

          <div aria-hidden="true" className="flex items-center justify-center gap-2 my-1">
            <div className="w-7 h-[0.75px] bg-[#B09060] opacity-55" />
            <svg viewBox="0 0 32 18" width="28" height="16" fill="none">
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
            <div className="w-7 h-[0.75px] bg-[#B09060] opacity-55" />
          </div>

          <h2 className="font-religath text-[#7A6840] text-[clamp(20px,4vw,28px)] uppercase tracking-[0.08em] leading-tight font-normal m-0">
            {data.content.moments.text}
          </h2>
          {isEditor && (
            <button type="button" onClick={openAddPhoto} className="pointer-events-auto mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#D5A967] bg-[#FFF9F0] px-3 py-1.5 font-montserrat text-[10px] font-semibold uppercase tracking-wide text-[#C85F3D] shadow-sm">
              <Plus className="h-3.5 w-3.5" /> Add Moment
            </button>
          )}
        </div>

        <div className="relative w-full max-w-110 h-80 sm:h-90 flex items-center justify-center px-4 z-20 mt-12 sm:mt-10">
          {cards.map((card) => (
            <div
              key={card.id}
              style={{
                transform: `translateY(${card.y}vh) rotate(${card.rotate}deg) scale(${card.scale})`,
                opacity: card.op,
                zIndex: card.z,
                transition: 'transform 0.08s ease-out, opacity 0.1s ease-out',
              }}
              className={`absolute w-[80%] sm:w-[86%] max-w-85 aspect-4/3 bg-[#FDFBF7] p-2.5 pb-4 sm:p-3 sm:pb-5 rounded-md shadow-[0_16px_32px_rgba(70,50,25,0.16)] border border-[#B58A3C]/25 flex flex-col ${isEditor ? 'pointer-events-auto' : 'pointer-events-none'}`}
            >
              {isEditor && (
                <div className="absolute right-3 top-3 z-30 flex gap-1.5">
                  <button type="button" onClick={() => openEditPhoto(card.id, card.photo)} aria-label="Edit moment photo" className="rounded-full bg-white p-1.5 text-[#C85F3D] shadow"><Pencil className="h-3.5 w-3.5" /></button>
                  <button type="button" onClick={() => onDeletePhoto?.(card.id)} aria-label="Delete moment photo" className="rounded-full bg-[#C85F3D] p-1.5 text-white shadow"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              )}
              <div className="absolute inset-1.5 border border-[#B58A3C]/40 pointer-events-none z-10" />
              <div className="w-full h-full bg-[#f8f8f8] overflow-hidden border border-[#B58A3C]/10">
                <img
                  alt={`Our moment ${card.id}`}
                  src={card.photo}
                  onError={(e) => {
                    e.currentTarget.src = card.fallback;
                  }}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <p className="text-center mt-2 px-2 text-[10px] sm:text-[11px] text-[#3F4930] italic font-cormorant font-medium leading-relaxed z-20 m-0">
                "{card.quote}"
              </p>
            </div>
          ))}
        </div>

        {photoFormOpen && (
          <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-140 rounded-3xl border border-[#D5A967] bg-[#F8F6F2] p-5 shadow-2xl sm:p-7">
              <div className="mb-5 flex items-center justify-between border-b border-[#E1DDD7] pb-4">
                <h2 className="flex items-center gap-2 text-[22px] font-semibold text-[#3D3936]"><ImagePlus className="h-5 w-5 text-[#C85F3D]" /> {editingPhotoId ? 'Edit Moment Photo' : 'Add Story Photo'}</h2>
                <button type="button" onClick={() => setPhotoFormOpen(false)} aria-label="Close photo form"><X className="h-5 w-5 text-[#746D67]" /></button>
              </div>
              <label className="block font-montserrat text-[11px] font-medium text-[#514B47]">Photo URL<input className="mt-1.5 w-full rounded-xl border border-[#D9D4CE] bg-[#FFFEFC] px-3.5 py-3 text-[14px] text-[#3D3936] outline-none placeholder:text-[#AAA39C] focus:border-[#C85F3D]" value={photoUrl} onChange={(event) => setPhotoUrl(event.target.value)} placeholder="https://..." /></label>
              <div className="mt-5 flex justify-end gap-5 border-t border-[#E1DDD7] pt-4"><button type="button" onClick={() => setPhotoFormOpen(false)} className="font-montserrat text-[11px] uppercase text-[#655F5A]">Cancel</button><button type="button" onClick={savePhoto} className="inline-flex items-center gap-2 rounded-xl bg-[#C85F3D] px-5 py-3 font-montserrat text-[11px] font-semibold uppercase text-white shadow-md"><Save className="h-4 w-4" /> {editingPhotoId ? 'Save Photo' : 'Add Moment'}</button></div>
            </div>
          </div>
        )}

        <div className="absolute bottom-3 z-20 flex flex-col items-center gap-1 opacity-70">
          <span className="font-cormorant font-semibold text-[9px] sm:text-[10px] tracking-[0.24em] uppercase text-[#7A6840]">
            {scrollProgress < 0.85 ? data.content.scrollToStackMoments.text : data.content.keepScrolling.text}
          </span>
          <div className="w-14 h-0.5 bg-[#B09060]/25 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#B09060] transition-all duration-75"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import { MessageCircle, Pencil, Phone } from 'lucide-react';
import type { PageProps } from '../Types';

export default function RSVP({ data, isEditor, onOpenEditor }: PageProps) {
  const mobileNumber = data.rsvpMobileNumber?.text.replace(/[^\d]/g, '') ?? '';
  if (!mobileNumber && !isEditor) return null;

  const brideName = data.brideFullName?.text || data.brideName.text;
  const groomName = data.groomFullName?.text || data.groomName.text;
  const whatsappUrl = `https://wa.me/${mobileNumber}?text=${encodeURIComponent(`Hello! I would like to RSVP for ${brideName} & ${groomName}'s wedding.`)}`;

  return (
    <section id="rsvp" className="relative w-full overflow-hidden bg-[#2B3B25] px-5 py-16 text-center text-[#FDFBF7]">
      <div className="relative mx-auto flex max-w-xl flex-col items-center">
        <p className="m-0 font-modernline text-3xl text-[#D9B76E]">We would love to celebrate with you</p>
        <h2 className="mt-2 font-religath text-2xl uppercase tracking-[0.12em]">RSVP</h2>
        <p className="mt-3 max-w-md font-cormorant text-lg text-[#FDFBF7]/80">{data.rsvpMessage?.text || 'Confirm your attendance and share your wishes with the couple.'}</p>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Confirm attendance via WhatsApp" className="mt-6 inline-flex items-center gap-2 rounded border border-[#D9B76E] bg-[#FDFBF7] px-5 py-3 font-montserrat text-[10px] uppercase tracking-[0.18em] text-[#2B3B25] transition hover:bg-[#D9B76E]">
          <MessageCircle className="h-4 w-4" />
          Yes, I&apos;ll be there
        </a>
        <span className="mt-3 inline-flex items-center gap-1.5 font-cormorant text-sm text-[#FDFBF7]/70"><Phone className="h-3.5 w-3.5" /> {data.rsvpMobileNumber?.text}</span>
        {isEditor && onOpenEditor && (
          <button type="button" onClick={() => onOpenEditor('rsvp')} className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#D9B76E] px-4 py-2 font-montserrat text-[10px] uppercase tracking-[0.15em] text-[#D9B76E] transition hover:bg-[#D9B76E] hover:text-[#2B3B25]">
            <Pencil className="h-3.5 w-3.5" />
            Edit RSVP
          </button>
        )}
      </div>
    </section>
  );
}

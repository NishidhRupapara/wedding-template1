import { useState, type ReactNode } from 'react';
import { CalendarDays, Camera, Hash, Heart, ImagePlus, MapPin, Phone, Plus, RotateCcw, Save, Sparkles, X } from 'lucide-react';
import type { EditorProps, WeddingData, WeddingEventItem, textObj } from '../Types';

type EditorTab = 'couple' | 'date' | 'hashtag' | 'rsvp';

interface DraftData {
  brideName: textObj;
  brideFullName: textObj;
  groomName: textObj;
  groomFullName: textObj;
  brideParents: textObj;
  groomParents: textObj;
  weddingDate: textObj;
  weddingVenue: textObj;
  weddingMapQuery: textObj;
  venueCity: textObj;
  venueState: textObj;
  hashtag: textObj;
  hashtagTagline: textObj;
  rsvpMobileNumber: textObj;
  rsvpMessage: textObj;
}

const inputClass = 'mt-1.5 w-full rounded-xl border border-[#D9D4CE] bg-[#FFFEFC] px-3.5 py-3 text-[14px] text-[#3D3936] outline-none transition placeholder:text-[#AAA39C] focus:border-[#C85F3D] focus:ring-2 focus:ring-[#C85F3D]/10';
const labelClass = 'block font-montserrat text-[11px] font-medium text-[#514B47]';

function makeDraft(data: WeddingData): DraftData {
  return {
    brideName: { ...data.brideName },
    brideFullName: { ...(data.brideFullName ?? { id: 'bride_full_name', type: 'text', text: data.brideName.text }) },
    groomName: { ...data.groomName },
    groomFullName: { ...(data.groomFullName ?? { id: 'groom_full_name', type: 'text', text: data.groomName.text }) },
    brideParents: { ...data.brideParents },
    groomParents: { ...data.groomParents },
    weddingDate: { ...data.weddingDate },
    weddingVenue: { ...data.weddingVenue },
    weddingMapQuery: { ...data.weddingMapQuery },
    venueCity: { ...(data.venueCity ?? { id: 'venue_city', type: 'text', text: '' }) },
    venueState: { ...(data.venueState ?? { id: 'venue_state', type: 'text', text: '' }) },
    hashtag: { ...data.hashtag },
    hashtagTagline: { ...(data.hashtagTagline ?? { id: 'hashtag_tagline', type: 'text', text: 'Tag your moments · Share the love' }) },
    rsvpMobileNumber: { ...(data.rsvpMobileNumber ?? { id: 'rsvp_mobile_number', type: 'mobileNumber', text: '' }) },
    rsvpMessage: { ...(data.rsvpMessage ?? { id: 'rsvp_message', type: 'text', text: 'Confirm your attendance and share your wishes with the couple.' }) },
  };
}

const toDateInputValue = (value: string) => {
  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) return value;

  const displayMatch = value.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (displayMatch) {
    const [, day, monthName, year] = displayMatch;
    const monthMap: Record<string, string> = { jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06', jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12' };
    const month = monthMap[monthName.toLowerCase().slice(0, 3)];
    if (month) return `${year}-${month}-${day.padStart(2, '0')}`;
  }

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }

  return '';
};

const toDisplayDate = (value: string) => {
  if (!value) return value;
  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [year, month, day] = isoMatch.slice(1);
    const date = new Date(`${year}-${month}-${day}T12:00:00`);
    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).format(date).replace(',', '');
    }
  }
  return value;
};

const getWeekdayName = (value: string) => {
  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!isoMatch) return 'Saturday';
  const [year, month, day] = isoMatch.slice(1);
  const date = new Date(`${year}-${month}-${day}T12:00:00`);
  if (Number.isNaN(date.getTime())) return 'Saturday';
  return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
};

function Field({ label, value, onChange, placeholder, wide = false, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; wide?: boolean; type?: string }) {
  return <label className={`${labelClass}${wide ? ' md:col-span-2' : ''}`}>{label}<input type={type} className={inputClass} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></label>;
}

function SectionCard({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return <section className="rounded-2xl border border-[#E8E3DD] bg-white px-4 py-5 sm:px-5"><h3 className="mb-4 flex items-center gap-2 font-montserrat text-[12px] font-semibold uppercase tracking-[0.13em] text-[#C85F3D]">{icon}{title}</h3>{children}</section>;
}

export default function EditorPanel({ data, defaultData, onSave, onAddPhoto, onAddEvent, onClose, initialTab = 'couple' }: EditorProps) {
  const [tab, setTab] = useState<EditorTab>(initialTab);
  const [draft, setDraft] = useState(() => makeDraft(data));
  const [photoOpen, setPhotoOpen] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [eventName, setEventName] = useState('New Event');
  const [eventDate, setEventDate] = useState(data.weddingDate.text);
  const [eventTime, setEventTime] = useState('6:00 PM');
  const [eventVenue, setEventVenue] = useState(data.weddingVenue.text);
  const [eventDress, setEventDress] = useState('Festive attire encouraged');
  const [eventImage, setEventImage] = useState('');
  const [eventDescription, setEventDescription] = useState('Join us for a beautiful celebration with family and friends.');
  const [saved, setSaved] = useState(false);

  const setValue = (key: keyof DraftData, value: string) => setDraft((current) => {
    const next = {
      ...current,
      [key]: { ...current[key], text: value },
    };

    if (key === 'weddingDate') {
      const weekday = getWeekdayName(toDateInputValue(value));
      return {
        ...next,
        weddingDate: { ...current.weddingDate, text: toDisplayDate(value) },
        weddingMapQuery: { ...current.weddingMapQuery },
      } as DraftData;
    }

    return next;
  });

  const resetDefaults = () => {
    setDraft(makeDraft(defaultData));
    setSaved(false);
  };

  const saveChanges = () => {
    const next = structuredClone(data) as WeddingData;
    next.brideName = { ...draft.brideName };
    next.brideFullName = { ...draft.brideFullName };
    next.groomName = { ...draft.groomName };
    next.groomFullName = { ...draft.groomFullName };
    next.brideParents = { ...draft.brideParents };
    next.groomParents = { ...draft.groomParents };
    next.weddingDate = { ...draft.weddingDate, text: toDisplayDate(draft.weddingDate.text) };
    const selectedDate = toDateInputValue(draft.weddingDate.text);
    next.weddingDay = { ...next.weddingDay, text: getWeekdayName(selectedDate) };
    next.weddingVenue = { ...draft.weddingVenue };
    next.weddingMapQuery = { ...draft.weddingMapQuery };
    next.venueCity = { ...draft.venueCity };
    next.venueState = { ...draft.venueState };
    next.hashtag = { ...draft.hashtag };
    next.hashtagTagline = { ...draft.hashtagTagline };
    next.rsvpMobileNumber = { ...draft.rsvpMobileNumber };
    next.rsvpMessage = { ...draft.rsvpMessage };

    const countdownDate = new Date(`${toDateInputValue(next.weddingDate.text)}T11:00:00`);
    if (!Number.isNaN(countdownDate.getTime())) {
      next.countDown = { ...next.countDown, date: countdownDate.toISOString().slice(0, 19) };
    }

    onSave(next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  const addPhoto = () => {
    onAddPhoto(photoUrl.trim() || '/assets/templates/midnight-waltz/sample-photo-1.svg');
    setPhotoUrl('');
    setPhotoCaption('');
    setPhotoOpen(false);
  };

  const addEvent = () => {
    const id = crypto.randomUUID();
    const event: WeddingEventItem = {
      id: `event-${id}`,
      name: { id: `name-${id}`, text: eventName.trim() || 'New Event', type: 'text' },
      date: { id: `date-${id}`, text: eventDate, type: 'text' },
      time: { id: `time-${id}`, text: eventTime, type: 'text' },
      venue: { id: `venue-${id}`, text: eventVenue, type: 'text' },
      desc: { id: `desc-${id}`, text: eventDescription, type: 'text' },
      icon: { id: `icon-${id}`, type: 'image', url: eventImage || '/assets/templates/midnight-waltz/sample-photo-1.svg' },
    };
    onAddEvent(event);
    setEventOpen(false);
    setEventName('New Event');
    setEventImage('');
    setEventDescription('Join us for a beautiful celebration with family and friends.');
  };

  const tabs: Array<{ id: EditorTab; label: string; icon: ReactNode }> = [
    { id: 'couple', label: 'Couple & Parents', icon: <Heart className="h-4 w-4" /> },
    { id: 'date', label: 'Date & Venue', icon: <CalendarDays className="h-4 w-4" /> },
    { id: 'hashtag', label: 'Hashtag', icon: <Hash className="h-4 w-4" /> },
    { id: 'rsvp', label: 'RSVP WhatsApp', icon: <Phone className="h-4 w-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-3 font-cormorant backdrop-blur-sm sm:p-6">
      <div className="relative flex max-h-[min(760px,calc(100svh-24px))] w-full max-w-212.5 flex-col overflow-hidden rounded-3xl border border-[#D5A967] bg-[#F8F6F2] shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:max-h-[calc(100svh-48px)]">
        <header className="flex shrink-0 items-center justify-between bg-[#171311] px-5 py-4 text-[#F7F2EB] sm:px-7 sm:py-5"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6B4815] text-[#F0B52E]"><Sparkles className="h-5 w-5" /></span><div><h2 className="m-0 text-[21px] font-semibold leading-tight sm:text-[24px]">Wedding Website Editor</h2><p className="m-0 mt-0.5 font-montserrat text-[10px] tracking-wide text-[#AEA6A0] sm:text-[11px]">Customize Couple, Parents, Date, Venue, Hashtags &amp; RSVP</p></div></div><button type="button" onClick={onClose} aria-label="Close editor" className="rounded-full p-1 text-[#E4DBD3] transition hover:bg-white/10"><X className="h-5 w-5" /></button></header>
        <nav className="flex shrink-0 overflow-x-auto border-b border-[#E1DDD7] bg-white px-2 sm:px-4">{tabs.map((item) => <button key={item.id} type="button" onClick={() => setTab(item.id)} className={`flex min-w-max items-center gap-2 border-b-2 px-3 py-3.5 font-montserrat text-[10px] font-medium uppercase tracking-wide transition sm:px-5 sm:text-[11px] ${tab === item.id ? 'border-[#C85F3D] text-[#C85F3D]' : 'border-transparent text-[#655F5A] hover:text-[#C85F3D]'}`}>{item.icon}{item.label}</button>)}</nav>

        <main className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
          {tab === 'couple' && <div className="grid gap-5"><SectionCard title="Groom & Parents Details" icon={<span className="h-2 w-2 rounded-full bg-[#C85F3D]" />}><div className="grid gap-4 md:grid-cols-2"><Field label="Groom First Name" value={draft.groomName.text} onChange={(value) => setValue('groomName', value)} /><Field label="Groom Full Name" value={draft.groomFullName.text} onChange={(value) => setValue('groomFullName', value)} /><Field wide label="Groom's Parents Name & Lineage" value={draft.groomParents.text} onChange={(value) => setValue('groomParents', value)} /></div><p className="mt-2 font-montserrat text-[10px] text-[#958D87]">Displayed proudly above the groom&apos;s name on the royal invitation.</p></SectionCard><SectionCard title="Bride & Parents Details" icon={<span className="h-2 w-2 rounded-full bg-[#C85F3D]" />}><div className="grid gap-4 md:grid-cols-2"><Field label="Bride First Name" value={draft.brideName.text} onChange={(value) => setValue('brideName', value)} /><Field label="Bride Full Name" value={draft.brideFullName.text} onChange={(value) => setValue('brideFullName', value)} /><Field wide label="Bride's Parents Name & Lineage" value={draft.brideParents.text} onChange={(value) => setValue('brideParents', value)} /></div><p className="mt-2 font-montserrat text-[10px] text-[#958D87]">Displayed proudly above the bride&apos;s name on the royal invitation.</p></SectionCard></div>}
          {tab === 'date' && <div className="grid gap-5"><SectionCard title="Wedding Date" icon={<CalendarDays className="h-4 w-4" />}><div className="grid gap-4 md:grid-cols-2"><Field label="Wedding Date" value={toDateInputValue(draft.weddingDate.text)} onChange={(value) => setValue('weddingDate', toDisplayDate(value))} type="date" /><Field label="Formatted Celebration Date" value={draft.weddingDate.text} onChange={(value) => setValue('weddingDate', value)} /></div></SectionCard><SectionCard title="Palace / Wedding Venue" icon={<MapPin className="h-4 w-4" />}><div className="grid gap-4 md:grid-cols-2"><Field wide label="Venue Name" value={draft.weddingVenue.text} onChange={(value) => setValue('weddingVenue', value)} /><Field label="City" value={draft.venueCity.text} onChange={(value) => setValue('venueCity', value)} /><Field label="State / Country" value={draft.venueState.text} onChange={(value) => setValue('venueState', value)} placeholder="State / Country" /><Field wide label="Full Address String" value={draft.weddingMapQuery.text} onChange={(value) => setValue('weddingMapQuery', value)} /></div></SectionCard></div>}
          {tab === 'hashtag' && <SectionCard title="Wedding Social Hashtag" icon={<Hash className="h-4 w-4" />}><Field label="Wedding Hashtag" value={draft.hashtag.text} onChange={(value) => setValue('hashtag', value)} placeholder="#YourHashtag" /><p className="mt-2 font-montserrat text-[10px] text-[#958D87]">Guests can click on this hashtag in the Social section to copy it directly.</p><div className="mt-5"><Field label="Tagline / Call to Action" value={draft.hashtagTagline.text} onChange={(value) => setValue('hashtagTagline', value)} /></div></SectionCard>}
          {tab === 'rsvp' && <SectionCard title="RSVP WhatsApp Contact" icon={<Phone className="h-4 w-4" />}><div className="grid gap-4"><Field label="WhatsApp Mobile Number (with country code, digits only)" value={draft.rsvpMobileNumber.text} onChange={(value) => setValue('rsvpMobileNumber', value)} placeholder="919664787828" /><Field wide label="RSVP Message" value={draft.rsvpMessage.text} onChange={(value) => setValue('rsvpMessage', value)} /></div><p className="mt-2 font-montserrat text-[10px] text-[#958D87]">This message appears above the RSVP button, while the number opens the WhatsApp confirmation chat.</p><div className="mt-5 rounded-2xl border border-[#75E0B2] bg-[#EDFFF6] px-4 py-4 font-montserrat text-[12px] text-[#08774E]"><strong>Target WhatsApp link:</strong><br />https://api.whatsapp.com/send?phone={draft.rsvpMobileNumber.text.replace(/[^\d]/g, '')}</div></SectionCard>}
        </main>

        <footer className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-[#E1DDD7] bg-[#F8F6F2] px-5 py-4 sm:px-7"><button type="button" onClick={resetDefaults} className="inline-flex items-center gap-2 font-montserrat text-[11px] text-[#655F5A] hover:text-[#C85F3D]"><RotateCcw className="h-4 w-4" /> Reset to Defaults</button><div className="flex items-center gap-5"><button type="button" onClick={onClose} className="font-montserrat text-[11px] uppercase text-[#655F5A]">Cancel</button><button type="button" onClick={saveChanges} className="inline-flex items-center gap-2 rounded-xl bg-[#C85F3D] px-5 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-[#AF4D30]"><Save className="h-4 w-4" /> {saved ? 'Saved' : 'Save Changes'}</button></div></footer>
      </div>

      {photoOpen && <Dialog title="Add Story Photo" icon={<ImagePlus className="h-5 w-5" />} onClose={() => setPhotoOpen(false)}><Field label="Photo URL (leave blank for royal template photo)" value={photoUrl} onChange={setPhotoUrl} placeholder="https://..." /><div className="mt-4"><Field label="Caption / Memory Note" value={photoCaption} onChange={setPhotoCaption} placeholder="e.g. Under the starlit courtyard..." /></div><DialogActions onCancel={() => setPhotoOpen(false)} onSave={addPhoto} saveLabel="Add Moment" /></Dialog>}
      {eventOpen && <Dialog title="Edit Wedding Gathering" icon={<Sparkles className="h-5 w-5" />} onClose={() => setEventOpen(false)}><div className="grid gap-4"><Field label="Event Name" value={eventName} onChange={setEventName} /><Field label="Subtitle / Catchphrase" value={eventDescription} onChange={setEventDescription} /><div className="grid gap-4 sm:grid-cols-2"><Field label="Date" value={eventDate} onChange={setEventDate} /><Field label="Time" value={eventTime} onChange={setEventTime} /></div><Field label="Venue / Courtyard" value={eventVenue} onChange={setEventVenue} /><Field label="Dress Code / Attire" value={eventDress} onChange={setEventDress} /><Field label="Cover Image URL" value={eventImage} onChange={setEventImage} placeholder="https://..." /><label className={labelClass}>Full Description<textarea className={`${inputClass} min-h-24 resize-y`} value={eventDescription} onChange={(event) => setEventDescription(event.target.value)} /></label></div><DialogActions onCancel={() => setEventOpen(false)} onSave={addEvent} saveLabel="Save Event" /></Dialog>}
      <div className="pointer-events-none fixed bottom-5 left-5 z-60 flex gap-2"><button type="button" onClick={() => setPhotoOpen(true)} className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-[#D5A967] bg-[#FFF9F0] px-4 py-2 font-montserrat text-[10px] font-semibold uppercase tracking-wide text-[#C85F3D] shadow-lg"><Camera className="h-3.5 w-3.5" /> Add Photo</button><button type="button" onClick={() => setEventOpen(true)} className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-[#D5A967] bg-[#FFF9F0] px-4 py-2 font-montserrat text-[10px] font-semibold uppercase tracking-wide text-[#C85F3D] shadow-lg"><Plus className="h-3.5 w-3.5" /> Add Event</button></div>
    </div>
  );
}

function Dialog({ title, icon, onClose, children }: { title: string; icon: ReactNode; onClose: () => void; children: ReactNode }) {
  return <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"><div className="w-full max-w-140 rounded-3xl border border-[#D5A967] bg-[#F8F6F2] p-5 shadow-2xl sm:p-7"><div className="mb-5 flex items-center justify-between border-b border-[#E1DDD7] pb-4"><h2 className="flex items-center gap-2 text-[22px] font-semibold text-[#3D3936]">{icon}{title}</h2><button type="button" onClick={onClose} aria-label="Close dialog"><X className="h-5 w-5 text-[#746D67]" /></button></div>{children}</div></div>;
}

function DialogActions({ onCancel, onSave, saveLabel }: { onCancel: () => void; onSave: () => void; saveLabel: string }) {
  return <div className="mt-5 flex justify-end gap-5 border-t border-[#E1DDD7] pt-4"><button type="button" onClick={onCancel} className="font-montserrat text-[11px] uppercase text-[#655F5A]">Cancel</button><button type="button" onClick={onSave} className="rounded-xl bg-[#C85F3D] px-5 py-3 font-montserrat text-[11px] font-semibold uppercase text-white shadow-md">{saveLabel}</button></div>;
}
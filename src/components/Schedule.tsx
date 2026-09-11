import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CalendarDays, Clock3, Image, MapPin, Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import type { PageProps, WeddingEventItem } from '../Types';

export default function Schedule({ data, isEditor, onAddEvent, onUpdateEvent, onDeleteEvent }: PageProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<WeddingEventItem | null>(null);
  const [eventName, setEventName] = useState('New Event');
  const [eventDate, setEventDate] = useState(data.weddingDate.text);
  const [eventTime, setEventTime] = useState('6:00 PM');
  const [eventVenue, setEventVenue] = useState(data.weddingVenue.text);
  const [eventDescription, setEventDescription] = useState('A beautiful celebration with family and friends.');
  const [eventImage, setEventImage] = useState('/assets/templates/midnight-waltz/sample-photo-1.svg');

  const openAddForm = () => {
    setEditingEvent(null);
    setEventName('New Event');
    setEventDate(data.weddingDate.text);
    setEventTime('6:00 PM');
    setEventVenue(data.weddingVenue.text);
    setEventDescription('A beautiful celebration with family and friends.');
    setEventImage('/assets/templates/midnight-waltz/sample-photo-1.svg');
    setFormOpen(true);
  };

  const openEditForm = (event: WeddingEventItem) => {
    setEditingEvent(event);
    setEventName(event.name.text);
    setEventDate(event.date?.text ?? data.weddingDate.text);
    setEventTime(event.time.text);
    setEventVenue(event.venue?.text ?? data.weddingVenue.text);
    setEventDescription(event.desc.text);
    setEventImage(event.icon.url);
    setFormOpen(true);
  };

  const saveEvent = () => {
    if (editingEvent) {
      onUpdateEvent?.(editingEvent.id, {
        name: { ...editingEvent.name, text: eventName.trim() || 'New Event' },
        date: { ...(editingEvent.date ?? { id: `date-${editingEvent.id}`, type: 'text' }), text: eventDate },
        time: { ...editingEvent.time, text: eventTime },
        venue: { ...(editingEvent.venue ?? { id: `venue-${editingEvent.id}`, type: 'text' }), text: eventVenue },
        desc: { ...editingEvent.desc, text: eventDescription },
        icon: { ...editingEvent.icon, url: eventImage || '/assets/templates/midnight-waltz/sample-photo-1.svg' },
      });
    } else {
      const id = crypto.randomUUID();
      onAddEvent?.({
        id: `event-${id}`,
        name: { id: `name-${id}`, text: eventName.trim() || 'New Event', type: 'text' },
        date: { id: `date-${id}`, text: eventDate, type: 'text' },
        time: { id: `time-${id}`, text: eventTime, type: 'text' },
        venue: { id: `venue-${id}`, text: eventVenue, type: 'text' },
        desc: { id: `desc-${id}`, text: eventDescription, type: 'text' },
        icon: { id: `icon-${id}`, type: 'image', url: eventImage || '/assets/templates/midnight-waltz/sample-photo-1.svg' },
      });
    }
    setFormOpen(false);
  };

  const events = data.weddingEvents.map((event, index) => ({
    ...event,
    side: index % 2 === 0 ? 'right' : 'left',
  }));
  return (
    <section
      id="schedule"
      className="w-full min-h-svh px-4 py-8 relative flex flex-col items-center justify-center overflow-hidden select-none bg-[#FDFBF7]"
    >
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover z-0 pointer-events-none opacity-55"
        src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1800&q=85"
      />
      <div className="absolute inset-0 bg-[#FDFBF7]/30 z-0 pointer-events-none" />

      <div className="flex flex-col items-center text-center z-10 mb-4 sm:mb-5">
        <p className="font-modernline text-[clamp(19px,3.8vw,26px)] text-[#4A3E20] mb-0.5 leading-none normal-case">
          {data.content.celebratingMoments.text}
        </p>
        <div aria-hidden="true" className="flex items-center justify-center gap-2 my-1">
          <div className="w-6 h-[0.7px] bg-[#B09060] opacity-55" />
          <svg viewBox="0 0 32 18" width="28" height="15" fill="none">
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
          <div className="w-6 h-[0.7px] bg-[#B09060] opacity-55" />
        </div>
        <h2 className="font-religath text-[#7A6840] text-[clamp(19px,4.2vw,26px)] font-normal tracking-[0.08em] m-0 uppercase leading-[1.1]">
          {data.content.schedule.text}
        </h2>
        {isEditor && <div className="mt-3 flex flex-wrap items-center justify-center gap-2 rounded-full border border-[#D5A967]/60 bg-[#FFF9F0]/85 px-3 py-2 shadow-sm"><span className="font-montserrat text-[10px] font-semibold uppercase tracking-wide text-[#7A6840]">Edit schedule</span><button type="button" onClick={openAddForm} className="inline-flex items-center gap-1.5 rounded-full bg-[#C85F3D] px-3 py-1.5 font-montserrat text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#AF4D30]"><Plus className="h-3.5 w-3.5" /> Add Event</button></div>}
      </div>

      <div className="relative w-full max-w-170 mx-auto z-10 flex flex-col gap-4 md:gap-5">
        <div
          className="absolute left-6 md:left-1/2 top-2 bottom-2 w-[1.5px] translate-x-[-0.75px]"
          style={{
            backgroundImage:
              'linear-gradient(transparent, rgb(192, 157, 92) 15%, rgb(192, 157, 92) 85%, transparent)',
            opacity: 0.35,
          }}
        />

        {events.map((event, idx) => {
          const isRight = event.side === 'right';
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className={`flex flex-col md:flex-row items-start md:items-center w-full relative ${
                isRight ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-full md:w-[45%] pl-13 md:pl-0 flex ${
                  isRight ? 'md:justify-end md:pr-8' : 'md:justify-start md:pl-8'
                }`}
              >
                <div
                  className="relative p-3 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 flex flex-col gap-1 w-full text-left max-w-72.5 md:max-w-80 shadow-[0_4px_20px_rgba(61,82,54,0.03)] hover:shadow-[0_8px_24px_rgba(61,82,54,0.07)] bg-[#F5EFE6]"
                  style={{
                    borderColor: 'rgba(197, 168, 128, 0.35)',
                    borderBottom: '2.5px solid rgb(192, 157, 92)',
                  }}
                >
                  {isEditor && (
                    <div className="absolute right-2 top-2 z-20 flex gap-1.5">
                      <button type="button" onClick={() => openEditForm(event)} aria-label={`Edit ${event.name.text}`} className="rounded-full bg-white p-1.5 text-[#C85F3D] shadow transition hover:bg-[#FFF9F0]"><Pencil className="h-3.5 w-3.5" /></button>
                      <button type="button" onClick={() => onDeleteEvent?.(event.id)} aria-label={`Delete ${event.name.text}`} className="rounded-full bg-[#C85F3D] p-1.5 text-white shadow"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#B58A3C] shadow-sm text-xs shrink-0">
                      <img src={event.icon.url} alt="" className="w-5 h-5 object-contain" />
                    </span>
                    <span className="text-[8.5px] font-bold tracking-[0.16em] uppercase px-2 py-0.5 rounded-full bg-[#2B3B25] text-white font-montserrat">
                      {event.time.text}
                    </span>
                  </div>

                  {isEditor && <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-montserrat text-[9px] uppercase tracking-wide text-[#7A6840]"><span className="inline-flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {event.date?.text || data.weddingDate.text}</span><span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.venue?.text || data.weddingVenue.text}</span></div>}

                  <h3 className="font-montserrat font-semibold text-xs md:text-sm text-[#2B3B25] tracking-wide mt-0.5">
                    {event.name.text}
                  </h3>
                  <p className="font-cormorant text-[11px] md:text-xs text-[#4A3E20]/80 leading-relaxed m-0">
                    {event.desc.text}
                  </p>
                </div>
              </div>

              <div className="absolute left-6 md:left-1/2 top-4 md:top-auto -translate-x-1/2 w-5 h-5 rounded-full border-2 border-[#B58A3C] bg-[#FDFBF7] flex items-center justify-center z-20 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-[#B58A3C]" />
              </div>

              <div className="hidden md:block w-[45%]" />
            </motion.div>
          );
        })}
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-140 rounded-3xl border border-[#D5A967] bg-[#F8F6F2] p-5 shadow-2xl sm:p-7">
            <div className="mb-5 flex items-center justify-between border-b border-[#E1DDD7] pb-4">
              <h2 className="flex items-center gap-2 text-[22px] font-semibold text-[#3D3936]"><CalendarDays className="h-5 w-5 text-[#C85F3D]" /> {editingEvent ? 'Edit Wedding Gathering' : 'Add Wedding Gathering'}</h2>
              <button type="button" onClick={() => setFormOpen(false)} aria-label="Close event form"><X className="h-5 w-5 text-[#746D67]" /></button>
            </div>
            <div className="grid gap-4">
              <ScheduleField label="Event Name" value={eventName} onChange={setEventName} />
              <div className="grid gap-4 sm:grid-cols-2">
                <ScheduleField label="Date" value={eventDate} onChange={setEventDate} icon={<CalendarDays className="h-4 w-4" />} type="date" />
                <ScheduleField label="Time" value={eventTime} onChange={setEventTime} icon={<Clock3 className="h-4 w-4" />} placeholder="e.g. 6:00 PM" />
              </div>
              <ScheduleField label="Venue / Courtyard" value={eventVenue} onChange={setEventVenue} icon={<MapPin className="h-4 w-4" />} />
              <ScheduleField label="Cover Image URL" value={eventImage} onChange={setEventImage} icon={<Image className="h-4 w-4" />} placeholder="https://..." />
              <label className="block font-montserrat text-[11px] font-medium text-[#514B47]">Full Description<textarea className="mt-1.5 min-h-24 w-full resize-y rounded-xl border border-[#D9D4CE] bg-[#FFFEFC] px-3.5 py-3 text-[14px] text-[#3D3936] outline-none focus:border-[#C85F3D]" value={eventDescription} onChange={(event) => setEventDescription(event.target.value)} /></label>
            </div>
            <div className="mt-5 flex justify-end gap-5 border-t border-[#E1DDD7] pt-4"><button type="button" onClick={() => setFormOpen(false)} className="font-montserrat text-[11px] uppercase text-[#655F5A]">Cancel</button><button type="button" onClick={saveEvent} className="inline-flex items-center gap-2 rounded-xl bg-[#C85F3D] px-5 py-3 font-montserrat text-[11px] font-semibold uppercase text-white shadow-md"><Save className="h-4 w-4" /> {editingEvent ? 'Save Event' : 'Add Event'}</button></div>
          </div>
        </div>
      )}
    </section>
  );
}

function ScheduleField({ label, value, onChange, icon, placeholder, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; icon?: React.ReactNode; placeholder?: string; type?: string }) {
  return <label className="block font-montserrat text-[11px] font-medium text-[#514B47]">{label}<span className="relative block"><input type={type} className="mt-1.5 w-full rounded-xl border border-[#D9D4CE] bg-[#FFFEFC] px-3.5 py-3 text-[14px] text-[#3D3936] outline-none placeholder:text-[#AAA39C] focus:border-[#C85F3D] focus:ring-2 focus:ring-[#C85F3D]/10" value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />{icon && <span className="absolute right-3 top-4 text-[#C85F3D]">{icon}</span>}</span></label>;
}

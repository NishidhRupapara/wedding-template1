import React, { useState } from 'react';
import Home from './components/Home';
import EditorPanel from './components/EditorPanel';
import data from './Data.json';
import type { WeddingData, WeddingEventItem } from './Types';

const initialWeddingData = data as WeddingData;
const savedDataKey = 'wedding-editor-data';

const formatDateTextFromValue = (value: string) => {
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

const formatCountdownDate = (value: string) => {
  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [year, month, day] = isoMatch.slice(1);
    return `${year}-${month}-${day}T11:00:00`;
  }

  const displayMatch = value.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (displayMatch) {
    const [, day, monthName, year] = displayMatch;
    const monthMap: Record<string, string> = {
      jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06', jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
    };
    const month = monthMap[monthName.toLowerCase().slice(0, 3)];
    if (month) return `${year}-${month}-${day.padStart(2, '0')}T11:00:00`;
  }

  return undefined;
};

const getWeekdayNameForDate = (value: string) => {
  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [year, month, day] = isoMatch.slice(1);
    const date = new Date(`${year}-${month}-${day}T12:00:00`);
    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
    }
  }

  const displayMatch = value.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (displayMatch) {
    const [, day, monthName, year] = displayMatch;
    const date = new Date(`${day} ${monthName} ${year} 12:00:00`);
    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
    }
  }

  return undefined;
};

const normalizeWeddingData = (candidate: Partial<WeddingData> | null | undefined): WeddingData => {
  const base = structuredClone(initialWeddingData);

  if (!candidate) return base;

  const normalized: WeddingData = {
    ...base,
    ...candidate,
    invite: {
      ...base.invite,
      ...(candidate.invite ?? {}),
      blessing: { ...base.invite.blessing, ...(candidate.invite?.blessing ?? {}) },
      label: { ...base.invite.label, ...(candidate.invite?.label ?? {}) },
    },
    content: {
      ...base.content,
      ...(candidate.content ?? {}),
    },
    weddingEvents: Array.isArray(candidate.weddingEvents) ? candidate.weddingEvents : base.weddingEvents,
    memory: Array.isArray(candidate.memory) ? candidate.memory : base.memory,
    carouselPhotos: Array.isArray(candidate.carouselPhotos) ? candidate.carouselPhotos : base.carouselPhotos,
  };

  if (!normalized.weddingDate || !normalized.weddingDate.text) {
    normalized.weddingDate = base.weddingDate;
  }
  if (!normalized.content || !normalized.content.saveTheDate) {
    normalized.content = { ...base.content, ...(normalized.content ?? {}) };
  }

  return normalized;
};

export default function App(): React.JSX.Element {
  const [weddingData, setWeddingData] = useState<WeddingData>(() => {
    const savedData = window.localStorage.getItem(savedDataKey);
    if (!savedData) return structuredClone(initialWeddingData);

    try {
      return normalizeWeddingData(JSON.parse(savedData) as Partial<WeddingData>);
    } catch {
      window.localStorage.removeItem(savedDataKey);
      return structuredClone(initialWeddingData);
    }
  });
  const isEditor = new URLSearchParams(window.location.search).get('isediter') === 'true';
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorTab, setEditorTab] = useState<'couple' | 'date' | 'hashtag' | 'rsvp'>('couple');

  const openEditor = (tab: 'couple' | 'date' | 'hashtag' | 'rsvp' = 'couple') => {
    setEditorTab(tab);
    setEditorOpen(true);
  };

  const postChange = (message: Record<string, unknown>) => {
    window.parent.postMessage(message, '*');
  };

  const handleSave = (draft: WeddingData) => {
    const nextDraft = { ...draft };
    const normalizedWeddingDate = formatDateTextFromValue(draft.weddingDate.text);
    nextDraft.weddingDate = { ...draft.weddingDate, text: normalizedWeddingDate };
    const weekday = getWeekdayNameForDate(draft.weddingDate.text) ?? nextDraft.weddingDay?.text ?? 'Saturday';
    nextDraft.weddingDay = { ...nextDraft.weddingDay, text: weekday };
    const countdownDate = formatCountdownDate(normalizedWeddingDate);
    if (countdownDate) {
      nextDraft.countDown = { ...draft.countDown, date: countdownDate };
    }

    setWeddingData(structuredClone(nextDraft));
    window.localStorage.setItem(savedDataKey, JSON.stringify(nextDraft));
    postChange({ type: 'UPDATE', data: nextDraft, to_obj: 'weddingData' });

    Object.entries(nextDraft).forEach(([key, value]) => {
      if (value && typeof value === 'object' && 'text' in value) {
        postChange({ type: 'UPDATE', path: key, value: value.text, data: value, to_obj: 'weddingData' });
      }
    });
  };

  const handleAddPhoto = (url: string) => {
    const photo = {
      id: `photo_${crypto.randomUUID()}`,
      image: { id: `img_${crypto.randomUUID()}`, type: 'image', url },
    };
    setWeddingData((current) => {
      const next = { ...current, carouselPhotos: [...current.carouselPhotos, photo] };
      window.localStorage.setItem(savedDataKey, JSON.stringify(next));
      return next;
    });
    postChange({ type: 'ADD', data: photo, to_obj: 'carouselPhotos' });
  };

  const handleAddEvent = (event: WeddingEventItem) => {
    setWeddingData((current) => {
      const next = { ...current, weddingEvents: [...current.weddingEvents, event] };
      window.localStorage.setItem(savedDataKey, JSON.stringify(next));
      return next;
    });
    postChange({ type: 'ADD', data: event, to_obj: 'weddingEvents' });
  };

  const handleDeletePhoto = (photoId: string) => {
    setWeddingData((current) => {
      const next = { ...current, carouselPhotos: current.carouselPhotos.filter((photo) => photo.id !== photoId) };
      window.localStorage.setItem(savedDataKey, JSON.stringify(next));
      return next;
    });
    postChange({ type: 'REMOVE', id: photoId, to_obj: 'carouselPhotos' });
  };

  const handleUpdatePhoto = (photoId: string, url: string) => {
    setWeddingData((current) => {
      const next = {
        ...current,
        carouselPhotos: current.carouselPhotos.map((photo) => photo.id === photoId ? { ...photo, image: { ...photo.image, url } } : photo),
      };
      window.localStorage.setItem(savedDataKey, JSON.stringify(next));
      return next;
    });
    postChange({ type: 'UPDATE', id: photoId, data: { image: { url } }, to_obj: 'carouselPhotos' });
  };

  const handleDeleteEvent = (eventId: string) => {
    setWeddingData((current) => {
      const next = { ...current, weddingEvents: current.weddingEvents.filter((event) => event.id !== eventId) };
      window.localStorage.setItem(savedDataKey, JSON.stringify(next));
      return next;
    });
    postChange({ type: 'REMOVE', id: eventId, to_obj: 'weddingEvents' });
  };

  const handleUpdateEvent = (eventId: string, changes: Partial<WeddingEventItem>) => {
    setWeddingData((current) => {
      const next = { ...current, weddingEvents: current.weddingEvents.map((event) => event.id === eventId ? { ...event, ...changes } : event) };
      window.localStorage.setItem(savedDataKey, JSON.stringify(next));
      return next;
    });
    postChange({ type: 'UPDATE', id: eventId, data: changes, to_obj: 'weddingEvents' });
  };

  const handleUpdateText = (key: string, value: string) => {
    setWeddingData((current) => {
      const next = { ...current } as WeddingData & Record<string, unknown>;
      const target = next[key as keyof WeddingData] as { text?: string } | undefined;
      if (target && typeof target === 'object' && 'text' in target) {
        const nextValue = key === 'weddingDate' ? formatDateTextFromValue(value) : value;
        target.text = nextValue;

        if (key === 'weddingDate') {
          const weekday = getWeekdayNameForDate(value) ?? next.weddingDay?.text ?? 'Saturday';
          next.weddingDay = { ...next.weddingDay, text: weekday };
          const countdownDate = formatCountdownDate(nextValue);
          if (countdownDate) {
            next.countDown = { ...next.countDown, date: countdownDate };
          }
        }
      }
      window.localStorage.setItem(savedDataKey, JSON.stringify(next));
      return next as WeddingData;
    });
  };

  const handleUpdateEventField = (eventId: string, field: 'name' | 'date' | 'time' | 'venue' | 'desc', value: string) => {
    setWeddingData((current) => {
      const next = {
        ...current,
        weddingEvents: current.weddingEvents.map((event) => {
          if (event.id !== eventId) return event;
          const currentField = event[field];
          if (!currentField) {
            return {
              ...event,
              [field]: { id: `${field}-${event.id}`, type: 'text', text: value },
            };
          }
          return {
            ...event,
            [field]: { ...currentField, text: value },
          };
        }),
      };
      window.localStorage.setItem(savedDataKey, JSON.stringify(next));
      return next;
    });
  };

  return (
    <>
      <Home
        data={weddingData}
        isEditor={isEditor}
        onAddPhoto={handleAddPhoto}
        onUpdatePhoto={handleUpdatePhoto}
        onDeletePhoto={handleDeletePhoto}
        onAddEvent={handleAddEvent}
        onUpdateEvent={handleUpdateEvent}
        onDeleteEvent={handleDeleteEvent}
        onUpdateText={handleUpdateText}
        onUpdateEventField={handleUpdateEventField}
        onOpenEditor={openEditor}
      />
      {isEditor && editorOpen && (
        <EditorPanel
          data={weddingData}
          defaultData={initialWeddingData}
          onSave={handleSave}
          onAddPhoto={handleAddPhoto}
          onAddEvent={handleAddEvent}
          onClose={() => setEditorOpen(false)}
          initialTab={editorTab}
        />
      )}
    </>
  );
}

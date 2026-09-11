export interface textObj {
    id?: string;
    text: string;
    type?: 'text' | string;
}

export interface imageObj {
    id?: string;
    type?: 'image' | string;
    url: string;
}

export interface countDown {
    id?: string;
    type?: 'countDown' | string;
    date: string;
}

export interface WeddingEventItem {
    id: string;
    name: textObj;
    date?: textObj;
    time: textObj;
    venue?: textObj;
    desc: textObj;
    icon: imageObj;
}

export interface MemoryItem {
    id: string;
    quote: textObj;
    fallback: imageObj;
}

export interface PhotoItem {
    id: string;
    image: imageObj;
}

export interface InviteConfig {
    blessing: textObj;
    label: textObj;
}

export interface ContentData {
    [key: string]: textObj;
}

export interface WeddingData {
    brideName: textObj;
    brideFullName?: textObj;
    groomName: textObj;
    groomFullName?: textObj;
    weddingDay: textObj;
    weddingDate: textObj;
    weddingVenue: textObj;
    weddingMapQuery: textObj;
    weddingMapUrl?: textObj;
    venueCity?: textObj;
    venueState?: textObj;
    hashtag: textObj;
    hashtagTagline?: textObj;
    countDown: countDown;
    brideParents: textObj;
    groomParents: textObj;
    rsvpMobileNumber?: textObj;
    rsvpMessage?: textObj;
    invite: InviteConfig;
    content: ContentData;
    memory: MemoryItem[];
    weddingEvents: WeddingEventItem[];
    carouselPhotos: PhotoItem[];
}

export interface PageProps {
    data: WeddingData;
    isEditor?: boolean;
    onOpenEditor?: (tab?: 'couple' | 'date' | 'hashtag' | 'rsvp') => void;
    onAddPhoto?: (url: string) => void;
    onUpdatePhoto?: (photoId: string, url: string) => void;
    onDeletePhoto?: (photoId: string) => void;
    onAddEvent?: (event: WeddingEventItem) => void;
    onUpdateEvent?: (eventId: string, changes: Partial<WeddingEventItem>) => void;
    onDeleteEvent?: (eventId: string) => void;
    onUpdateText?: (key: string, value: string) => void;
    onUpdateEventField?: (eventId: string, field: 'name' | 'date' | 'time' | 'venue' | 'desc', value: string) => void;
}

export interface EditorProps {
    data: WeddingData;
    defaultData: WeddingData;
    onSave: (draft: WeddingData) => void;
    onAddPhoto: (url: string) => void;
    onAddEvent: (event: WeddingEventItem) => void;
    onClose: () => void;
    initialTab?: 'couple' | 'date' | 'hashtag' | 'rsvp';
}

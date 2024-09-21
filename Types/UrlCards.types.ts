
export interface UrlCardProps {
    originalUrl: string;
    title: string;
    createdAt: string;
    _id: string;
    city?: string[];
    country?: string[];
    updatedAt?: string;
    clicks: number;
    devices?: string[];
    qrcode: string;
    user_id?: string;
    shortedUrl: string;
};
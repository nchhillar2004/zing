import { PollLength } from "@/components/forms/CreatePoll";

export function getCurrentTime(): string {
    return new Date().toISOString();
}

export function formatISO(isoDate: string): string {
    const date = new Date(isoDate);

    const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);

    const formattedTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }).format(date);

    return `${formattedDate} at ${formattedTime}`;
}

export function formatDate(date: Date){
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
};

export function formatRelativeTime(date: Date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d`;
    return formatDate(date);
};

export function getPollEndTime(pollLength: PollLength | null) {
    if (!pollLength) return null;
    const now = new Date();

    const end = new Date(
        now.getTime() + 
            pollLength.days * 24 * 60 * 60 * 1000 +
            pollLength.hours * 60 * 60 * 1000 +
            pollLength.minutes * 60 * 1000
    );

    return end;
}

import Link from "next/link";

export default function FormatPost({content}: {content: string}) {
    const regex = /([#@][\w_]+)/g;

    const parts = content.split(regex);

    return parts.map((part, i) => {
        if (part.startsWith("#")) {
            const tag = part.slice(1);
            return (
                <Link
                    key={i}
                    href={`/hashtag/${encodeURIComponent(tag)}`}
                    className="text-primary hover:underline"
                    onClick={(e) => e.stopPropagation()}
                >
                    {part}
                </Link>
            );
        }

        if (part.startsWith("@")) {
            const user = part.slice(1);
            return (
                <Link
                    key={i}
                    href={`/user/${encodeURIComponent(user)}`}
                    className="text-primary hover:underline"
                    onClick={(e) => e.stopPropagation()}
                >
                    {part}
                </Link>
            );
        }

        return <span key={i}>{part}</span>;
    });
}


import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

export async function sanitizeHtml(input: string): Promise<string> {
    if (!input) return "";

    const dirty = await marked.parse(input);

    const clean = DOMPurify.sanitize(dirty, {
        ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "br", "ul", "ol", "li"],
        ALLOWED_ATTR: ["href", "target"],
    });

    return clean;
}


import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

const schema = {
    tagNames: ['b', 'i', 'em', 'strong', 'a', 'br', 'ul', 'ol', 'li'],
    attributes: { a: ['href', 'target'] },
};

const processor = unified()
.use(remarkParse)
.use(remarkRehype)
.use(rehypeSanitize, schema)
.use(rehypeStringify);

export async function sanitizeHtml(input: string): Promise<string> {
    if (!input) return '';
    const file = await processor.process(input);
    return String(file);
}

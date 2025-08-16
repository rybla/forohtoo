import matter from "gray-matter";

export type Post = {
    /**
     * Title of the post
     */
    title: string;
    /**
     * Date that the post was published
     */
    publishedDate: Date;
    /**
     * Tags for categorizing the post
     */
    tags: string[];
    /**
     * Markdown content of the post
     */
    content: string;
};

/**
 * Parses the raw string from reading the markdown file of a post into {@link Post} form.
 *
 * @param s The raw string from reading the markdown file of the post. The post will include frontmatter in between fences that specifies the post's title, published date, etc. in YAML format.
 */
export function parsePost(s: string): Post | null {
    try {
        const { data, content } = matter(s);

        if (
            !data ||
            typeof data.title !== "string" ||
            !data.publishedDate ||
            !Array.isArray(data.tags)
        ) {
            return null;
        }

        const publishedDate = new Date(data.publishedDate);
        if (isNaN(publishedDate.getTime())) {
            return null;
        }

        const post: Post = {
            title: data.title,
            publishedDate,
            tags: data.tags.filter(
                (tag): tag is string => typeof tag === "string",
            ),
            content: content.trim(),
        };

        return post;
    } catch (error) {
        console.error("Failed to parse post:", error);
        return null;
    }
}

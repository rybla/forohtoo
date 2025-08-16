import matter from "gray-matter";
import { Post, PostMetadata } from "./ontology";
import * as fs from "fs/promises";
import path from "path";

export async function readPosts(paid: boolean): Promise<Post[]> {
    const postIds = await fs.readdir(`input/${paid ? "paid" : "free"}/post`, {
        recursive: false,
        encoding: "utf8",
    });
    return (
        await Promise.all(
            postIds.map((filename) => {
                if (!filename.endsWith(".md")) return null;
                const id = path.basename(filename, ".md");
                return readPost(paid, id);
            }),
        )
    ).filter((x) => x !== null);
}

export async function readPost(
    paid: boolean,
    id: string,
): Promise<Post | null> {
    try {
        const postText = await fs.readFile(
            `input/${paid ? "paid" : "free"}/post/${id}.md`,
            "utf8",
        );
        return parsePost(paid, id, postText);
    } catch (e) {
        return null;
    }
}

/**
 * Parses the raw string from reading the markdown file of a post into {@link Post} form.
 *
 * @param s The raw string from reading the markdown file of the post. The post will include frontmatter in between fences that specifies the post's title, published date, etc. in YAML format.
 */
export function parsePost(paid: boolean, id: string, s: string): Post | null {
    try {
        const { data, content } = matter(s);
        const metadata = PostMetadata.parse(data);
        const post: Post = {
            paid,
            id,
            metadata,
            content: content.trim(),
        };

        return post;
    } catch (error) {
        console.error("Failed to parse post:", error);
        return null;
    }
}

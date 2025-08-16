import z from "zod";

export type PostMetadata = z.infer<typeof PostMetadata>;
export const PostMetadata = z.object({
    title: z.string(),
    publishedDate: z.date(),
    tags: z.array(z.string()),
});

export type Post = {
    /**
     * Whether or not the post is paid content
     */
    paid: boolean;
    /**
     * The unique id of the post.
     */
    id: string;
    /**
     * Post metadata
     */
    metadata: PostMetadata;
    /**
     * Markdown content of the post
     */
    content: string;
};

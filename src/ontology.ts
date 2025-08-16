export type Post = {
    paid: boolean;
    /**
     * The unique id of the post.
     */
    id: string;
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

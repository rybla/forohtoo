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

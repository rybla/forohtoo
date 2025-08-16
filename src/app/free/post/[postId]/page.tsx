import { parsePost } from "@/post";
import { do_ } from "@/utility";
import * as fs from "fs/promises";
import Markdown from "react-markdown";
import styles from "./page.module.css";

type Params = {
    postId: string;
};

type Props = {
    params: Promise<Params>;
};

export default async function Page(props: Props) {
    const { postId } = await props.params;

    const post = await do_(async () => {
        try {
            const postText = await fs.readFile(
                `input/free/post/${postId}.md`,
                "utf8",
            );
            return parsePost(postText);
        } catch (e) {
            return null;
        }
    });

    return (
        <div className={styles.Page}>
            <div>postId: {postId}</div>
            <hr />
            {post === null ? (
                <div>post does not exist</div>
            ) : (
                <div>
                    <div>title: {post.title}</div>
                    <div>
                        published date: {post.publishedDate.toDateString()}
                    </div>
                    <div>tags: {post.tags.join(", ")}</div>
                    <hr />
                    <Markdown>{post.content}</Markdown>
                </div>
            )}
        </div>
    );
}

"use server";

import { do_, sleep } from "@/utility";
import styles from "./Post.module.css";
import * as fs from "fs/promises";
import { parsePost } from "@/post";
import Markdown from "react-markdown";

export default async function Post(props: { postId: string }) {
    const post = await do_(async () => {
        try {
            const postText = await fs.readFile(
                `input/free/post/${props.postId}.md`,
                "utf8",
            );
            return parsePost(postText);
        } catch (e) {
            return null;
        }
    });

    await sleep(500);

    return (
        <div className={styles.Page}>
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

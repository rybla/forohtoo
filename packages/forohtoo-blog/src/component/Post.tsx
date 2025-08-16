"use server";

import { do_, sleep } from "@/utility";
import styles from "./Post.module.css";
import * as fs from "fs/promises";
import { parsePost } from "@/post";
import Markdown from "react-markdown";
import path from "path";
import { inputDirpath } from "forohtoo-common";

export default async function Post(props: { paid: boolean; id: string }) {
    const post = await do_(async () => {
        try {
            const postText = await fs.readFile(
                path.join(inputDirpath, props.paid ? "paid" : "free", "post", props.id + ".md"),
                "utf8",
            );
            return parsePost(props.paid, props.id, postText);
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
                    <div>title: {post.metadata.title}</div>
                    <div>
                        published date:{" "}
                        {post.metadata.publishedDate.toDateString()}
                    </div>
                    <div>tags: {post.metadata.tags.join(", ")}</div>
                    <hr />
                    <Markdown>{post.content}</Markdown>
                </div>
            )}
        </div>
    );
}

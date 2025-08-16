"use server";

import { do_, sleep } from "@/utility";
import styles from "./Post.module.css";
import * as fs from "fs/promises";
import { parsePost } from "@/post";
import Markdown from "react-markdown";
import path from "path";
import { inputDirpath } from "forohtoo-common";
import { Suspense } from "react";

type Props = {
    paid: boolean;
    id: string
};

// eslint-disable-next-line @typescript-eslint/require-await
export default async function PostSuspense(props: Props) {
    return (
        <Suspense fallback={<div>Loading post ${props.id}</div>}>
            <Post paid={props.paid} id={props.id} />
        </Suspense>
    )
}

async function Post(props: Props) {
    const post = await do_(async () => {
        try {
            const postText = await fs.readFile(
                path.join(inputDirpath, props.paid ? "paid" : "free", "post", props.id + ".md"),
                "utf8",
            );
            return parsePost(props.paid, props.id, postText);
        } catch {
            return null;
        }
    });

    // this for testing, so I can see the loading animation briefly
    await sleep(500);

    return (
        <div className={styles.Post}>
            {post === null ? (
                <div className="nonexistent">post does not exist</div>
            ) : (
                <>
                    <div className={styles.title}>title: {post.metadata.title}</div>
                    <div className={styles.date}>
                        published date:{" "}
                        {post.metadata.publishedDate.toDateString()}
                    </div>
                    <div className={styles.tags}>tags: {post.metadata.tags.join(", ")}</div>
                    <div className={styles.content}>
                        <Markdown>{post.content}</Markdown>
                    </div>
                </>
            )}
        </div>
    );
}

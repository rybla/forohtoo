import Post from "@/component/Post";
import { parsePost } from "@/post";
import { do_ } from "@/utility";
import * as fs from "fs/promises";
import styles from "./page.module.css";
import { Suspense } from "react";

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
            <div>free postId: {postId}</div>
            <hr />
            <Suspense fallback={<div>🌀 Loading data...</div>}>
                <Post postId={postId} />
            </Suspense>
        </div>
    );
}

import Post from "@/component/Post";
import { parsePost, readPost } from "@/post";
import { do_ } from "@/utility";
import * as fs from "fs/promises";
import styles from "./page.module.css";
import { Suspense } from "react";
import Header from "@/component/Header";

type Params = {
    postId: string;
};

type Props = {
    params: Promise<Params>;
};

export default async function Page(props: Props) {
    const { postId } = await props.params;

    return (
        <div className={styles.Page}>
            <Header subtitle={postId} />
            <Suspense fallback={<div>🌀 Loading data...</div>}>
                <Post paid={false} id={postId} />
            </Suspense>
        </div>
    );
}

"use server";

import Header from "@/component/Header";
import Post from "@/component/Post";
import styles from "../../../post.module.css";

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
            <div className={styles.PostContainer}>
                <Post paid={false} id={postId} />
            </div>
        </div>
    );
}

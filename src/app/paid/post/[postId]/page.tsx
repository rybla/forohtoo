import Post from "@/component/Post";
import { parsePost } from "@/post";
import { do_ } from "@/utility";
import * as fs from "fs/promises";
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
                `input/paid/post/${postId}.md`,
                "utf8",
            );
            return parsePost(postText);
        } catch (e) {
            return null;
        }
    });

    return (
        <div className={styles.Page}>
            <div>paid postId: {postId}</div>
            <hr />
            <Post postId={postId} />
        </div>
    );
}

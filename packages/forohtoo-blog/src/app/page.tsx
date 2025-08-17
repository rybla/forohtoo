"use server";

import { readPosts } from "@/post";
import styles from "./page.module.css";
import Header from "@/component/Header";
import Link from "next/link";

export default async function Home() {
    const freePosts = await readPosts(false);
    const paidPosts = await readPosts(true);
    const posts = [...freePosts, ...paidPosts];
    posts.sort(
        (x, y) =>
            y.metadata.publishedDate.getTime() -
            x.metadata.publishedDate.getTime(),
    );

    return (
        <div className={styles.Page}>
            <Header subtitle="index" />
            <div className={styles.posts}>
                {posts.map((post) => (
                    <div className={styles.PostPreview} key={post.id}>
                        <div className={styles.title}>
                            <Link
                                href={`/${post.paid ? "paid" : "free"}/post/${post.id}`}
                            >
                                {post.metadata.title}
                            </Link>
                        </div>
                        <div className={styles.sharesheet}>
                            {/* TODO: copy link to clipboard */}
                            <button>🔗</button>
                        </div>
                        <div className={styles.publishedDate}>
                            {post.metadata.publishedDate.toDateString()}
                        </div>
                        <div className={styles.tags}>
                            {post.metadata.tags.join(", ")}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

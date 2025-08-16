export const dynamic = "force-dynamic";

interface Post {
    id: number;
    title: string;
    body: string;
}

async function getPost(): Promise<Post> {
    const randomId = Math.floor(Math.random() * 100) + 1;
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${randomId}`,
    );

    if (!res.ok) {
        throw new Error("Failed to fetch post");
    }

    return res.json();
}

export default async function Page() {
    const post = await getPost();

    return (
        <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
            <h1>Simple SSR Example</h1>
            <p>
                This page is rendered on the server for every request. Refresh
                to get a new post.
            </p>
            <div
                style={{
                    border: "1px solid #ccc",
                    padding: "1rem",
                    marginTop: "1rem",
                    borderRadius: "8px",
                }}
            >
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <small>Post ID: {post.id}</small>
            </div>
        </main>
    );
}

type Params = {
    postId: string;
};

type Props = {
    params: Promise<Params>;
};

export default async function Page(props: Props) {
    const { postId } = await props.params;
    return (
        <div>
            <div>postId: {postId}</div>
            <div>this is a <b>paid</b> post</div>
        </div>
    );
}

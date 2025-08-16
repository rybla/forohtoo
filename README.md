# forohtoo

This project is a blogging system for a blogger to host a blog that can request payment in order to view certain posts (which are referred to as _paid_ posts).

This project is a monorepo that has 3 packages (all in the `packages` directory).

- `forohtoo-common`: A collection of all common types, constants, and other definitions that are used in across other packages.
- `forohtoo-blog`: A personal blog webapp that reads the posts from Markdown files from the `input` directory. A post can be either _free_ (if it is in the `input/free/post` directory) or _paid_ (if it is in the `input/paid/post` directory). If a post is _paid_, then requesting that post will return a `402` HTTP response, which requires the user to pay an amount in USDC to the blogger's wallet in order to view the post. This is facilitated by the imported "@coinbase/x402", "x402-fetch", and "x402-next" libraries.
- `forohtoo-dashboard`: A personal dashboard that presents information about the blogger's wallet history relating to transactions that were sent in response to the `402` HTTP responses for viewing posts in the blog. Basically, this is a way for the blogger to view when and how much people are paying to read the paid posts.

## Development

To run a development server that hosts the `forohtoo-blog`:

```sh
bun run --filter "forohtoo-blog" dev
```

To run a development server that hosts the `forohtoo-dashboard`:

```sh
bun run --filter "forohtoo-dashboard" dev
```

## Building

To build all packages:

```sh
bun run --filter "*" build
```

## Notes for Contributors

### Environment Variables

You will need to initialize the following `.env` files. You can fill them with dummy values if just for testing. Look at their corresponding `env.ts` files to see what fields are required.
- `packages/forohtoo-dashboard/.env`
- `packages/forohtoo-blog/.env`

### Committing

Before __every__ commit, linting and building must succeed without any warnings or errors:

```sh
# lint all packages
bun run --filter "*" lint

# build all packages
bun run --filter "*" build
```

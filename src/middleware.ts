import { paymentMiddleware } from "x402-next";
import { network, publicFacilitatorUrl } from "../constant";
import env from "./env";

export const middleware = paymentMiddleware(
    env.RECEIVER_ADDRESS,
    {
        "/paid": {
            price: "$0.001",
            network,
            config: {
                description:
                    "Access to paid content (this is the `config.description` in the middleware)",
            },
        },
    },
    {
        url: publicFacilitatorUrl,
    },
    {
        appName: "Next x402 Demo",
        appLogo: "/favicon.png",
    },
);

export const config = {
    matcher: ["/paid/:path*"],
};

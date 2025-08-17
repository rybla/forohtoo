import { network, publicFacilitatorUrl } from "forohtoo-common";
import { paymentMiddleware } from "x402-next";
// import { paymentMiddleware } from "./middleware_helper";
import env from "./env";

export const middleware = paymentMiddleware(
    env.RECEIVER_ADDRESS,
    {
        "/paid/post/*": {
            price: "$0.01",
            network,
            config: { description: "Access to paid post" },
        },
    },
    {
        url: publicFacilitatorUrl,
    },
    {
        appName: "forohtoo",
        appLogo: "/favicon.png",
    },
);

export const config = {
    matcher: ["/paid/:path*"],
};

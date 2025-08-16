import { paymentMiddleware } from "x402-next";
import { network, publicFacilitatorUrl, recieverAddress } from "../constant";

export const middleware = paymentMiddleware(
    recieverAddress,
    {
        "/paid": {
            price: "$0.001",
            network,
            config: {
                description: "Access to paid content (this is the `config.description` in the middleware)",
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

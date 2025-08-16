import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "forohtoo",
    description: "A blogging platform that uses x402 to faciliate paid content.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}

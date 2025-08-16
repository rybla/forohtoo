import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "forohtoo",
    description: "A website for publishing blogs that get you tips.",
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

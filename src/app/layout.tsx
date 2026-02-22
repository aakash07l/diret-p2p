import type { Metadata } from "next";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";

export const metadata: Metadata = {
    title: "P2P.ME - USDT to INR",
    description: "Simplified USDT to INR trading platform.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ThirdwebProvider>
                    {children}
                </ThirdwebProvider>
            </body>
        </html>
    );
}

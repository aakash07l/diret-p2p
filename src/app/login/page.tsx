"use client";

import React, { useEffect } from "react";
import { ConnectEmbed, useActiveAccount } from "thirdweb/react";
import { client } from "@/lib/thirdweb";
import { SUPPORTED_CHAIN } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { ShieldCheck, Zap } from "lucide-react";

export default function LoginPage() {
    const account = useActiveAccount();
    const router = useRouter();

    useEffect(() => {
        if (account) {
            router.push("/");
        }
    }, [account, router]);

    return (
        <main className="animate-in" style={{
            minHeight: "100vh",
            background: "linear-gradient(180deg, #f3f0ff 0%, #ffffff 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2rem 1.5rem"
        }}>
            <div style={{ textAlign: "center", marginTop: "3rem", marginBottom: "3rem" }}>
                <div style={{
                    width: "64px",
                    height: "64px",
                    background: "var(--accent-primary)",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    margin: "0 auto 1rem",
                    boxShadow: "0 10px 20px -5px rgba(124, 58, 237, 0.4)"
                }}>
                    <Zap size={32} fill="white" />
                </div>
                <h1 style={{ fontSize: "28px", fontWeight: "900", color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
                    P2P.ME
                </h1>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "8px" }}>
                    Secure USDT to INR Trading Platform
                </p>
            </div>

            <div style={{ width: "100%", maxWidth: "400px" }}>
                <ConnectEmbed
                    client={client}
                    chain={SUPPORTED_CHAIN}
                    theme="light"
                />
            </div>

            <div style={{ marginTop: "auto", paddingBottom: "2rem", display: "flex", alignItems: "center", gap: "8px", color: "var(--text-tertiary)" }}>
                <ShieldCheck size={16} />
                <span style={{ fontSize: "12px", fontWeight: "500" }}>Secured by Thirdweb & Blockchain</span>
            </div>
        </main>
    );
}

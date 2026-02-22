"use client";

import React, { useState } from "react";
import { ArrowLeft, Copy, CheckCircle2, QrCode, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useActiveAccount } from "thirdweb/react";

export default function DepositPage() {
    const account = useActiveAccount();
    const [copied, setCopied] = useState(false);

    const copyAddress = () => {
        if (!account?.address) return;
        navigator.clipboard.writeText(account.address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="animate-in">
            <header className="header-nav" style={{ borderBottom: "1px solid var(--border-color)" }}>
                <Link href="/" className="icon-btn">
                    <ArrowLeft size={20} />
                </Link>
                <div style={{ fontWeight: "700", fontSize: "16px" }}>Deposit USDT</div>
                <div style={{ width: 20 }} />
            </header>

            <div style={{ padding: "1.5rem" }}>
                {!account ? (
                    <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                        <div style={{ color: "var(--text-tertiary)", marginBottom: "1rem" }}>Please login to see your deposit address.</div>
                        <Link href="/" className="btn btn-primary">Go to Dashboard</Link>
                    </div>
                ) : (
                    <>
                        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                            <div style={{
                                background: "white",
                                padding: "20px",
                                borderRadius: "24px",
                                display: "inline-block",
                                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                                marginBottom: "1.5rem"
                            }}>
                                <QrCode size={180} color="var(--accent-primary)" strokeWidth={1.5} />
                            </div>
                            <h2 style={{ fontSize: "18px", fontWeight: "800" }}>Your Deposit Address</h2>
                            <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>
                                Only send <b>USDT (BEP20)</b> to this address.
                            </p>
                        </div>

                        <div className="card" style={{ background: "var(--bg-secondary)", border: "none", position: "relative", padding: "1.5rem" }}>
                            <div style={{ fontSize: "10px", fontWeight: "700", color: "var(--text-tertiary)", marginBottom: "8px", textTransform: "uppercase" }}>Wallet Address (BSC)</div>
                            <div style={{ wordBreak: "break-all", fontSize: "14px", fontWeight: "700", lineHeight: "1.5", paddingRight: "40px" }}>
                                {account.address}
                            </div>
                            <button
                                onClick={copyAddress}
                                style={{
                                    position: "absolute",
                                    right: "1.5rem",
                                    bottom: "1.5rem",
                                    background: "var(--accent-primary)",
                                    color: "white",
                                    border: "none",
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                            </button>
                        </div>

                        <div style={{ marginTop: "1.5rem", padding: "12px", background: "#fef3c7", borderRadius: "12px", border: "1px solid #fcd34d" }}>
                            <div style={{ fontSize: "11px", color: "#92400e", lineHeight: "1.5" }}>
                                <b>Warning:</b> Sending any other token or using a different network (like TRC20 or ERC20) will result in permanent loss of funds.
                            </div>
                        </div>

                        <div style={{ textAlign: "center", marginTop: "2rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "var(--text-tertiary)" }}>
                            <ShieldCheck size={14} />
                            <span style={{ fontSize: "11px" }}>Secure Embedded Wallet by Thirdweb</span>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}

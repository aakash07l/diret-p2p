"use client";

import React, { useState } from "react";
import { ArrowLeft, Send, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useActiveAccount } from "thirdweb/react";

export default function WithdrawPage() {
    const account = useActiveAccount();
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState("");

    return (
        <main className="animate-in">
            <header className="header-nav" style={{ borderBottom: "1px solid var(--border-color)" }}>
                <Link href="/" className="icon-btn">
                    <ArrowLeft size={20} />
                </Link>
                <div style={{ fontWeight: "700", fontSize: "16px" }}>Withdraw USDT</div>
                <div style={{ width: 20 }} />
            </header>

            <div style={{ padding: "1.5rem" }}>
                {!account ? (
                    <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                        <div style={{ color: "var(--text-tertiary)", marginBottom: "1rem" }}>Please login to withdraw funds.</div>
                        <Link href="/" className="btn btn-primary">Go to Dashboard</Link>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        <div>
                            <label style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-secondary)", display: "block", marginBottom: "8px" }}>Recipient Address (BEP20)</label>
                            <input
                                type="text"
                                placeholder="0x..."
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid var(--border-color)", fontSize: "14px" }}
                            />
                        </div>

                        <div>
                            <label style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-secondary)", display: "block", marginBottom: "8px" }}>Amount to Withdraw</label>
                            <div style={{ position: "relative" }}>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid var(--border-color)", fontSize: "14px" }}
                                />
                                <div style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "12px", fontWeight: "700", color: "var(--text-tertiary)" }}>USDT</div>
                            </div>
                        </div>

                        <div style={{ padding: "12px", background: "var(--bg-secondary)", borderRadius: "12px", display: "flex", gap: "10px" }}>
                            <AlertCircle size={18} color="var(--text-tertiary)" />
                            <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
                                Network: <b>Binance Smart Chain</b>. Withdrawals are processed instantly on-chain.
                            </div>
                        </div>

                        <button
                            className="btn btn-primary"
                            style={{ width: "100%", padding: "1rem", borderRadius: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                            disabled={!address || !amount}
                        >
                            <Send size={18} /> Send USDT
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}

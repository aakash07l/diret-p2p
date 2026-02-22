"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Store, AlertCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function SellAmountPage() {
    const router = useRouter();
    const [amount, setAmount] = useState("");
    const [rate, setRate] = useState(90.00);

    useEffect(() => {
        fetch("/api/rate").then(res => res.json()).then(data => setRate(data.rate));
    }, []);

    const handleNext = () => {
        if (!amount || parseFloat(amount) <= 0) return;
        router.push(`/app/sell/timer?amount=${amount}`);
    };

    return (
        <main className="animate-in">
            <header className="header-nav" style={{ borderBottom: "1px solid var(--border-color)" }}>
                <Link href="/" className="icon-btn">
                    <ArrowLeft size={20} />
                </Link>
                <div style={{ fontWeight: "700", fontSize: "16px" }}>Sell USDT</div>
                <div style={{ width: 20 }} />
            </header>

            <div style={{ padding: "2rem 1.5rem" }}>
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <div className="icon-circle" style={{ margin: "0 auto 1rem", background: "var(--accent-primary-dim)", color: "var(--accent-primary)", width: 64, height: 64, borderRadius: 20 }}>
                        <Store size={32} />
                    </div>
                    <h2 style={{ fontSize: "20px", fontWeight: "800" }}>Sell your USDT</h2>
                    <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>
                        Funds will be transferred to your added Bank/UPI account.
                    </p>
                </div>

                <div className="card" style={{ background: "var(--bg-secondary)", border: "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <label style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-secondary)" }}>Amount to Sell</label>
                        <span style={{ fontSize: "12px", color: "var(--accent-primary)", fontWeight: "600" }}>MAX</span>
                    </div>

                    <div style={{ position: "relative" }}>
                        <input
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", background: "white", border: "1px solid var(--border-color)", fontSize: "18px", fontWeight: "700" }}
                        />
                        <div style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px" }}>
                            USDT
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                        <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>Exchange Rate</span>
                        <span style={{ fontSize: "12px", fontWeight: "600" }}>1 USDT = ₹{rate}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
                        <span style={{ fontSize: "14px", color: "var(--text-primary)", fontWeight: "500" }}>You will receive</span>
                        <span style={{ fontSize: "16px", fontWeight: "800", color: "var(--success)" }}>
                            ₹{amount ? (parseFloat(amount) * rate).toLocaleString() : "0"}
                        </span>
                    </div>
                </div>

                <div style={{ marginTop: "1.5rem", padding: "12px", background: "var(--warning-dim)", borderRadius: "12px", display: "flex", gap: "10px" }}>
                    <AlertCircle size={18} style={{ color: "var(--warning)", flexShrink: 0 }} />
                    <div style={{ fontSize: "10px", color: "#92400e", lineHeight: "1.4" }}>
                        Make sure you have added your payment details in <b>Settings</b> before proceeding. Admin will pay to the account linked to your profile.
                    </div>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={handleNext}
                    disabled={!amount}
                    style={{ width: "100%", marginTop: "2rem", padding: "1rem", borderRadius: "1rem" }}
                >
                    Sell Now
                </button>

                <div style={{ textAlign: "center", marginTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "var(--text-tertiary)" }}>
                    <ShieldCheck size={14} />
                    <span style={{ fontSize: "11px" }}>Secure Transaction via P2P.ME</span>
                </div>
            </div>
        </main>
    );
}

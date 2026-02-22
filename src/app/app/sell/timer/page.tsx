"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Clock, Copy, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { ADMIN_WALLET_ADDRESS } from "@/lib/constants";

function TimerContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const amount = searchParams.get("amount") || "0";

    const [timeLeft, setTimeLeft] = useState(600);
    const [copied, setCopied] = useState(false);
    const [status, setStatus] = useState<"pending" | "sent">("pending");

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    const copyAddress = () => {
        navigator.clipboard.writeText(ADMIN_WALLET_ADDRESS);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSent = () => {
        setStatus("sent");
        setTimeout(() => {
            router.push("/app/orders");
        }, 3000);
    };

    return (
        <div style={{ padding: "1.5rem" }}>
            <div className="card" style={{ textAlign: "center", marginBottom: "1.5rem", background: "var(--bg-secondary)", border: "none" }}>
                <div style={{ color: "var(--text-secondary)", fontSize: "12px", marginBottom: "4px" }}>Time Remaining</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "32px", fontWeight: "800", color: timeLeft < 60 ? "var(--danger)" : "var(--text-primary)" }}>
                    <Clock size={28} />
                    {formatTime(timeLeft)}
                </div>
            </div>

            <div className="card" style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "1rem" }}>Instructions</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--accent-primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", flexShrink: 0 }}>1</div>
                        <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                            Send exactly <b style={{ color: "var(--text-primary)" }}>{amount} USDT (BEP20)</b> to the address below.
                        </div>
                    </div>

                    <div style={{ padding: "12px", background: "var(--bg-secondary)", borderRadius: "12px", fontSize: "11px", position: "relative" }}>
                        <div style={{ color: "var(--text-tertiary)", marginBottom: "4px" }}>Admin USDT Address (BEP20)</div>
                        <div style={{ wordBreak: "break-all", fontWeight: "700", paddingRight: "30px" }}>{ADMIN_WALLET_ADDRESS}</div>
                        <button onClick={copyAddress} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--accent-primary)" }}>
                            {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                        </button>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--accent-primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", flexShrink: 0 }}>2</div>
                        <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                            Once confirmed, click <b>&quot;I have sent&quot;</b>.
                        </div>
                    </div>
                </div>
            </div>

            {status === "pending" ? (
                <button className="btn btn-primary" onClick={handleSent} style={{ width: "100%", padding: "1rem", borderRadius: "1rem" }}>
                    I have sent {amount} USDT
                </button>
            ) : (
                <div style={{ textAlign: "center", padding: "1rem", background: "var(--success-dim)", color: "var(--success)", borderRadius: "1rem" }}>
                    <CheckCircle2 size={32} style={{ margin: "0 auto 8px" }} />
                    <div style={{ fontWeight: "700" }}>Payment Recorded</div>
                    <div style={{ fontSize: "12px" }}>Admin will verify and transfer INR.</div>
                </div>
            )}
        </div>
    );
}

export default function SellTimerPage() {
    return (
        <main className="animate-in">
            <header className="header-nav" style={{ borderBottom: "1px solid var(--border-color)" }}>
                <Link href="/app/sell" className="icon-btn">
                    <ArrowLeft size={20} />
                </Link>
                <div style={{ fontWeight: "700", fontSize: "16px" }}>Complete Payment</div>
                <div style={{ width: 20 }} />
            </header>

            <Suspense fallback={<div style={{ padding: "2rem", textAlign: "center" }}>Loading payment details...</div>}>
                <TimerContent />
            </Suspense>
        </main>
    );
}

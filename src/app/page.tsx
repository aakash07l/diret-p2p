"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    Wallet, ArrowDownLeft, ArrowUpRight, Headphones,
    PlayCircle, ShieldCheck, Zap, History, User,
    ShoppingCart, Store
} from "lucide-react";
import { AppNavbar } from "@/components/app/AppNavbar";

export default function Dashboard() {
    const [balance] = useState(0.00);
    const [rate, setRate] = useState(90.00);

    useEffect(() => {
        fetch("/api/rate").then(res => res.json()).then(data => setRate(data.rate));
    }, []);

    return (
        <main className="animate-in">
            <AppNavbar />

            <section className="balance-section">
                <div className="balance-label">Available Balance</div>
                <div className="balance-amount">${balance.toFixed(2)}</div>
                <div className="balance-inr">≈ ₹{(balance * rate).toFixed(2)}</div>
            </section>

            <section className="action-grid">
                <div className="icon-btn">
                    <div className="icon-circle"><Wallet size={20} /></div>
                    <span className="icon-label">Wallet</span>
                </div>
                <div className="icon-btn">
                    <div className="icon-circle"><ArrowUpRight size={20} /></div>
                    <span className="icon-label">Deposit</span>
                </div>
                <div className="icon-btn">
                    <div className="icon-circle"><ArrowDownLeft size={20} /></div>
                    <span className="icon-label">Withdraw</span>
                </div>
                <Link href="/app/settings" className="icon-btn">
                    <div className="icon-circle"><User size={20} /></div>
                    <span className="icon-label">Settings</span>
                </Link>
            </section>

            <section className="promo-carousel">
                <div className="promo-card" style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <Zap size={20} />
                        <span style={{ fontSize: "10px", fontWeight: "bold", background: "rgba(255,255,255,0.2)", padding: "2px 6px", borderRadius: "4px" }}>PROMO</span>
                    </div>
                    <div>
                        <div style={{ fontSize: "14px", fontWeight: "700" }}>Quick App Tour</div>
                        <div style={{ fontSize: "10px", opacity: 0.8 }}>Learn how to trade in 60 seconds</div>
                    </div>
                    <PlayCircle size={32} style={{ alignSelf: "center", opacity: 0.9 }} />
                </div>
            </section>

            <section className="limit-card">
                <div style={{ fontSize: "12px", fontWeight: "700", marginBottom: "4px" }}>Per Transaction Limits</div>
                <div style={{ fontSize: "10px", color: "var(--text-secondary)", marginBottom: "1rem" }}>
                    Maximum amount you can buy, sell, or pay in one order.
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ flex: 1, padding: "10px", background: "var(--bg-secondary)", borderRadius: "12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10px", color: "var(--text-tertiary)" }}>
                            <ShoppingCart size={12} /> Buy
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: "800", marginTop: "4px" }}>$0</div>
                    </div>
                    <div style={{ flex: 1, padding: "10px", background: "var(--bg-secondary)", borderRadius: "12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10px", color: "var(--text-tertiary)" }}>
                            <Store size={12} /> Sell/Pay
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: "800", marginTop: "4px" }}>$100</div>
                    </div>
                </div>

                <button className="btn btn-secondary" style={{ width: "100%", marginTop: "12px", fontSize: "12px", padding: "8px" }}>
                    Increase Transaction Limits
                </button>
            </section>

            <nav className="bottom-nav">
                <Link href="/app/buy" className="nav-item">
                    <div style={{ background: "var(--bg-tertiary)", padding: "10px 18px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "8px", color: "var(--text-primary)", fontWeight: "700" }}>
                        <ShoppingCart size={18} /> Buy
                    </div>
                </Link>

                <Link href="/app/orders" className="nav-item">
                    <div className="scan-pay-btn">
                        <History size={24} />
                    </div>
                    <span style={{ fontSize: "10px", fontWeight: "700", marginTop: "4px", color: "var(--text-secondary)" }}>History</span>
                </Link>

                <Link href="/app/sell" className="nav-item">
                    <div style={{ background: "var(--text-primary)", padding: "10px 18px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "8px", color: "white", fontWeight: "700" }}>
                        <Store size={18} /> Sell
                    </div>
                </Link>
            </nav>
        </main>
    );
}

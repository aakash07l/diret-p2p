"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Wallet, ArrowDownLeft, ArrowUpRight, Headphones,
    PlayCircle, ShieldCheck, Zap, History, User,
    ShoppingCart, Store
} from "lucide-react";
import { AppNavbar } from "@/components/app/AppNavbar";
import { ConnectButton, useActiveAccount, useWalletBalance } from "thirdweb/react";
import { client } from "@/lib/thirdweb";
import { SUPPORTED_CHAIN, USDT_CONTRACT_ADDRESS } from "@/lib/constants";

export default function Dashboard() {
    const account = useActiveAccount();
    const router = useRouter();
    const { data: balanceData, isLoading: isBalanceLoading } = useWalletBalance({
        client,
        chain: SUPPORTED_CHAIN,
        address: account?.address,
        tokenAddress: USDT_CONTRACT_ADDRESS,
    });
    const [rate, setRate] = useState(90.00);

    useEffect(() => {
        if (!account) {
            router.push("/login");
        }
    }, [account, router]);

    useEffect(() => {
        fetch("/api/rate").then(res => res.json()).then(data => setRate(data.rate));
    }, []);

    if (!account) return null;

    return (
        <main className="animate-in">
            <AppNavbar />

            <section className="balance-section">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <div>
                        <div className="balance-label">Available Balance</div>
                        <div className="balance-amount">
                            {isBalanceLoading ? "Loading..." : `$${parseFloat(balanceData?.displayValue || "0").toFixed(2)}`}
                        </div>
                        <div className="balance-inr">
                            ≈ ₹{(parseFloat(balanceData?.displayValue || "0") * rate).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                    </div>
                    <div style={{
                        background: "rgba(255,255,255,0.2)",
                        padding: "8px 12px",
                        borderRadius: "12px",
                        fontSize: "10px",
                        fontWeight: "700",
                        color: "white",
                        border: "1px solid rgba(255,255,255,0.3)"
                    }}>
                        {account.address.slice(0, 6)}...{account.address.slice(-4)}
                    </div>
                </div>
            </section>

            <section className="action-grid">
                <div className="icon-btn" style={{ position: "relative" }}>
                    <div className="icon-circle"><Wallet size={20} /></div>
                    <span className="icon-label">Wallet</span>
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0 }}>
                        <ConnectButton client={client} theme="light" />
                    </div>
                </div>
                <Link href="/app/deposit" className="icon-btn">
                    <div className="icon-circle"><ArrowUpRight size={20} /></div>
                    <span className="icon-label">Deposit</span>
                </Link>
                <Link href="/app/withdraw" className="icon-btn">
                    <div className="icon-circle"><ArrowDownLeft size={20} /></div>
                    <span className="icon-label">Withdraw</span>
                </Link>
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

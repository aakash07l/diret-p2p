"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, User } from "lucide-react";
import Link from "next/link";

export function AppNavbar() {
    const [rate, setRate] = useState<number | null>(null);

    useEffect(() => {
        fetch("/api/rate")
            .then(res => res.json())
            .then(data => setRate(data.rate))
            .catch(() => setRate(90.00));
    }, []);

    return (
        <header className="header-nav" style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 1.5rem",
            background: "white",
            borderBottom: "1px solid var(--border-color)"
        }}>
            <div className="logo" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                    width: 32,
                    height: 32,
                    background: "var(--accent-primary)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white"
                }}>
                    <TrendingUp size={20} />
                </div>
                <span style={{ fontWeight: "800", fontSize: "18px", letterSpacing: "-0.5px" }}>P2P.ME</span>
            </div>

            <div className="rate-badge" style={{
                background: "var(--accent-primary-dim)",
                padding: "6px 12px",
                borderRadius: "99px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                lineHeight: "1"
            }}>
                <span style={{ fontSize: "10px", opacity: 0.7, fontWeight: "600", color: "var(--accent-primary)", marginBottom: "2px" }}>SELL PRICE</span>
                <span style={{ fontWeight: "800", color: "var(--accent-primary)", fontSize: "14px" }}>₹{rate?.toFixed(2) || "90.00"}</span>
            </div>
        </header>
    );
}

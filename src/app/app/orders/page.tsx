"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function OrderHistory() {
    const [orders] = useState([
        { id: "ORD-001", amount: "100 USDT", inr: "₹9,000", status: "Completed", date: "Today" }
    ]);

    return (
        <main className="animate-in">
            <header className="header-nav" style={{ borderBottom: "1px solid var(--border-color)" }}>
                <Link href="/" className="icon-btn">
                    <ArrowLeft size={20} />
                </Link>
                <div style={{ fontWeight: "700" }}>History</div>
                <div style={{ width: 20 }} />
            </header>
            <div style={{ padding: "1.5rem" }}>
                {orders.map(o => (
                    <div key={o.id} className="card" style={{ marginBottom: 12, display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <div style={{ fontWeight: 700 }}>{o.amount}</div>
                            <div style={{ fontSize: 10, color: "var(--text-tertiary)" }}>{o.date}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontWeight: 800, color: "var(--accent-primary)" }}>{o.inr}</div>
                            <div style={{ fontSize: 10, color: "var(--success)" }}>{o.status}</div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

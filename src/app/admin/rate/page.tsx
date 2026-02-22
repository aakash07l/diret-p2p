"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, TrendingUp, Save, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AdminRatePage() {
    const [rate, setRate] = useState(90.00);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetch("/api/rate").then(res => res.json()).then(data => setRate(data.rate));
    }, []);

    const handleUpdate = async () => {
        await fetch("/api/rate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rate: parseFloat(rate.toString()) }),
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <main className="animate-in">
            <header className="header-nav" style={{ borderBottom: "1px solid var(--border-color)" }}>
                <Link href="/" className="icon-btn">
                    <ArrowLeft size={20} />
                </Link>
                <div style={{ fontWeight: "700" }}>Admin</div>
                <div style={{ width: 20 }} />
            </header>
            <div style={{ padding: "2rem 1.5rem", textAlign: "center" }}>
                <TrendingUp size={48} color="var(--accent-primary)" style={{ margin: "0 auto 1.5rem" }} />
                <h2>Update Rate</h2>
                <div className="card" style={{ marginTop: "1rem" }}>
                    <input type="number" step="0.1" value={rate} onChange={e => setRate(parseFloat(e.target.value))} style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid var(--border-color)", fontSize: 20, fontWeight: 700, textAlign: "center" }} />
                </div>
                <button className="btn btn-primary" onClick={handleUpdate} style={{ width: "100%", marginTop: "2rem" }}>
                    {saved ? <CheckCircle2 size={18} /> : <Save size={18} />} Save Rate
                </button>
            </div>
        </main>
    );
}

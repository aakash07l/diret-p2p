"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, CreditCard, Landmark, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
    const [upi, setUpi] = useState("");
    const [bankDetails, setBankDetails] = useState({ accountName: "", accountNo: "", ifsc: "" });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const savedUpi = localStorage.getItem("user_upi");
        if (savedUpi) setUpi(savedUpi);
        const savedBank = localStorage.getItem("user_bank");
        if (savedBank) setBankDetails(JSON.parse(savedBank));
    }, []);

    const handleSave = () => {
        localStorage.setItem("user_upi", upi);
        localStorage.setItem("user_bank", JSON.stringify(bankDetails));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <main className="animate-in">
            <header className="header-nav" style={{ borderBottom: "1px solid var(--border-color)" }}>
                <Link href="/" className="icon-btn">
                    <ArrowLeft size={20} />
                </Link>
                <div style={{ fontWeight: "700", fontSize: "16px" }}>Settings</div>
                <div style={{ width: 20 }} />
            </header>

            <div style={{ padding: "1.5rem" }}>
                <section style={{ marginBottom: "2rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
                        <CreditCard size={18} color="var(--accent-primary)" />
                        <h3 style={{ fontSize: "14px", fontWeight: "700" }}>UPI Details</h3>
                    </div>
                    <div className="card">
                        <label style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>UPI ID</label>
                        <input type="text" placeholder="username@upi" value={upi} onChange={(e) => setUpi(e.target.value)} style={{ width: "100%", padding: "10px", border: "1px solid var(--border-color)", borderRadius: 8 }} />
                    </div>
                </section>

                <section style={{ marginBottom: "2rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
                        <Landmark size={18} color="var(--accent-primary)" />
                        <h3 style={{ fontSize: "14px", fontWeight: "700" }}>Bank Transfer</h3>
                    </div>
                    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <input type="text" placeholder="Account Name" value={bankDetails.accountName} onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid var(--border-color)", borderRadius: 8 }} />
                        <input type="text" placeholder="Account Number" value={bankDetails.accountNo} onChange={(e) => setBankDetails({ ...bankDetails, accountNo: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid var(--border-color)", borderRadius: 8 }} />
                        <input type="text" placeholder="IFSC Code" value={bankDetails.ifsc} onChange={(e) => setBankDetails({ ...bankDetails, ifsc: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid var(--border-color)", borderRadius: 8 }} />
                    </div>
                </section>

                <button className="btn btn-primary" onClick={handleSave} style={{ width: "100%", padding: "1rem", borderRadius: "1rem" }}>
                    {saved ? <><CheckCircle2 size={18} /> Saved</> : "Save Details"}
                </button>
            </div>
        </main>
    );
}

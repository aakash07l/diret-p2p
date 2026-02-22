"use client";

import React from "react";
import { ArrowLeft, Clock, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function BuyComingSoon() {
    return (
        <main className="animate-in" style={{ justifyContent: "center", alignItems: "center" }}>
            <Link href="/" style={{ position: "absolute", top: "1rem", left: "1.5rem" }} className="icon-btn">
                <ArrowLeft size={20} />
            </Link>
            <div style={{ textAlign: "center" }}>
                <ShoppingCart size={48} color="var(--info)" />
                <h1 style={{ marginTop: "1rem" }}>Coming Soon</h1>
                <p style={{ color: "var(--text-secondary)", fontSize: "12px" }}>Buy USDT feature will be active soon.</p>
            </div>
        </main>
    );
}

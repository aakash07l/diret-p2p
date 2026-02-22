import { NextResponse } from "next/server";

// In a real app, use a database. For this demo, we use a simple mock store or localStorage if client-side.
// Since this is an API route (server-side), we'll use a globally shared variable (reset on rebuild).
let currentRate = 90.0;

export async function GET() {
    return NextResponse.json({ rate: currentRate });
}

export async function POST(request: Request) {
    try {
        const { rate } = await request.json();
        if (typeof rate !== "number" || rate <= 0) {
            return NextResponse.json({ error: "Invalid rate" }, { status: 400 });
        }
        currentRate = rate;
        return NextResponse.json({ success: true, rate: currentRate });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update rate" }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const searchParams = await req.formData();
    return NextResponse.json({ message: "hello", "data": `${searchParams.get("email")} password:${searchParams.get("password")}`, });
}

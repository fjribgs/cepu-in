import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession } from "../../../../../lib/auth";

export async function POST() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.delete("token");

    return NextResponse.json({ message: "Berhasil log out!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}


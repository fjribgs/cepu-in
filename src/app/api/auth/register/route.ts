import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";
import { hashPassword } from "../../../../../lib/auth";
import { getSession } from "../../../../../lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.role !== "Admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { username, nama, password } = await req.json();
    const existing = await db.user.findUnique({ where: { username } });
    if (existing) {
      return NextResponse.json(
        { error: "Username sudah ada, mohon gunakan username lain!" },
        { status: 400 },
      );
    }

    const hashedPassword = await hashPassword(password);

    await db.user.create({
      data: {
        username,
        nama,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Selesai, akun sudah dibuat!" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Gagal register" }, { status: 500 });
  }
}

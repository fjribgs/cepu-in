import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";
import { comparePassword, signToken } from "../../../../../lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const user = await db.user.findUnique({ where: { username } });
    if (!user) {
      return NextResponse.json(
        { error: "User tidak ditemukan!" },
        { status: 404 },
      );
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Password salah!" }, { status: 401 });
    }

    const token = await signToken({
      id: user.id,
      role: user.role,
      username: user.username,
    });

    const cookieStore = await cookies();
    cookieStore.set("token", token, { httpOnly: true });

    // console.log(token);
    return NextResponse.json({ message: "Login sukses!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal Login" }, { status: 500 });
  }
}

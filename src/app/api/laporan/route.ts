import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import cloudinary from "../../../../lib/cloudinary";
import { getSession } from "../../../../lib/auth";
import { Kategori } from "@prisma/client";

// GET | Get All Laporan
export async function GET() {
  try {
    const listLaporan = await db.laporan.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { nama: true, username: true },
        },
      },
    });
    return NextResponse.json({ success: true, data: listLaporan });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal melihat laporan" },
      { status: 500 },
    );
  }
}

// POST | Create Laporan
export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await request.formData();
    const judul = formData.get("judul") as string;
    const deskripsi = formData.get("deskripsi") as string;
    const kategori = formData.get("kategori") as string;
    const fotoBefore = formData.get("fotoBefore") as File;

    if (!judul || !deskripsi || !kategori || !fotoBefore) {
      return NextResponse.json(
        { error: "Semua field harus diisi" },
        { status: 400 },
      );
    }

    if (!Object.values(Kategori).includes(kategori as Kategori)) {
      return NextResponse.json(
        { error: "Kategori tidak valid" },
        { status: 400 },
      );
    }

    // Upload to Cloudinary
    if (!fotoBefore.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Hanya file gambar yang diizinkan" },
        { status: 400 },
      );
    }

    if (fotoBefore.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Ukuran file maksimal 5MB" },
        { status: 400 },
      );
    }

    const bytes = await fotoBefore.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${fotoBefore.type};base64,${buffer.toString("base64")}`;

    const uploadResult = await cloudinary.uploader.upload(base64, {
      folder: "home/foto-laporan",
      transformation: [
        { width: 1200, crop: "limit" },
        { quality: "auto" },
        { fetch_format: "auto" },
      ],
    });

    // Up to database
    const laporan = await db.laporan.create({
      data: {
        judul,
        deskripsi,
        kategori: kategori as Kategori,
        fotoBefore: uploadResult.secure_url,
        userId: session.id,
      },
    });

    return NextResponse.json({ success: true, data: laporan }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal membuat laporan" },
      { status: 500 },
    );
  }
}

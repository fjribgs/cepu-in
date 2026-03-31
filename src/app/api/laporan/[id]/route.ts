import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";
import cloudinary from "../../../../../lib/cloudinary";
import { getSession } from "../../../../../lib/auth";
import { Status } from "@prisma/client"; 
 
// GET | Get laporan by id
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const detailLaporan = await db.laporan.findUnique({
      where: { id: id },
      include: {
        user: {
          select: { nama: true, username: true },
        },
      },
    });

    if (!detailLaporan) {
      return NextResponse.json(
        { error: "Laporan tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: detailLaporan });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data laporan" },
      { status: 500 },
    );
  }
}

// PATCH | Update laporan
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const session = await getSession();

    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (session.role !== "Admin")
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const existing = await db.laporan.findUnique({
      where: { id: id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Laporan tidak ditemukan" },
        { status: 404 },
      );
    }

    const formData = await request.formData();
    const status = formData.get("status") as Status | null;
    const kredibel = formData.get("kredibel");
    const fotoAfterFile = formData.get("fotoAfter") as File | null;

    if (status && !Object.values(Status).includes(status)) {
      return NextResponse.json(
        { error: "Status tidak valid" },
        { status: 400 },
      );
    }

    // Upload cloudinary
    let fotoAfterUrl = existing.fotoAfter;
    if (fotoAfterFile instanceof File && fotoAfterFile.size > 0) {
      if (!fotoAfterFile.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Hanya file gambar yang diizinkan" },
          { status: 400 },
        );
      }

      if (fotoAfterFile.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Ukuran file maksimal 5MB" },
          { status: 400 },
        );
      }

      const bytes = await fotoAfterFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = `data:${fotoAfterFile.type};base64,${buffer.toString("base64")}`;

      const uploadResult = await cloudinary.uploader.upload(base64, {
        folder: "home/",
        transformation: [
          { width: 1200, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      });

      fotoAfterUrl = uploadResult.secure_url;
    }

    const kredibelBool =
      kredibel === "true"
        ? true
        : kredibel === "false"
          ? false
          : existing.kredibel;

    // Update Laporan
    const laporan = await db.laporan.update({
      where: { id: id },
      data: {
        status: status ?? existing.status,
        kredibel: kredibelBool,
        fotoAfter: fotoAfterUrl,
      },
    });

    // Plus point
    if (kredibelBool === true && !existing.kredibel) {
      await db.leaderboard.update({
        where: { userId: existing.userId },
        data: {
          totalPoin: { increment: 10 },
          laporanKredibel: { increment: 1 },
        },
      });
    }

    // Minus point
    if (status === Status.Ditolak && existing.status !== Status.Ditolak) {
      await db.leaderboard.update({
        where: { userId: existing.userId },
        data: {
          totalPoin: { decrement: 2 },
          laporanDitolak: { increment: 1 },
        },
      });
    }

    return NextResponse.json({ success: true, data: laporan });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal update laporan" },
      { status: 500 },
    );
  }
}

// DELETE | Delete laporan
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const session = await getSession();

    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (session.role !== "Admin")
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const existing = await db.laporan.findUnique({
      where: { id: id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Laporan tidak ditemukan" },
        { status: 404 },
      );
    }

    await db.laporan.delete({ where: { id: id } });

    return NextResponse.json({
      success: true,
      message: "Laporan berhasil dihapus",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menghapus laporan" },
      { status: 500 },
    );
  }
}

import { db } from "../../../../../lib/db";
import { notFound } from "next/navigation";
import AdminLaporanActions from "@/components/admin/AdminLaporanActions";
import Link from "next/link";
import Image from "next/image";

const statusColor: Record<string, string> = {
  Baru: "bg-blue-100 text-blue-600",
  Proses: "bg-yellow-100 text-yellow-600",
  Selesai: "bg-green-100 text-green-600",
  Ditolak: "bg-red-100 text-red-600",
};

export default async function AdminDetailLaporan({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const laporan = await db.laporan.findUnique({
    where: { id },
    include: {
      user: { select: { nama: true, username: true } },
    },
  });

  if (!laporan) return notFound();

  const tanggal = new Date(laporan.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col px-10 pt-10 pb-10 gap-8">
      {/* Header */}
      <Link
        href="/admin/laporan"
        className="flex items-center gap-2 text-sm w-fit hover:opacity-70 transition-all"
      >
        <Image src="/auth/back.svg" width={20} height={20} alt="back" />
        Kembali
      </Link>
      <div className="flex flex-col w-fit">
        <h1 className="font-nunito font-bold text-3xl">Detail Laporan</h1>
        <div className="h-[2px] bg-gray-300" />
      </div>

      {/* Content */}
      <div className="flex gap-10 max-lg:flex-col">
        {/* Kiri - Detail Laporan */}
        <div className="flex flex-col gap-4 w-full">
          {/* Foto */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-2 w-full">
              <span className="text-xs font-medium text-gray-400">Sebelum</span>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src={laporan.fotoBefore!}
                  alt="Foto sebelum"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-xs font-medium text-gray-400">Sesudah</span>
              {laporan.fotoAfter ? (
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src={laporan.fotoAfter}
                    alt="Foto sesudah"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full aspect-[4/3] rounded-2xl bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-400 text-xs font-medium text-center px-4">
                    Belum ada foto sesudah
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex gap-2 flex-wrap">
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor[laporan.status]}`}
            >
              {laporan.status}
            </span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">
              {laporan.kategori}
            </span>
            {laporan.kredibel && (
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-100 text-emerald-600">
                ✓ Kredibel
              </span>
            )}
          </div>

          <h1 className="font-nunito font-bold text-3xl">{laporan.judul}</h1>
          <p className="text-sm leading-relaxed text-gray-700">
            {laporan.deskripsi}
          </p>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-(--color-normal) flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {laporan.user.nama.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-sm">{laporan.user.nama}</span>
              <span className="text-xs text-gray-400">{tanggal}</span>
            </div>
          </div>
        </div>

        {/* Kanan - Form Admin */}
        <div className="w-full max-w-[350px] max-lg:max-w-full">
          <AdminLaporanActions
            id={laporan.id}
            currentStatus={laporan.status}
            currentKredibel={laporan.kredibel}
          />
        </div>
      </div>
    </div>
  );
}

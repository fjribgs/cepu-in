import { db } from "../../../../lib/db";
import Link from "next/link";

export default async function BerandaAdmin() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [laporanMasuk, laporanSelesai, laporanTerbaru] = await Promise.all([
    db.laporan.count({
      where: { createdAt: { gte: startOfMonth } },
    }),
    db.laporan.count({
      where: { status: "Selesai", updatedAt: { gte: startOfMonth } },
    }),
    db.laporan.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: {
        user: { select: { nama: true } },
      },
    }),
  ]);

  return (
    <div className="ml-55 flex flex-col px-10 pt-10 pb-10 gap-10">
      {/* Ringkasan */}
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="flex flex-col w-fit">
          <h2 className="font-nunito font-bold text-2xl">
            Ringkasan Bulan Ini
          </h2>
          <div className="h-[2px] bg-gray-300" />
        </div>

        <div className="flex gap-16 items-center justify-center">
          <div className="flex flex-col">
            <span className="font-nunito font-bold text-5xl">
              {laporanMasuk}
            </span>
            <span className="text-sm text-gray-500">Laporan Masuk</span>
          </div>
          <div className="flex flex-col">
            <span className="font-nunito font-bold text-5xl">
              {laporanSelesai}
            </span>
            <span className="text-sm text-gray-500">Laporan Selesai</span>
          </div>
        </div>
      </div>

      {/* Laporan Terbaru */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col w-fit">
            <h2 className="font-nunito font-bold text-2xl">Laporan Terbaru</h2>
            <div className="h-[2px] bg-gray-300" />
          </div>
        </div>

        <div className="grid grid-rows-2 grid-flow-col gap-3">
          {laporanTerbaru.map((item) => {
            const tanggal = new Date(item.createdAt).toLocaleDateString(
              "id-ID",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              },
            );

            return (
              <Link
                href={` /admin/laporan/${item.id}`}
                key={item.id}
                className="flex items-center gap-4 bg-white rounded-2xl p-3 hover:bg-gray-100 transition-all"
              >
                {/* Foto */}
                <div className="w-36 h-24 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0 relative">
                  {item.fotoBefore ? (
                    <img
                      src={item.fotoBefore}
                      alt={item.judul}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1 flex-1">
                  <span className="font-bold text-base">{item.judul}</span>
                  <span className="text-sm text-gray-400 line-clamp-1">
                    {item.deskripsi}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-7 h-7 rounded-full bg-(--color-normal) flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">
                        {item.user.nama.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {item.user.nama}
                      </span>
                      <span className="text-xs text-gray-400">{tanggal}</span>
                    </div>
                  </div>
                </div>

                {/* Hapus */}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

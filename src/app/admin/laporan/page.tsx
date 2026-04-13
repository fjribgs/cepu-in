import Image from "next/image"
import Link from "next/link";
import { db } from "../../../../lib/db";
import { Laporan, User } from "@prisma/client";
import DeleteButton from "@/components/admin/laporanDeleteButton";
import PaginationControls from "@/components/admin/AdminPagination";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

type LaporanWithUser = Laporan & {
  user: Pick<User, "nama" | "username">;
};

const PER_PAGE = 8;

export default async function LaporanAdmin({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam ?? 1);
  let listLaporan: LaporanWithUser[] = [];
  let totalCount = 0;

  try {
    [listLaporan, totalCount] = await Promise.all([
      db.laporan.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { nama: true, username: true } },
        },
        skip: (page - 1) * PER_PAGE,
        take: PER_PAGE,
      }),
      db.laporan.count(),
    ]);
  } catch (error) {
    console.error(error);
  }

  const totalPages = Math.ceil(totalCount / PER_PAGE);

  return (
    <div className="flex flex-col min-h-screen">

      {/* Scrollable content */}
      <div className="flex flex-col gap-9 pt-9 pl-6 pr-6 pb-24 flex-1">
        {/* Heading */}
        <div className="w-fit flex flex-col gap-1">
          <h1 className="font-nunito font-bold text-(--color-normal) text-3xl">
            Daftar Laporan
          </h1>
          <div className="w-full bg-black/20 h-0.5" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 w-full">
          {listLaporan.length === 0 ? (
            <p className="text-sm text-gray-400">Belum ada laporan.</p>
          ) : (
            listLaporan.map((laporan) => (
              <div
                key={laporan.id}
                className="group relative flex flex-col rounded-xl border border-gray-200 shadow-sm bg-white hover:bg-gray-50 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* Image */}
                <div className="relative w-full h-40 shrink-0">
                  <Image
                    src={laporan.fotoBefore ?? "/images/placeholder.jpg"}
                    alt={laporan.judul}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-3 flex-1 min-w-0">
                  {/* Title + Delete */}
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/admin/laporan/${laporan.id}`} className="min-w-0 flex-1">
                      <h2 className="text-sm font-bold text-gray-900 leading-tight group-hover:text-(--color-normal) transition-colors">
                        {laporan.judul}
                      </h2>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {laporan.deskripsi}
                      </p>
                    </Link>
                    <DeleteButton id={laporan.id} />
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-8 h-8 rounded-full bg-(--color-normal) flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {laporan.user.nama
                        .split(" ")
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-900 truncate">
                        {laporan.user.nama}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(laporan.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination — fixed at bottom */}
      {totalPages > 1 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-3 z-40">
          <PaginationControls page={page} totalPages={totalPages} />
        </div>
      )}

    </div>
  );
}
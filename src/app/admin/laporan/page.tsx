import Image from "next/image"
import { db } from "../../../../lib/db";
import { Laporan, User } from "@prisma/client";
import DeleteButton from "@/components/admin/laporanDeleteButton";

    export const dynamic = "force-dynamic";
    export const revalidate = 0;
    export const fetchCache = "force-no-store";

    type LaporanWithUser = Laporan & {
    user: Pick<User, "nama" | "username">;
 };
    
export default async function LaporanAdmin() {
    let listLaporan: LaporanWithUser[] = [];
    
     try {
        listLaporan = await db.laporan.findMany({
          orderBy: { createdAt: "desc" },
          include: {
            user: {
              select: { nama: true, username: true },
            },
          },
        });
      } catch (error) {
        console.error(error);
      }

   return (
    <div className="flex flex-col flex-wrap gap-9 pt-9 pl-6">
        {/*Heading*/}
        <div className="w-fit flex flex-col gap-1">
                <h1 className="font-nunito font-bold text-(--color-normal) text-3xl">Daftar Laporan</h1>
            <div className="w-full bg-black/20 h-0.5">
            </div>
          </div>
          {/*Cards*/}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 w-full">
        {listLaporan.length === 0 ? (
          <p className="text-sm text-gray-400">Belum ada laporan.</p>
        ) : (
          listLaporan.map((laporan) => (
            <div
              key={laporan.id}
              className="flex rounded-xl border border-gray-200 shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
            >
              {/* Left: Image */}
              <div className="relative w-36 shrink-0">
                <Image
                  src={laporan.fotoBefore ?? "/images/placeholder.jpg"}
                  alt={laporan.judul}
                  fill
                  className="object-cover rounded-l-xl"
                  sizes="144px"
                />
              </div>

              {/* Right: Content */}
              <div className="flex flex-col justify-between p-3 flex-1 min-w-0">
                {/* Title + Delete */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h2 className="text-sm font-bold text-gray-900 leading-tight">
                      {laporan.judul}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {laporan.deskripsi}
                    </p>
                  </div>
                        <DeleteButton id={laporan.id}/>
                </div>

                {/* Author */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
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
   );
}

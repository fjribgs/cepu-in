import Button from "@/components/Button";
import LaporanCards from "@/components/laporan/Cards";
import { laporanData } from "@/lib/dummy/laporan";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function Laporan() {
  let listLaporan = laporanData;

  // try {
  //   const response = await fetch('http://localhost:3000/api/laporan', {
  //     cache: 'no-store'
  //   });

  //   const result = await response.json();

  //   listLaporan = result.data || [];
  // } catch (error) {
  //   console.error("Gagal fetch: ", error);
  // }

  return (
    <div className="flex h-auto py-30 items-center mx-20 max-sm:mx-10">
      <div className="flex flex-col w-full gap-8">
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2">
            <h2 className="font-nunito font-bold text-4xl text-(--color-normal-hover)">Laporan</h2>
            <p className="font-light text-sm">List laporan yang sudah diajukan</p>
          </div>

          <div className="flex items-end">
            <Button label="Tambah Laporan" icon="tambah-white.svg" showIcon href="" primary/>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {listLaporan.length > 0 ? (
            listLaporan.map((item) => (
              <LaporanCards
                key={item.id}
                title={item.judul}
                srcImg={item.fotoBefore}
                user={item.user.nama}
                description={item.deskripsi}
                href={`laporan/${item.id}`}
              />
            ))
          ) : (
            <p>Belum ada laporan</p>
          )}
        </div>
      </div>
    </div>
  );
}

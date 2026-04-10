import Button from "@/components/Button";
import LaporanCards from "@/components/laporan/Cards";
import { laporanData } from "@/lib/dummy/laporan";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function Leaderboard() {
  return (
    <div className="flex h-auto min-h-screen py-30 items-center mx-20 max-sm:mx-10 2xl:mt-10">
      <div className="flex flex-col w-full gap-8">
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2">
            <h2 className="font-nunito font-bold text-4xl 2xl:text-6xl text-(--color-normal-hover)">Papan Peringkat</h2>
            <p className="font-light text-sm 2xl:text-lg"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

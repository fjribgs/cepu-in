import { db } from "../../../../lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

type LeaderboardEntry = {
  totalPoin: number;
  user: {
    nama: string;
    username: string;
  };
};

export default async function Leaderboard() {
  let leaderboard: LeaderboardEntry[] = [];

  try {
    leaderboard = await db.Leaderboard.findMany({
      orderBy: { totalPoin: "desc" },
      include: {
        user: {
          select: { nama: true, username: true },
        },
      },
    });
  } catch (error) {
    console.error("Gagal mengambil data leaderboard:", error);
  }

  return (
    <div className="flex h-auto py-30 items-center mx-20 max-sm:mx-10 2xl:mt-10">
      <div className="flex flex-col w-full gap-8">

        {/* Title */}
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2">
            <h2 className="font-nunito font-bold text-4xl 2xl:text-6xl text-(--color-normal-hover)">
              Papan Peringkat
            </h2>
            <p className="font-light text-sm 2xl:text-lg"></p>
          </div>
        </div>

        {/* Header Row */}
        <div className="flex items-center px-3 pb-2 border-b border-gray-200 text-xs font-medium text-gray-400">
          <span className="w-10">Pos</span>
          <span className="flex-1">Nama</span>
          <span className="w-14 text-right">Points</span>
        </div>

        {/* List */}
        <ul className="flex flex-col gap-3">
          {leaderboard.map((item, index) => (
            <li
              key={item.user.username}
              className={`flex items-center px-3 py-2 rounded-[13px] hover:bg-gray-100 ${
                index === 0 ? "bg-green-200" : "bg-green-100"
              }`}
            >
              <span className="w-10">{index + 1}</span>
              <span className="flex-1">{item.user.nama}</span>
              <span className="w-14 text-right">{item.totalPoin}</span>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}
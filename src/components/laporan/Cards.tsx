import Image from "next/image"
import Link from "next/link";

interface LaporanCardsData {
    srcImg: string;
    title: string;
    description: string;
    user: string;
    href: string;
}

export default function LaporanCards( data:LaporanCardsData ) {
    return (
        <Link id="laporan-card" href={data.href}
            className="relative flex flex-col gap-3 pb-5 w-full items-center rounded-2xl group transition-all duration-200 ease-in">
              <div className="absolute inset-0 group-hover:bg-black/5 pointer-events-none rounded-2xl transition-all duration-200 ease-in" ></div>

              <Image src={data.srcImg} alt="Foto Laporan" width={300} height={300} className="rounded-xl w-full h-auto"/>

              <div className="flex flex-col gap-5 w-full group-hover:px-3.5 transition-all duration-200 ease-in">
                 <div className="flex flex-col">
                  <h3 className="font-nunito font-bold text-lg 2xl:text-2xl">{data.title}</h3>
                  <p className="text-[13px] 2xl:text-[16px] font-light text-black/60">{data.description}</p>
                </div>

                <div className="flex text-start gap-2">
                  <p className="font-light text-black/60 text-[13px] 2xl:text-[16px]">{data.user}</p>
                </div>
              </div>
        </Link>
    )
}
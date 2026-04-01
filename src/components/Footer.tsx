import Image from "next/image"
import Link from "next/link"

const menuItems = [
    { id: 1, label: "Beranda", href: "/" },
    { id: 2, label: "Laporan", href: "/laporan" },
    { id: 3, label: "Papan Peringkat", href: "/leaderboard" }
]

export default function Footer() {
    return (
        <footer className="flex max-sm:flex-col h-[40vh] w-full justify-between max-sm:justify-start max-sm:gap-8 bg-(--color-light) px-20 max-sm:px-10 py-3 pt-8">
            <div className="flex flex-col justify-between ">
                <div>
                    <Image src={`/logo.svg`} height={250} width={250} alt="Logo"/>
                    <p className="font-light ml-2.5">Lorem Ipsum...</p>
                </div>

                <div className="max-sm:hidden block">
                    <p className="font-light text-[12px]">&copy; 2024 CepuIn. Semua Hak Dilindungi.</p>
                </div>
            </div>

            <div className="flex flex-col text-end max-sm:text-start gap-3">
                <div className="font-bold font-nunito text-xl 2xl:text-3xl">Navigasi</div>
                <div>
                    <ul className="font-nunito flex flex-col gap-1.5 items-end max-sm:items-start 2xl:text-xl">
                        {menuItems.map((item) => (
                            <li key={item.id} className="w-fit group">
                                <Link href={item.href}>{item.label}</Link>
                                <div className="h-0.5 bg-(--color-normal) w-0 group-hover:w-full transition-all duration-150 ease-in"></div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="max-sm:block hidden">
                    <p className="font-light text-[12px]">&copy; 2024 CepuIn. Semua Hak Dilindungi.</p>
                </div>
            </div>
        </footer>
    )
}
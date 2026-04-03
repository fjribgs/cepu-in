'use client';

import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use, useState } from "react";
import path from "path";

const menuItems = [
    { id: 1, label: "Beranda", href: "/" },
    { id: 2, label: "Laporan", href: "/laporan" },
    { id: 3, label: "Papan Peringkat", href: "/leaderboard" }
]

export default function Navbar() {
    const pathname = usePathname();
    const [isSidebarOpened, setSidebarOpened] = useState(false);

    function handleSidebar() {
        setSidebarOpened(!isSidebarOpened);
    }

    return (
        <div>
            <nav className="flex fixed font-nunito bg-white border border-(--color-darker) rounded-[13px] px-5 py-3 justify-between items-center left-12 right-12 max-sm:left-4 max-sm:right-4 mt-5 z-100">
                <Image src="/logo.svg" width={120} height={40} alt="Logo CepuIn" className="h-auto 2xl:w-40"/>

                <div className="flex justify-between">
                    <ul className="flex items-center gap-5 text-[13px] 2xl:text-[16px]
                    [&>li]:hover:font-bold 
                    [&>li]:hover:transition-all 
                    [&>li]:hover:duration-200 
                    [&>li]:hover:ease-in
                    [&>li]:hover:cursor-pointer
                    max-sm:hidden">
                        {menuItems.map((item) => (
                            <li key={item.id} className={`group ${item.href == pathname ? "font-bold" : "font-medium"} 2xl:text-[18px]`}>
                                <Link href={item.href}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        <div className="2xl:my-1.5">
                            <Button href="/login" label="Masuk" primary/>
                        </div>
                    </ul>
                </div>
                
                <button onClick={handleSidebar} className="max-sm:block hidden">
                    <Image src="/sidebar.svg" alt="" width={20} height={2}/>
                </button>
            </nav>

            <aside className={`border bg-white flex-col gap-5 fixed right-4 rounded-lg top-25 px-3 py-3 hidden max-sm:flex transition-all duration-200 ease-in ${isSidebarOpened ? 'translate-x-0' : 'translate-x-full'}`}>
                <ul className="flex flex-col gap-2">
                    {menuItems.map((item) => (
                        <li key={item.id} className={`group ${item.href == pathname ? "bg-(--color-light)" : "bg-transparent"} rounded-md px-4 py-2`}>
                            <Link href={item.href}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="h-0.5 mx-3 bg-black/30"></div>
                <div className="mb-1 mx-2">
                    <Button href="/login" label="Masuk" primary/>
                </div>
            </aside>
        </div>
    )
}
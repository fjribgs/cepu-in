'use client'

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import path from "path"


const SidebarLinks = [
    { id: 1, label: "Beranda", icon: "/admin/beranda.svg", href: "/admin/beranda"},
    { id: 2, label: "Laporan", icon: "/admin/laporan.svg", href: "/admin/laporan"},
    { id: 3, label: "Akun", icon: "/admin/akun.svg", href: "/admin/akun"}
]

export default function DashboardSidebar() {
    const pathName = usePathname()

    return (
        <aside className="fixed flex flex-col w-auto min-w-55 h-screen bg-(--color-light) justify-between items-center py-6">
            <div className="flex flex-col gap-2.5 w-full px-6">
                <div className="flex w-full justify-center">
                    <Image src="/logo.svg" width={150} height={150} alt="Logo" className="h-auto"/>
                </div>
                
                <div id="separator" className="h-0.5 w-full bg-black/20"></div>

                {SidebarLinks.map((item) => (
                    <Link href={item.href} key={item.id} className={`flex h-full items-center gap-3 font-nunito font-semibold text-sm text-(--color-normal) hover:bg-(--color-light-hover) hover:px-3 py-1.5 rounded-md transition-all duration-200 ease-in cursor-pointer ${item.href == pathName ? 'bg-(--color-light-hover) px-3' : 'bg-transparent'}`}>
                        <Image src={item.icon} width={17} height={17} alt="Icon" className="h-auto"/>
                        {item.label}
                    </Link>
                ))}
            </div>
            
            <div id="logout" className="flex flex-col gap-2.5 w-full px-6">
                <div className="flex h-full items-center gap-2 font-nunito font-semibold text-(--color-normal) hover:bg-(--color-light-hover) hover:px-2 py-1.5 rounded-md transition-all duration-200 ease-in cursor-pointer">
                    <Image src={`/admin/logout.svg`} width={18} height={18} alt="Icon" className="h-auto"/>
                    Logout
                </div>
            </div>
        </aside>
    )
}
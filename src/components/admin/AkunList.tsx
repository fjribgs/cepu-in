'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";

type AkunEntry = {
    id: string;
    nama: string;
}

export default function AkunList({ listAkun }: { listAkun: AkunEntry[] }) {
    const [isDeleteOpened, setIsDeleteOpened] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <div className="flex flex-col w-full gap-8">
            <div className="flex justify-between items-end w-full">
                <div className="w-fit flex flex-col gap-1">
                    <h1 className="font-nunito font-bold text-(--color-normal) text-3xl">Kelola Akun</h1>
                    <div className="w-full bg-black/20 h-0.5"></div>
                </div>
                <Link href={`/admin/akun/buat-akun`}>
                    <Button showLabel label="Buat Akun" showIcon icon="admin/add.svg"/>
                </Link>
            </div>

            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-x-10 gap-y-6 w-full">
                {listAkun.map((item) => (
                    <div className="flex items-center justify-between w-full" key={item.id}>
                        <div className="flex items-center gap-2.5">
                            <div className="bg-(--color-normal) size-14 rounded-[999px] items-center justify-center text-center">
                                <div className="font-bold font-nunito text-2xl translate-y-1/3 text-white">
                                    {item.nama ? item.nama[0].toUpperCase() : "?"}
                                </div>
                            </div>
                            <span className="text-lg font-nunito font-medium">{item.nama}</span>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => { setSelectedId(item.id); setIsDeleteOpened(true); }}
                                className="bg-(--color-normal) hover:bg-(--color-normal-hover) rounded-sm p-2 transition-all cursor-pointer duration-200"
                            >
                                <Image src="/admin/delete.svg" width={12} height={12} alt="Hapus"/>
                            </button>

                            <Link href="" className="bg-(--color-normal) hover:bg-(--color-normal-hover) rounded-sm p-2 transition-all duration-200">
                                <Image src="/admin/edit.svg" width={12} height={12} alt="Edit"/>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {isDeleteOpened && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-all duration-200">
                    <div className="bg-white rounded-lg p-6 flex flex-col gap-4 w-80">
                        <h2 className="font-nunito font-bold text-xl text-(--color-normal)">Hapus Akun?</h2>
                        <p className="font-nunito text-sm text-black/60">Akun ini akan dihapus permanen dan tidak bisa dikembalikan.</p>
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={() => setIsDeleteOpened(false)}
                                className="px-4 cursor-pointer py-2 rounded-sm font-nunito text-sm border border-black/20 hover:bg-black/5 transition-all"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => { /* logic hapus */ setIsDeleteOpened(false); }}
                                className="px-4 py-2 rounded-sm cursor-pointer font-nunito text-sm bg-red-500 hover:bg-red-600 text-white transition-all"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
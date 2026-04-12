import Image from "next/image"

const ListForm = [
    {id: 1, type: "text", placeholder: "Nama Lengkap", name: "nama-lengkap"},
    {id: 2, type: "text", placeholder: "Username", name: "username"},
    {id: 3, type: "password", placeholder: "Password", name: "password"},
]

export default function BuatAkun() {
    return (
        <div className="flex flex-col w-full gap-8">
            <div className="flex justify-between items-end w-full">
                <div className="w-fit flex flex-col gap-1">
                    <h1 className="font-nunito font-bold text-(--color-normal) text-3xl">Buat Akun</h1>
                    <div className="w-full bg-black/20 h-0.5"></div>
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <form action="" className="flex flex-col gap-2">
                    {ListForm.map((item) => (
                        <input key={item.id} type={item.type} name={item.name} placeholder={item.placeholder} className="bg-(--color-light) rounded-md px-4 py-2.5 text-[14px]"/>
                    ))}
                </form>

                <button className="flex bg-(--color-normal) items-center justify-center p-2.5 rounded-md text-white gap-2 text-[14px]">
                    <Image src={`/tambah-white.svg`} width={18} height={18} alt=""/>
                    Tambah Akun
                </button>
            </div>
        </div>
    )
}
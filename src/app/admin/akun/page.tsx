import { db } from "../../../../lib/db";
import AkunList from "@/components/admin/AkunList";

type AkunEntry = {
    id: string;
    nama: string;
}

export default async function Akun() {
    let listAkun: AkunEntry[] = [];
    
    try {
        listAkun = await db.user.findMany({
            orderBy: { nama: "desc" },
        }) as AkunEntry[];
    } catch (error) {
        console.error("Akun tidak ditemukan")
    }
    
    return <AkunList listAkun={listAkun} />;
}
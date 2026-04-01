import Image from "next/image";
import Button from "@/components/Button";

const caraKerjaItems = [
    { id: 1, label: "Tambahkan", desc: "Klik tombol tambahkan laporan di halaman Laporan", icon: "/tambah.svg"},
    { id: 2, label: "Buat Laporan", desc: "Isi laporan yang akan diajukan secara detail", icon: "/buat-laporan.svg"},
    { id: 3, label: "Ajukan", desc: "Kirim laporan yang sudah dibuat dengan tombol Ajukan", icon: "ajukan.svg"}
]

export default function Home() {
  return (
    <div>

      <div className="flex h-screen mx-20 max-sm:mx-10">
        <div className="flex max-sm:flex-col w-full max-sm:justify-center justify-between items-center gap-15 max-sm:mt-10">

          <div className="flex flex-col gap-6 2xl:gap-9">
            <h1 className="font-nunito leading-15 2xl:leading-22 text-(--color-normal-hover) text-6xl max-sm:text-5xl 2xl:text-[85px]">Ada Masalah?<br /><b>CepuIn</b> Aja</h1>
            <p className="text-[15px] max-sm:text-[12px] 2xl:text-xl font-light max-w-120 2xl:max-w-160">Bantu RT/RW menjaga kenyamanan lingkungan. Lapor jalan rusak, lampu mati, atau fasilitas umum yang butuh perbaikan disini.</p>

            <div className="flex gap-2 2xl:gap-3">
              <Button href="" label="Buat Laporan" primary icon="edit.svg" showIcon/>
              <Button href="#cara-kerja" label="Lihat Lebih Lanjut"/>
            </div>
          </div>

          <div>
            <Image src={`/hero-img.svg`} width={420} height={420} alt="" className="max-sm:max-w-80 2xl:w-140"/>
          </div>
        </div>

      </div>

      <div className="flex flex-col items-center justify-center h-screen max-sm:h-[120vh] gap-18 max-sm:gap-10 text-center">
        <div id="cara-kerja"  className="flex flex-col items-center gap-1">
          <h2 className="text-4xl 2xl:text-7xl font-nunito font-bold text-(--color-normal-hover)">Cara Kerja</h2>
          <p className="font-light text-md max-sm:text-[12.5px] 2xl:text-xl">Bantu RT/RW menjaga kenyamanan lingkungan. Hanya dengan 3 langkah!</p>
        </div>

        <div className="flex">
          <ul className="flex max-sm:flex-col gap-12 2xl:gap-30 text-(--color-normal-hover)">
            {caraKerjaItems.map((item) => (
              <li key={item.id}>
                  <div className="flex flex-col items-center max-w-60 text-center gap-2 2xl:gap-5">
                    <Image src={item.icon} alt="Tambahkan" width={120} height={120} className="bg-(--color-light) p-3 rounded-4xl mb-2 2xl:w-35"/>

                    <h3 className="text-2xl 2xl:text-4xl font-nunito font-bold">{item.label}</h3>

                    <p className="font-light text-[13px] 2xl:text-[17px]">{item.desc}
                    </p>
                  </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

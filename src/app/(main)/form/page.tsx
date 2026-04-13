"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Listrik", "Bangunan", "Kebersihan", "Keamanan"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // Disesuaikan dengan API (5MB)

export default function AjukanLaporan() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // State untuk mengontrol kemunculan popup sukses
  const [showSuccess, setShowSuccess] = useState(false);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      setError("Ukuran file maksimal 5 MB.");
      return;
    }
    setError("");
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      setError("Ukuran file maksimal 5 MB.");
      return;
    }
    setError("");
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit() {
    if (!judul || !kategori || !deskripsi || !image) {
      setError("Semua field harus diisi.");
      return;
    }
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("kategori", kategori);
    formData.append("deskripsi", deskripsi);
    // Field diubah menjadi fotoBefore menyesuaikan backend API
    formData.append("fotoBefore", image); 

    try {
      const response = await fetch("/api/laporan", { 
        method: "POST", 
        body: formData 
      });
      
      const result = await response.json();

      if (!response.ok) {
        // Melempar error spesifik dari backend (contoh: Kategori tidak valid)
        throw new Error(result.error || "Gagal mengajukan laporan.");
      }

      // Jika sukses, tampilkan popup
      setShowSuccess(true);
      
      // Tunggu 2 detik agar user bisa melihat popup, lalu redirect
      setTimeout(() => {
        router.push("/laporan");
      }, 2000);

    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan sistem. Coba lagi.");
      setLoading(false); // Matikan loading hanya jika error. Jika sukses, biarkan loading untuk transisi
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative py-35">
      
      {/* --- POPUP SUKSES --- */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 flex flex-col items-center text-center shadow-2xl animate-[pulse_0.3s_ease-in-out]">
            <div className="w-16 h-16 bg-[#EEF2F0] rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#2D5A46]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1a2922] mb-2 font-nunito">Laporan Berhasil!</h3>
            <p className="text-gray-500 text-sm">Terima kasih atas laporannya. Mengalihkan ke halaman daftar laporan...</p>
          </div>
        </div>
      )}
      {/* -------------------- */}

      {/* Content */}
      <div className="max-w-[950px] mx-auto px-6 py-10">
        {/* Back */}
        <Link 
          href="/laporan" 
          className="inline-flex items-center gap-2 text-sm text-gray-700 font-medium hover:text-[#2D5A46] transition-colors mb-8"
        >
          ← Kembali
        </Link>

        <h1 className="font-nunito font-bold text-[36px] text-[#1a2922] mb-8">
          Ajukan Laporan
        </h1>

        {error && (
          <p className="text-sm text-red-500 mb-6 bg-red-50 px-4 py-3 rounded-xl border border-red-100">
            {error}
          </p>
        )}

        <div className="flex flex-col md:flex-row gap-6 items-stretch min-h-[340px]">
          {/* Left: inputs */}
          <div className="flex flex-col gap-4 flex-[1.2]">
            {/* Judul + Kategori row */}
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Judul Laporan"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                disabled={loading}
                className="flex-[1.5] bg-[#EEF2F0] rounded-[14px] px-5 py-4 text-[15px] text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#2D5A46]/30 transition disabled:opacity-60"
              />
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                disabled={loading}
                className={`flex-1 bg-[#EEF2F0] rounded-[14px] px-5 py-4 text-[15px] outline-none focus:ring-2 focus:ring-[#2D5A46]/30 transition appearance-none cursor-pointer disabled:opacity-60 ${
                  kategori === "" ? "text-gray-400" : "text-gray-800"
                }`}
                style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='%232D5A46'%3E%3Cpath d='M5 8l7 8 7-8z'/%3E%3C/svg%3E")`, 
                  backgroundRepeat: "no-repeat", 
                  backgroundPosition: "right 20px center" 
                }}
              >
                <option value="" disabled>Kategori</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Deskripsi */}
            <textarea
              placeholder="Deskripsi Laporan"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              disabled={loading}
              className="bg-[#EEF2F0] rounded-[14px] px-5 py-4 text-[15px] text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#2D5A46]/30 transition resize-none flex-1 disabled:opacity-60"
            />
          </div>

          {/* Right: image upload */}
          <div
            onClick={() => !loading && fileInputRef.current?.click()}
            onDrop={loading ? undefined : handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className={`flex-1 border-[3px] border-dashed border-[#2D5A46] rounded-[14px] bg-[#EEF2F0] flex flex-col items-center justify-center gap-2 transition-colors overflow-hidden p-6 ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-[#e4ebe9]'}`}
          >
            {preview ? (
              <div className="relative w-full h-full min-h-[250px] rounded-xl overflow-hidden">
                <Image src={preview} alt="Preview" fill className="object-cover" />
              </div>
            ) : (
              <>
                <svg width="84" height="84" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.5 4C8.13623 4 7.80164 4.20815 7.63167 4.5481L6.40002 7H4C2.34315 7 1 8.34315 1 10V18C1 19.6569 2.34315 21 4 21H20C21.6569 21 23 19.6569 23 18V10C23 8.34315 21.6569 7 20 7H17.6L16.3683 4.5481C16.1984 4.20815 15.8638 4 15.5 4H8.5ZM18.5 10C18.5 10.5523 18.0523 11 17.5 11C16.9477 11 16.5 10.5523 16.5 10C16.5 9.44772 16.9477 9 17.5 9C18.0523 9 18.5 9.44772 18.5 10ZM12 17.5C9.51472 17.5 7.5 15.4853 7.5 13C7.5 10.5147 9.51472 8.5 12 8.5C14.4853 8.5 16.5 10.5147 16.5 13C16.5 15.4853 14.4853 17.5 12 17.5ZM12 15.5C13.3807 15.5 14.5 14.3807 14.5 13C14.5 11.6193 13.3807 10.5 12 10.5C10.6193 10.5 9.5 11.6193 9.5 13C9.5 14.3807 10.6193 15.5 12 15.5Z" fill="#2D5A46"/>
                </svg>
                <p className="text-[#2a3630] font-medium text-[16px]">Upload gambar disini</p>
                <p className="text-gray-400 text-[13px]">Max File Size: 5 MB</p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={loading}
              className="hidden"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-8 w-full bg-[#2D5A46] hover:bg-[#234736] text-white font-nunito font-semibold text-[17px] py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
        >
          {loading && !showSuccess ? (
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            "→"
          )}
          {loading && !showSuccess ? "Memproses..." : showSuccess ? "Berhasil!" : "Ajukan"}
        </button>
      </div>
    </div>
  );
}
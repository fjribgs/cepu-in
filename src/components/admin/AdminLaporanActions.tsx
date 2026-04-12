"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Status } from "@prisma/client";

interface Props {
  id: string;
  currentStatus: Status;
  currentKredibel: boolean;
}

export default function AdminLaporanActions({
  id,
  currentStatus,
  currentKredibel,
}: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>(currentStatus);
  const [kredibel, setKredibel] = useState(currentKredibel);
  const [fotoAfter, setFotoAfter] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSave() {
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("status", status);
    formData.append("kredibel", String(kredibel));
    if (fotoAfter) formData.append("fotoAfter", fotoAfter);

    try {
      const res = await fetch(`/api/laporan/${id}`, {
        method: "PATCH",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal update laporan");
        return;
      }

      setSuccess("Laporan berhasil diupdate!");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan, coba lagi");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Yakin mau hapus laporan ini?")) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/laporan/${id}`, { method: "DELETE" });
      if (!res.ok) {
        setError("Gagal hapus laporan");
        return;
      }
      router.push("/admin/laporan");
    } catch {
      setError("Terjadi kesalahan, coba lagi");
    } finally {
      setLoading(false);
    }
  }

  const statusList: Status[] = ["Baru", "Proses", "Selesai", "Ditolak"];

  return (
    <div className="flex flex-col gap-5 bg-white rounded-2xl p-6">
      <h2 className="font-nunito font-bold text-xl">Aksi Admin</h2>

      {/* Status */}
      <div className="flex flex-col gap-2">
        <label htmlFor="status" className="text-sm font-medium">
          Status
        </label>
        <div className="flex flex-col gap-2">
          {statusList.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              type="button"
              className={`py-2 px-4 rounded-xl text-sm font-medium border transition-all ${
                status === s
                  ? "bg-(--color-normal) text-white border-(--color-normal)"
                  : "bg-gray-100 text-gray-600 border-gray-100 hover:bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Kredibel */}
      <div className="flex items-center justify-between">
        <label htmlFor="kredibel" className="text-sm font-medium">
          Kredibel
        </label>
        <button
          id="kredibel"
          onClick={() => setKredibel(!kredibel)}
          className={`w-12 h-6 rounded-full transition-all ${kredibel ? "bg-(--color-normal)" : "bg-gray-300"} relative`}
          type="button"
        >
          <span
            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${kredibel ? "left-7" : "left-1"}`}
          />
        </button>
      </div>

      {/* Foto After */}
      <div className="flex flex-col gap-2">
        <label htmlFor="fotoAfter" className="text-sm font-medium">
          Foto Sesudah
        </label>
        <input
          id="fotoAfter"
          type="file"
          accept="image/*"
          onChange={(e) => setFotoAfter(e.target.files?.[0] || null)}
          className="text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-(--color-normal) file:text-white"
        />
        {fotoAfter && (
          <img
            src={URL.createObjectURL(fotoAfter)}
            alt="Preview"
            className="w-full aspect-[4/3] object-cover rounded-xl"
          />
        )}
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}
      {success && <p className="text-emerald-500 text-xs">{success}</p>}

      {/* Buttons */}
      <button
        onClick={handleSave}
        disabled={loading}
        type="button"
        className="w-full py-2.5 rounded-xl bg-(--color-normal) hover:bg-(--color-normal-hover) text-white font-medium text-sm transition-all"
      >
        {loading ? "Menyimpan..." : "Simpan Perubahan"}
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        type="button"
        className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm transition-all"
      >
        Hapus Laporan
      </button>
    </div>
  );
}

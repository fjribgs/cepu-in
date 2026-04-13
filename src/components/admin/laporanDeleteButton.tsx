"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleteOpened, setIsDeleteOpened] = useState(false);
  const [showToast, setShowToast] = useState(false);

  async function handleDelete() {
    await fetch(`/api/laporan/${id}`, { method: "DELETE" });
    setIsDeleteOpened(false);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      router.refresh();
    }, 2000);
  }

  return (
    <>
      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-600 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Laporan berhasil dihapus
        </div>
      )}

      {/* Confirmation Modal */}
      {isDeleteOpened && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-all duration-200">
          <div className="bg-white rounded-lg p-6 flex flex-col gap-4 w-80">
            <h2 className="font-nunito font-bold text-xl text-(--color-normal)">Hapus Laporan?</h2>
            <p className="font-nunito text-sm text-black/60">
              Laporan ini akan dihapus permanen dan tidak bisa dikembalikan.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setIsDeleteOpened(false)}
                className="px-4 py-2 cursor-pointer rounded-sm font-nunito text-sm border border-black/20 hover:bg-black/5 transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 cursor-pointer rounded-sm font-nunito text-sm bg-red-500 hover:bg-red-600 text-white transition-all"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trash Button */}
      <button
        onClick={() => setIsDeleteOpened(true)}
        className="shrink-0 p-1.5 rounded-lg bg-(--color-normal) hover:bg-(--color-normal-hover) transition-colors duration-150"
        aria-label="Hapus laporan"
      >
        <Image
          src="/admin/delete.svg"
          alt="Hapus"
          width={12}
          height={12}
          className="opacity-60 hover:opacity-100"
        />
      </button>
    </>
  );
}
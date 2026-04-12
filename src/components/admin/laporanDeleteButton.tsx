
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    await fetch(`/api/laporan/${id}`, { method: "DELETE" });
    router.refresh(); // re-fetches the server component data
  }

  return (
   <button
  onClick={handleDelete}
  className="shrink-0 p-1.5 rounded-lg bg-(--color-normal) text-black hover:bg-(--color-normal-hover) transition-colors duration-150"
  aria-label="Hapus laporan"
    >
  <img
    src="/admin/delete.svg"
    alt="Hapus"
    width={12}
    height={12}
    className="opacity-60 hover:opacity-100"
  />
</button>
  );
}

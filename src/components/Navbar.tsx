"use client";

import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const menuItems = [
  { id: 1, label: "Beranda", href: "/" },
  { id: 2, label: "Laporan", href: "/laporan" },
  { id: 3, label: "Papan Peringkat", href: "/leaderboard" },
];

type Session = {
  id: string;
  role: string;
  username: string;
} | null;

export default function Navbar({ session }: { session: Session }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpened, setSidebarOpened] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div>
      <nav className="flex fixed font-nunito bg-white border border-(--color-darker) rounded-[13px] px-5 py-3 justify-between items-center left-12 right-12 max-sm:left-4 max-sm:right-4 mt-5 z-100">
        <Image
          src="/logo.svg"
          width={120}
          height={40}
          alt="Logo CepuIn"
          className="h-auto 2xl:w-40"
        />

        <div className="flex justify-between">
          <ul
            className="flex items-center gap-5 text-[13px] 2xl:text-[16px]
                        [&>li]:hover:font-bold 
                        [&>li]:hover:transition-all 
                        [&>li]:hover:duration-200 
                        [&>li]:hover:ease-in
                        [&>li]:hover:cursor-pointer
                        max-sm:hidden"
          >
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`${item.href === pathname ? "font-bold" : "font-medium"} 2xl:text-[18px]`}
              >
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              {session ? (
                <div className="flex items-center gap-3 2xl:my-1.5">
                  <div className="flex items-center gap-2.5 bg-(--color-light) rounded-full pl-1.5 pr-4 py-1.5">
                    <div className="w-7 h-7 2xl:w-9 2xl:h-9 rounded-full bg-(--color-normal) flex items-center justify-center text-white text-xs 2xl:text-sm font-bold uppercase">
                      {session.username.charAt(0)}
                    </div>
                    <span className="text-sm 2xl:text-base font-semibold text-(--color-darker)">
                      {session.username}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 text-sm 2xl:text-base font-semibold text-(--color-normal) hover:text-(--color-normal-hover) bg-(--color-light) hover:bg-(--color-light-hover) px-4 py-2 2xl:px-5 2xl:py-2.5 rounded-full transition-all duration-200 cursor-pointer"
                  >
                    Keluar
                  </button>
                </div>
              ) : (
                <div className="2xl:my-1.5">
                  <Button
                    href="/login"
                    label="Masuk"
                    primary
                    icon="auth/login-icon.svg"
                    showIcon
                  />
                </div>
              )}
            </li>
          </ul>
        </div>

        <button
          onClick={() => setSidebarOpened(!isSidebarOpened)}
          className="max-sm:block hidden"
        >
          <Image src="/sidebar.svg" alt="Menu" width={20} height={2} />
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`border bg-white z-99 flex-col gap-5 fixed right-4 rounded-lg top-25 px-3 py-3 hidden max-sm:flex transition-all duration-200 ease-in ${isSidebarOpened ? "translate-x-0" : "translate-x-full"}`}
      >
        <ul className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`${item.href === pathname ? "bg-(--color-light)" : "bg-transparent"} rounded-md px-4 py-2`}
            >
              <Link href={item.href} onClick={() => setSidebarOpened(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="h-0.5 mx-3 bg-black/30" />

        <div className="mb-1 mx-2">
          {session ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5 px-2 py-1">
                <div className="w-8 h-8 rounded-full bg-(--color-normal) flex items-center justify-center text-white text-sm font-bold uppercase shrink-0">
                  {session.username.charAt(0)}
                </div>
                <span className="text-sm font-semibold text-(--color-darker) truncate">
                  {session.username}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-center px-3 py-2.5 text-sm font-semibold text-(--color-normal) bg-(--color-light) rounded-lg hover:bg-(--color-light-hover) transition-all duration-200 cursor-pointer"
              >
                Keluar
              </button>
            </div>
          ) : (
            <Button href="/login" label="Masuk" primary />
          )}
        </div>
      </div>
    </div>
  );
}


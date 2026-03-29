import { PrismaClient, Role, Kategori, Status } from "@prisma/client";
import { Pool } from "pg"; // Tambahkan ini
import { PrismaPg } from "@prisma/adapter-pg"; // Tambahkan ini
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const db = new PrismaClient({
  adapter,
  log: [],
} as any);

async function main() {
  console.log("Seeding...");

  // Hash password
  const hashedAdmin = await bcrypt.hash("admin123", 10);
  const hashedWarga = await bcrypt.hash("warga123", 10);

  // Buat admin
  const admin = await db.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedAdmin,
      nama: "Admin RT 01",
      role: Role.Admin,
      leaderboard: {
        create: {
          totalPoin: 0,
          laporanKredibel: 0,
          laporanDitolak: 0,
        },
      },
    },
  });

  // Buat beberapa warga
  const warga1 = await db.user.upsert({
    where: { username: "budi" },
    update: {},
    create: {
      username: "budi",
      password: hashedWarga,
      nama: "Budi Santoso",
      role: Role.Warga,
      leaderboard: {
        create: {
          totalPoin: 20,
          laporanKredibel: 2,
          laporanDitolak: 0,
        },
      },
    },
  });

  const warga2 = await db.user.upsert({
    where: { username: "siti" },
    update: {},
    create: {
      username: "siti",
      password: hashedWarga,
      nama: "Siti Rahayu",
      role: Role.Warga,
      leaderboard: {
        create: {
          totalPoin: 30,
          laporanKredibel: 3,
          laporanDitolak: 1,
        },
      },
    },
  });

  const warga3 = await db.user.upsert({
    where: { username: "eko" },
    update: {},
    create: {
      username: "eko",
      password: hashedWarga,
      nama: "Eko Prasetyo",
      role: Role.Warga,
      leaderboard: {
        create: {
          totalPoin: 8,
          laporanKredibel: 1,
          laporanDitolak: 1,
        },
      },
    },
  });

  // Buat laporan
  await db.laporan.createMany({
    data: [
      {
        judul: "Lampu jalan mati",
        deskripsi: "Lampu jalan di depan gang 3 sudah mati 2 hari",
        kategori: Kategori.Listrik,
        fotoBefore: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        status: Status.Selesai,
        kredibel: true,
        userId: warga1.id,
      },
      {
        judul: "Ubin trotoar lepas",
        deskripsi: "Ubin trotoar depan pos ronda sudah lepas dan berbahaya",
        kategori: Kategori.Bangunan,
        fotoBefore: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        status: Status.Proses,
        kredibel: true,
        userId: warga1.id,
      },
      {
        judul: "Sampah menumpuk",
        deskripsi: "Sampah di TPS depan balai RT sudah menumpuk sejak seminggu",
        kategori: Kategori.Kebersihan,
        fotoBefore: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        status: Status.Baru,
        kredibel: false,
        userId: warga2.id,
      },
      {
        judul: "Keran air bocor",
        deskripsi: "Keran air di mushola bocor dan menggenangi lantai",
        kategori: Kategori.Bangunan,
        fotoBefore: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        status: Status.Selesai,
        kredibel: true,
        userId: warga2.id,
      },
      {
        judul: "CCTV mati",
        deskripsi: "CCTV di pintu masuk perumahan tidak menyala",
        kategori: Kategori.Keamanan,
        fotoBefore: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        status: Status.Ditolak,
        kredibel: false,
        userId: warga2.id,
      },
      {
        judul: "Got mampet",
        deskripsi: "Saluran air di RT mampet dan menyebabkan banjir kecil",
        kategori: Kategori.Kebersihan,
        fotoBefore: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        status: Status.Baru,
        kredibel: false,
        userId: warga3.id,
      },
      {
        judul: "Tiang listrik miring",
        deskripsi:
          "Tiang listrik di ujung jalan kelihatan miring setelah hujan deras",
        kategori: Kategori.Listrik,
        fotoBefore: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        status: Status.Proses,
        kredibel: true,
        userId: warga3.id,
      },
    ],
  });

  console.log("Seed selesai!");
  console.log("Akun tersedia:");
  console.log("  Admin  → username: admin  | password: admin123");
  console.log("  Warga  → username: budi   | password: warga123");
  console.log("  Warga  → username: siti   | password: warga123");
  console.log("  Warga  → username: eko    | password: warga123");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());

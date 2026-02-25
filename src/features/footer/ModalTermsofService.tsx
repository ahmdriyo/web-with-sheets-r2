"use client";

import React from "react";
import { Modal } from "@/src/components/ui";

interface ModalTermsofServiceProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalTermsofService: React.FC<ModalTermsofServiceProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Syarat dan Ketentuan"
      size="lg"
    >
      <div className="space-y-6 text-gray-300">
        {/* Terakhir Diperbarui */}
        <div className="text-sm text-gray-400">
          <p>Terakhir Diperbarui: 17 Februari 2026</p>
        </div>

        {/* Pendahuluan */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            1. Persetujuan terhadap Ketentuan
          </h2>
          <p className="text-sm leading-relaxed">
            Dengan mengakses dan menggunakan situs web dan layanan Showroom
            Kami, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini. Jika
            Anda tidak menyetujui ketentuan ini, harap jangan menggunakan
            layanan kami.
          </p>
        </section>

        {/* Penggunaan Layanan */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            2. Penggunaan Layanan Kami
          </h2>
          <p className="text-sm leading-relaxed">Anda setuju untuk:</p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>
              Memberikan informasi yang akurat dan lengkap saat mengajukan
              pertanyaan
            </li>
            <li>Menggunakan layanan kami hanya untuk tujuan yang sah</li>
            <li>Tidak mengganggu atau merusak situs web atau server kami</li>
            <li>Tidak berusaha mendapatkan akses tidak sah ke sistem kami</li>
            <li>
              Tidak menggunakan layanan kami untuk mengirimkan konten yang
              berbahaya atau merugikan
            </li>
          </ul>
        </section>

        {/* Informasi Kendaraan */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            3. Informasi dan Ketersediaan Kendaraan
          </h2>
          <p className="text-sm leading-relaxed">
            Kami berusaha menyediakan informasi yang akurat tentang kendaraan
            kami. Namun:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>
              Spesifikasi, harga, dan ketersediaan kendaraan dapat berubah tanpa
              pemberitahuan sebelumnya
            </li>
            <li>
              Gambar hanya untuk tujuan ilustrasi dan mungkin tidak mewakili
              kendaraan yang sebenarnya
            </li>
            <li>
              Semua penjualan kendaraan tunduk pada ketersediaan dan verifikasi
            </li>
            <li>
              Kami berhak menolak layanan atau membatalkan pertanyaan atas
              kebijakan kami
            </li>
          </ul>
        </section>

        {/* Harga dan Pembayaran */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            4. Harga dan Pembayaran
          </h2>
          <p className="text-sm leading-relaxed">
            Semua harga yang ditampilkan di situs web kami:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>Tercantum dalam Rupiah Indonesia (IDR)</li>
            <li>Dapat berubah tanpa pemberitahuan sebelumnya</li>
            <li>
              Belum termasuk biaya tambahan seperti registrasi, asuransi, dan
              pajak kecuali dinyatakan lain
            </li>
            <li>
              Hanya berlaku untuk kendaraan tertentu yang terdaftar dan dapat
              bervariasi berdasarkan kondisi dan fitur
            </li>
          </ul>
        </section>

        {/* Test Drive */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            5. Test Drive dan Inspeksi
          </h2>
          <p className="text-sm leading-relaxed">
            Saat berpartisipasi dalam test drive:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>
              Anda harus memiliki SIM yang valid dan berusia minimal 21 tahun
            </li>
            <li>
              Anda bertanggung jawab atas kerusakan yang terjadi selama test
              drive
            </li>
            <li>
              Test drive tunduk pada ketersediaan dan perjanjian sebelumnya
            </li>
            <li>
              Kami berhak menolak permintaan test drive atas kebijakan kami
            </li>
          </ul>
        </section>

        {/* Kekayaan Intelektual */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            6. Kekayaan Intelektual
          </h2>
          <p className="text-sm leading-relaxed">
            Semua konten di situs web kami, termasuk teks, grafik, logo, gambar,
            dan perangkat lunak, adalah milik Showroom Kami atau pemberi
            lisensinya dan dilindungi oleh hak cipta dan undang-undang kekayaan
            intelektual. Anda tidak boleh:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>
              Menyalin, memodifikasi, atau mendistribusikan konten kami tanpa
              izin
            </li>
            <li>Menggunakan merek dagang atau branding kami tanpa otorisasi</li>
            <li>
              Mereproduksi atau menerbitkan ulang bagian mana pun dari situs web
              kami untuk tujuan komersial
            </li>
          </ul>
        </section>

        {/* Batasan Tanggung Jawab */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            7. Batasan Tanggung Jawab
          </h2>
          <p className="text-sm leading-relaxed">
            Sejauh diizinkan oleh hukum:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>
              Kami tidak bertanggung jawab atas kerusakan tidak langsung,
              insidental, atau konsekuensial
            </li>
            <li>
              Kami tidak menjamin layanan yang tidak terputus atau bebas
              kesalahan
            </li>
            <li>
              Kami tidak bertanggung jawab atas konten pihak ketiga atau tautan
              eksternal
            </li>
            <li>Penggunaan layanan kami adalah risiko Anda sendiri</li>
          </ul>
        </section>

        {/* Garansi */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">8. Garansi</h2>
          <p className="text-sm leading-relaxed">
            Kecuali dinyatakan secara eksplisit dalam bentuk tertulis:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>Kendaraan dijual &quot;apa adanya&quot; tanpa garansi</li>
            <li>Kami menyarankan inspeksi independen sebelum pembelian</li>
            <li>
              Garansi yang diberikan tunduk pada perjanjian tertulis terpisah
            </li>
            <li>
              Kami tidak menjamin keakuratan semua informasi yang diberikan oleh
              pihak ketiga
            </li>
          </ul>
        </section>

        {/* Komunikasi Pengguna */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            9. Komunikasi Pengguna
          </h2>
          <p className="text-sm leading-relaxed">
            Ketika Anda berkomunikasi dengan kami melalui WhatsApp, email, atau
            saluran lainnya:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>
              Anda memberikan izin kepada kami untuk menggunakan komunikasi Anda
              untuk keperluan bisnis
            </li>
            <li>
              Anda bertanggung jawab atas keakuratan informasi yang Anda berikan
            </li>
            <li>
              Kami dapat merekam atau menyimpan komunikasi untuk tujuan kualitas
              dan pelatihan
            </li>
          </ul>
        </section>

        {/* Hukum yang Berlaku */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            10. Hukum yang Berlaku
          </h2>
          <p className="text-sm leading-relaxed">
            Syarat dan Ketentuan ini diatur oleh hukum Indonesia. Segala
            sengketa akan diselesaikan di pengadilan Indonesia.
          </p>
        </section>

        {/* Perubahan Ketentuan */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            11. Perubahan Ketentuan
          </h2>
          <p className="text-sm leading-relaxed">
            Kami berhak untuk mengubah Syarat dan Ketentuan ini kapan saja.
            Perubahan akan berlaku segera setelah diposting di halaman ini.
            Penggunaan layanan kami yang berkelanjutan setelah perubahan
            merupakan penerimaan terhadap ketentuan yang dimodifikasi.
          </p>
        </section>

        {/* Penghentian */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">12. Penghentian</h2>
          <p className="text-sm leading-relaxed">Kami berhak untuk:</p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>
              Menghentikan atau menangguhkan akses Anda ke layanan kami kapan
              saja
            </li>
            <li>Menghapus konten apa pun yang melanggar ketentuan ini</li>
            <li>
              Mengambil tindakan hukum terhadap pengguna yang melanggar
              ketentuan ini
            </li>
          </ul>
        </section>

        {/* Informasi Kontak */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            13. Informasi Kontak
          </h2>
          <p className="text-sm leading-relaxed">
            Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini,
            silakan hubungi kami:
          </p>
          <ul className="list-none space-y-2 text-sm pl-4">
            <li>
              <strong className="text-white">Situs Web:</strong> Melalui
              formulir kontak kami
            </li>
            <li>
              <strong className="text-white">WhatsApp:</strong> Tersedia di
              situs web kami
            </li>
            <li>
              <strong className="text-white">Showroom:</strong> Kunjungi kami
              pada jam kerja
            </li>
          </ul>
        </section>

        {/* Keterpisahan */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">14. Keterpisahan</h2>
          <p className="text-sm leading-relaxed">
            Jika ada ketentuan dalam syarat ini yang dianggap tidak dapat
            dilaksanakan atau tidak valid, ketentuan tersebut akan dibatasi atau
            dihilangkan sejauh yang diperlukan, dan ketentuan lainnya akan tetap
            berlaku sepenuhnya.
          </p>
        </section>

        {/* Persetujuan */}
        <section className="space-y-3 border-t border-zinc-800 pt-6">
          <p className="text-sm leading-relaxed text-gray-400">
            Dengan menggunakan situs web dan layanan kami, Anda mengakui bahwa
            Anda telah membaca, memahami, dan setuju untuk terikat oleh Syarat
            dan Ketentuan ini.
          </p>
        </section>
      </div>
    </Modal>
  );
};

"use client";

import React from "react";
import { Modal } from "@/src/components/ui";

interface ModalPrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalPrivacyPolicy: React.FC<ModalPrivacyPolicyProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Kebijakan Privasi"
      size="lg"
    >
      <div className="space-y-6 text-gray-300">
        {/* Terakhir Diperbarui */}
        <div className="text-sm text-gray-400">
          <p>Terakhir Diperbarui: 17 Februari 2026</p>
        </div>

        {/* Pendahuluan */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">1. Pendahuluan</h2>
          <p className="text-sm leading-relaxed">
            Selamat datang di Showroom Kami (&quot;kami&quot;, &quot;kita&quot;,
            atau &quot;milik kami&quot;). Kami berkomitmen untuk melindungi
            informasi pribadi Anda dan hak privasi Anda. Kebijakan Privasi ini
            menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan,
            dan melindungi informasi Anda saat Anda mengunjungi situs web kami
            dan menggunakan layanan kami.
          </p>
        </section>

        {/* Informasi yang Kami Kumpulkan */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            2. Informasi yang Kami Kumpulkan
          </h2>
          <p className="text-sm leading-relaxed">
            Kami mengumpulkan informasi yang Anda berikan langsung kepada kami,
            termasuk:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>
              <strong className="text-white">Informasi Pribadi:</strong> Nama,
              alamat email, nomor telepon, dan detail kontak lainnya saat Anda
              menanyakan tentang kendaraan atau layanan kami.
            </li>
            <li>
              <strong className="text-white">Data Komunikasi:</strong> Pesan,
              umpan balik, dan korespondensi yang Anda kirimkan kepada kami
              melalui WhatsApp, email, atau formulir kontak.
            </li>
            <li>
              <strong className="text-white">Data Teknis:</strong> Alamat IP,
              jenis browser, informasi perangkat, dan data penggunaan yang
              dikumpulkan melalui cookie dan teknologi serupa.
            </li>
            <li>
              <strong className="text-white">Data Transaksi:</strong> Informasi
              terkait pertanyaan kendaraan, permintaan test drive, dan minat
              pembelian.
            </li>
          </ul>
        </section>

        {/* Bagaimana Kami Menggunakan Informasi Anda */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            3. Bagaimana Kami Menggunakan Informasi Anda
          </h2>
          <p className="text-sm leading-relaxed">
            Kami menggunakan informasi yang kami kumpulkan untuk:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>
              Menanggapi pertanyaan Anda dan memberikan dukungan pelanggan
            </li>
            <li>Memproses pertanyaan kendaraan dan menjadwalkan test drive</li>
            <li>
              Mengirimkan informasi terbaru tentang kendaraan dan promosi yang
              tersedia
            </li>
            <li>Meningkatkan situs web dan layanan kami</li>
            <li>Mencegah penipuan dan memastikan keamanan</li>
            <li>Mematuhi kewajiban hukum</li>
          </ul>
        </section>

        {/* Pembagian Informasi */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            4. Pembagian dan Pengungkapan Informasi
          </h2>
          <p className="text-sm leading-relaxed">
            Kami tidak menjual informasi pribadi Anda. Kami dapat membagikan
            informasi Anda kepada:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>
              <strong className="text-white">Penyedia Layanan:</strong> Pihak
              ketiga yang membantu kami dalam mengoperasikan situs web dan
              menjalankan bisnis kami.
            </li>
            <li>
              <strong className="text-white">Persyaratan Hukum:</strong> Ketika
              diwajibkan oleh hukum atau untuk melindungi hak dan keselamatan
              kami.
            </li>
            <li>
              <strong className="text-white">Pengalihan Bisnis:</strong> Dalam
              hal merger, akuisisi, atau penjualan aset.
            </li>
          </ul>
        </section>

        {/* Keamanan Data */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">5. Keamanan Data</h2>
          <p className="text-sm leading-relaxed">
            Kami menerapkan langkah-langkah teknis dan organisasi yang tepat
            untuk melindungi informasi pribadi Anda dari akses yang tidak sah,
            kehilangan, atau perubahan. Namun, tidak ada metode transmisi
            melalui internet yang 100% aman, dan kami tidak dapat menjamin
            keamanan absolut.
          </p>
        </section>

        {/* Hak Anda */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">6. Hak Anda</h2>
          <p className="text-sm leading-relaxed">Anda memiliki hak untuk:</p>
          <ul className="list-disc list-inside space-y-2 text-sm pl-4">
            <li>
              Mengakses, memperbarui, atau menghapus informasi pribadi Anda
            </li>
            <li>Berhenti berlangganan dari komunikasi pemasaran</li>
            <li>Menolak pemrosesan data pribadi Anda</li>
            <li>Meminta portabilitas data</li>
            <li>Menarik persetujuan kapan saja</li>
          </ul>
        </section>

        {/* Cookie */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">7. Cookie</h2>
          <p className="text-sm leading-relaxed">
            Kami menggunakan cookie dan teknologi pelacakan serupa untuk
            meningkatkan pengalaman penjelajahan Anda, menganalisis lalu lintas
            situs web, dan mempersonalisasi konten. Anda dapat mengontrol cookie
            melalui pengaturan browser Anda.
          </p>
        </section>

        {/* Tautan Pihak Ketiga */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            8. Tautan Pihak Ketiga
          </h2>
          <p className="text-sm leading-relaxed">
            Situs web kami mungkin berisi tautan ke situs web pihak ketiga. Kami
            tidak bertanggung jawab atas praktik privasi situs eksternal
            tersebut. Kami menyarankan Anda untuk meninjau kebijakan privasi
            mereka.
          </p>
        </section>

        {/* Privasi Anak */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">9. Privasi Anak</h2>
          <p className="text-sm leading-relaxed">
            Layanan kami tidak ditujukan untuk individu di bawah usia 18 tahun.
            Kami tidak secara sengaja mengumpulkan informasi pribadi dari
            anak-anak. Jika kami mengetahui bahwa kami telah mengumpulkan data
            dari anak di bawah umur, kami akan mengambil langkah-langkah untuk
            menghapus informasi tersebut.
          </p>
        </section>

        {/* Perubahan Kebijakan Privasi */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            10. Perubahan Kebijakan Privasi Ini
          </h2>
          <p className="text-sm leading-relaxed">
            Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu.
            Kami akan memberi tahu Anda tentang perubahan apa pun dengan
            memposting Kebijakan Privasi baru di halaman ini dan memperbarui
            tanggal &quot;Terakhir Diperbarui&quot;.
          </p>
        </section>

        {/* Hubungi Kami */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">11. Hubungi Kami</h2>
          <p className="text-sm leading-relaxed">
            Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau
            praktik data kami, silakan hubungi kami:
          </p>
          <ul className="list-none space-y-2 text-sm pl-4">
            <li>
              <strong className="text-white">Email:</strong> Hubungi kami
              melalui situs web kami
            </li>
            <li>
              <strong className="text-white">WhatsApp:</strong> Gunakan formulir
              kontak kami
            </li>
            <li>
              <strong className="text-white">Alamat:</strong> Kunjungi showroom
              kami pada jam kerja
            </li>
          </ul>
        </section>

        {/* Persetujuan */}
        <section className="space-y-3 border-t border-zinc-800 pt-6">
          <p className="text-sm leading-relaxed text-gray-400">
            Dengan menggunakan situs web dan layanan kami, Anda mengakui bahwa
            Anda telah membaca dan memahami Kebijakan Privasi ini dan menyetujui
            ketentuannya.
          </p>
        </section>
      </div>
    </Modal>
  );
};

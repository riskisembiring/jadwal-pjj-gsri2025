import React, { useState, useEffect } from "react";
import { Table, Input, message } from "antd";
import { useMediaQuery } from "react-responsive";

import { SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

const daftarPJJ = [
    { no: 1, tanggal: "05 Februari 2025", rumahKeluarga: "Gembala Sidang", alamat: "Jl. Sei Wampu Baru No.15c", pengkhotbah: "HT.J.I.Surbakti", pemimpinPujian: "HT. Budi Susanto" },
    { no: 2, tanggal: "12 Februari 2025", rumahKeluarga: "HT.R.Purba/Br Sembiring", alamat: "Perumahan Mandiri Bekala Blok A-30", pengkhotbah: "HT.J.I.Surbakti", pemimpinPujian: "HT. Budi Susanto" },
    { no: 3, tanggal: "19 Februari 2025", rumahKeluarga: "HT.E.Marpaung/Br Ginting", alamat: "Perumahan Wesley Residence Blok C-1", pengkhotbah: "HT.H.Pelawi", pemimpinPujian: "HT.Sadar Purba" },
    { no: 4, tanggal: "05 Maret 2025", rumahKeluarga: "HT.J.I.Surbakti /Br Pinem", alamat: "Komplek Gereja GSRI Sidomulyo", pengkhotbah: "HT.J.Ginting", pemimpinPujian: "HT.Sadar Purba" },
    { no: 5, tanggal: "12 Maret 2025", rumahKeluarga: "HT.N.Sitepu/Br Ginting", alamat: "Jl.Bunga Kenanga IV No.41 LK III P.Mangga", pengkhotbah: "HT.J.Ginting", pemimpinPujian: "Ptgs. Zefanya Surbakti" },
    { no: 6, tanggal: "19 Maret 2025", rumahKeluarga: "HT.B.Bangun/Br Sembiring", alamat: "Suka Raya", pengkhotbah: "HT.J.Ginting", pemimpinPujian: "Ptgs. Zefanya Surbakti" },
    { no: 7, tanggal: "02 April 2025", rumahKeluarga: "HT.S.Purba/Br Sembiring", alamat: "Jl.Bunga Turi III, (Belakang Basarnas)", pengkhotbah: "HT.H.Panggabean", pemimpinPujian: "HT.R. Purba" },
    { no: 8, tanggal: "09 April 2025", rumahKeluarga: "HT.J.Ginting/Br Marpaung", alamat: "Namo Pinang", pengkhotbah: "HT.H.Panggabean", pemimpinPujian: "HT.R. Purba" },
    { no: 9, tanggal: "16 April 2025", rumahKeluarga: "HT.H.Pelawi/Br Sembiring", alamat: "Jl.Bunga Turi III, (Belakang Basarnas)", pengkhotbah: "HT.J.I.Surbakti", pemimpinPujian: "HT.E.Marpaung" },
    { no: 10, tanggal: "23 April 2025", rumahKeluarga: "HT.Nd.Torong", alamat: "Jl.Bunga Kantil 16 No.16, Sempakata", pengkhotbah: "HT.J.I.Surbakti", pemimpinPujian: "HT.E.Marpaung" },
    { no: 11, tanggal: "07 Mei 2025", rumahKeluarga: "SST.Biring Rani", alamat: "Gg.Pribadi Lorong II, Simalingkar B", pengkhotbah: "HT.Budi Susanto", pemimpinPujian: "Ptgs. Zefanya Surbakti" },
    { no: 12, tanggal: "14 Mei 2025", rumahKeluarga: "Bp.Chintya/Br Sembiring", alamat: "Jl.Sawit 3.Perumnas Simalingkar", pengkhotbah: "HT.Budi Susanto", pemimpinPujian: "Ptgs. Zefanya Surbakti" },
    { no: 13, tanggal: "21 Mei 2025", rumahKeluarga: "SST.Jeni Br Sinuhaji", alamat: "Rumah Mbacang", pengkhotbah: "HT.H.Pelawi", pemimpinPujian: "HT.H.Panggabean" },
    { no: 14, tanggal: "04 Juni 2025", rumahKeluarga: "SST.Nd.Rani Purba", alamat: "Gg.Pribadi Lorong III, Simalingkar B", pengkhotbah: "HT.H.Pelawi", pemimpinPujian: "HT.H.Panggabean" },
    { no: 15, tanggal: "11 Juni 2025", rumahKeluarga: "Bp.Okta Pelawi/Br Tarigan", alamat: "Gg inpres, Semalingkar B", pengkhotbah: "HT.E.Marpaung", pemimpinPujian: "HT. Budi Susanto" },
    { no: 16, tanggal: "18 Juni 2025", rumahKeluarga: "Bp.Bastian Purba/Br Ginting", alamat: "Gg.Maju 5, Simalingkar B", pengkhotbah: "HT.E.Marpaung", pemimpinPujian: "HT. Budi Susanto" },
    { no: 17, tanggal: "02 Juli 2025", rumahKeluarga: "Nd.Sartika Ginting", alamat: "Jl.Ujung Jahe, Semalingkar Perumnas", pengkhotbah: "HT.J.Ginting", pemimpinPujian: "HT.R. Purba" },
    { no: 18, tanggal: "09 Juli 2025", rumahKeluarga: "Bp.Tesa Pasaribu/Br Sitepu", alamat: "Jl.Rotan 9 Ujung P.Simalingkar", pengkhotbah: "HT.J.Ginting", pemimpinPujian: "HT.R. Purba" },
    { no: 19, tanggal: "16 Juli 2025", rumahKeluarga: "Bp.J. Surbakti/Br Ginting", alamat: "Jl.Jamin Ginting, P.Mangga (Seberang Hilon)", pengkhotbah: "HT.R. Purba", pemimpinPujian: "Ptgs. Daniel Surbakti" },
    { no: 20, tanggal: "23 Juli 2025", rumahKeluarga: "Nd.Petrus Rumahorbo", alamat: "Patumbak", pengkhotbah: "HT.R. Purba", pemimpinPujian: "Ptgs. Daniel Surbakti" },
    { no: 21, tanggal: "06 Agustus 2025", rumahKeluarga: "Bp.Teresia Ginting/Br Siagian", alamat: "Jl.Bunga Turi III, (Belakang Basarnas)", pengkhotbah: "HT.H.Pelawi", pemimpinPujian: "HT. Budi Susanto" },
    { no: 22, tanggal: "13 Agustus 2025", rumahKeluarga: "Nd.David Sihaloho", alamat: "Jl.Tali Air (Belakang Rmh Biring Natalia)", pengkhotbah: "HT.H.Pelawi", pemimpinPujian: "HT. Budi Susanto" },
    { no: 23, tanggal: "20 Agustus 2025", rumahKeluarga: "Amos Sitepu/Br Simanjuntak Pancur Telu", alamat: "Pancur Telu", pengkhotbah: "HT.Sadar Purba", pemimpinPujian: "Ptgs. Zefanya Surbakti" },
    { no: 24, tanggal: "03 September 2025", rumahKeluarga: "Bolang Josua/Br Karo", alamat: "Jl.Jamin Ginting, Laucih", pengkhotbah: "HT.Sadar Purba", pemimpinPujian: "Ptgs. Zefanya Surbakti" },
    { no: 25, tanggal: "10 September 2025", rumahKeluarga: "Bp.Biasmedi/Br Sembiring", alamat: "Timbang Lawan", pengkhotbah: "HT.J.I.Surbakti", pemimpinPujian: "HT.R. Purba" },
    { no: 26, tanggal: "17 September 2025", rumahKeluarga: "Nd.Talenta Surbakti", alamat: "Laucih Sidomulyo", pengkhotbah: "HT.J.I.Surbakti", pemimpinPujian: "HT.R. Purba" },
    { no: 27, tanggal: "01 Oktober 2025", rumahKeluarga: "Bp.Sabrina Purba/Br Sitohang", alamat: "Jl.Bunga Turi 4, Kel.Sidomulyo", pengkhotbah: "HT.E.Marpaung", pemimpinPujian: "HT.H.Panggabean" },
    { no: 28, tanggal: "08 Oktober 2025", rumahKeluarga: "Bp.Natanael Pelawi/Br Purba", alamat: "Desa Suka Raya", pengkhotbah: "HT.E.Marpaung", pemimpinPujian: "HT.H.Panggabean" },
    { no: 29, tanggal: "15 Oktober 2025", rumahKeluarga: "Bp.Fellicia Ginting/Br Ketaren", alamat: "Timbang Lawan", pengkhotbah: "HT.J.I.Surbakti", pemimpinPujian: "SST.Nd.Chintya" },
    { no: 30, tanggal: "22 Oktober 2025", rumahKeluarga: "Bp.Philip Simanjuntak/Br Surbakti", alamat: "Tj.Anom", pengkhotbah: "HT.J.I.Surbakti", pemimpinPujian: "SST.Nd.Chintya" },
    { no: 31, tanggal: "05 November 2025", rumahKeluarga: "Bp.Karnis/ Br Sitepu", alamat: "Jl.Rotan 9 Ujung, P.Simalingkar", pengkhotbah: "HT.H.Pelawi", pemimpinPujian: "Ptgs. Daniel Surbakti" },
    { no: 32, tanggal: "12 November 2025", rumahKeluarga: "Bp.Javier Pelawi/Br Gurusinga", alamat: "Perum.Milala Rumah Tengah, Blok C1 no 3", pengkhotbah: "HT.H.Pelawi", pemimpinPujian: "Ptgs. Daniel Surbakti" },
    { no: 33, tanggal: "19 November 2025", rumahKeluarga: "Bp.Riko Sibuea/Br Sitepu", alamat: "Jl.Rotan 9 Ujung, P.Simalingkar", pengkhotbah: "HT. Budi Susanto", pemimpinPujian: "HT.R. Purba" },  
];

const DaftarPJJ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 600 });

  useEffect(() => {
    const today = new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  
    const todayPJJ = daftarPJJ.find((pjj) => pjj.tanggal === today);
  
    if (todayPJJ) {
      message.info({
        content: `Hari ini ada ibadah di rumah ${todayPJJ.rumahKeluarga}`,
        duration: 6, // Muncul selama 6 detik
      });
    }
  }, []);
   

  const filteredData = daftarPJJ.filter(
    (item) =>
      item.rumahKeluarga.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pengkhotbah.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { title: "No", dataIndex: "no", key: "no", width: 40 },
    { title: "Tanggal", dataIndex: "tanggal", key: "tanggal", width: 100 },
    {
      title: "Rumah Keluarga",
      dataIndex: "rumahKeluarga",
      key: "rumahKeluarga",
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      key: "alamat",
      render: (text) => (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            text
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          {text}
        </a>
      ),
    },
    { title: "Pengkhotbah", dataIndex: "pengkhotbah", key: "pengkhotbah" },
    {
      title: "Pemimpin Pujian",
      dataIndex: "pemimpinPujian",
      key: "pemimpinPujian",
    },
  ];

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20, textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
        <img src='./logo.jpg' alt="Logo" style={{ width: 50, height: 50, marginRight: 10 }} />
        <h2 style={{ fontSize: isMobile ? "1.2em" : "1.5em", fontWeight: "bold", color: "#333" }}>DAFTAR IBADAH PJJ - 2025</h2>
      </div>

      <Search
        placeholder="Cari rumah keluarga atau pengkhotbah"
        allowClear
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 20, width: "100%" }}
        prefix={<SearchOutlined />}
      />

      <Table
        dataSource={filteredData}
        columns={columns}
        bordered
        rowKey="no"
        pagination={{ pageSize: 5 }}
      />

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          marginTop: 20,
          padding: "10px 0",
          fontSize: isMobile ? "12px" : "14px",
          color: "#666",
        }}
      >
        © {new Date().getFullYear()}{" "}
        Created by <a
          href="https://riskisembiring.github.io/Portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Riski Sembiring
        </a>
      </footer>
    </div>
  );
};

export default DaftarPJJ;

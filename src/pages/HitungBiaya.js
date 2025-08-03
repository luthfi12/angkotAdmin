import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseApp } from "../firebaseConfig";
import AdminLayout from "../components/AdminLayout";

const HitungBiaya = () => {
  const [dataBiaya, setDataBiaya] = useState([]);
  const [totalBiaya, setTotalBiaya] = useState(0);

  useEffect(() => {
    const db = getDatabase(firebaseApp);
    const pengendaraRef = ref(db, "pengendara");

    onValue(pengendaraRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      let list = [];
      let total = 0;

      const bulatkan500 = (angka) => Math.ceil(angka / 500) * 500;

      Object.entries(data).forEach(([platNomor, pengendara]) => {
        if (pengendara.biaya) {
          const biaya = pengendara.biaya;
          const biayaBulat = bulatkan500(biaya.total);
          list.push({
            platNomor,
            total: biayaBulat,
            jarak: biaya.jarak,
            waktuNaik: biaya.waktuNaik,
            waktuTurun: biaya.waktuTurun,
          });
          total += biayaBulat;
        }
      });

      setDataBiaya(list);
      setTotalBiaya(total);
    });
  }, []);

  const formatWaktu = (isoString) => {
    const d = new Date(isoString);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${dd}/${mm}/${yyyy}, ${hh}:${min}`;
  };

  const rataRata = dataBiaya.length > 0 ? totalBiaya / dataBiaya.length : 0;

  return (
    <AdminLayout>
      <div style={{ padding: "20px" }}>
        <h2>Rekapitulasi Biaya Penumpang</h2>
        <p>Total Transaksi: <strong>{dataBiaya.length}</strong></p>
        <p>Total Biaya: <strong>Rp {totalBiaya.toLocaleString()}</strong></p>
        <p>Rata-rata Biaya per Penumpang: <strong>Rp {Math.round(rataRata).toLocaleString()}</strong></p>

        <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={tdStyle}>Plat Nomor</th>
              <th style={tdStyle}>Biaya (Rp)</th>
              <th style={tdStyle}>Jarak (km)</th>
              <th style={tdStyle}>Waktu Naik</th>
              <th style={tdStyle}>Waktu Turun</th>
            </tr>
          </thead>
          <tbody>
            {dataBiaya.map((item, index) => (
              <tr key={index}>
                <td style={tdStyle}>{item.platNomor}</td>
                <td style={tdStyle}>Rp {item.total.toLocaleString()}</td>
                <td style={tdStyle}>{item.jarak.toFixed(2)}</td>
                <td style={tdStyle}>{formatWaktu(item.waktuNaik)}</td>
                <td style={tdStyle}>{formatWaktu(item.waktuTurun)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "center",
};

export default HitungBiaya;

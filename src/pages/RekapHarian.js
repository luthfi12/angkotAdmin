import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseApp } from "../firebaseConfig";

const RekapHarian = () => {
  const [rekapData, setRekapData] = useState({});

  useEffect(() => {
    const db = getDatabase(firebaseApp);
    const rekapRef = ref(db, "rekap");

    onValue(rekapRef, (snapshot) => {
      const data = snapshot.val();
      const hasilRekap = {};

      if (data) {
        Object.entries(data).forEach(([platNomor, tanggalObj]) => {
          hasilRekap[platNomor] = [];

          Object.entries(tanggalObj).forEach(([tanggal, transaksi]) => {
            let total = 0;
            let jumlah = 0;

            Object.values(transaksi).forEach((item) => {
              total += Math.round(item.biaya / 500) * 500;
              jumlah += 1;
            });

            hasilRekap[platNomor].push({
              tanggal,
              jumlahPenumpang: jumlah,
              totalPenghasilan: total,
            });
          });
        });
      }

      setRekapData(hasilRekap);
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Rekap Harian Penghasilan Angkot</h2>
      {Object.keys(rekapData).length === 0 ? (
        <p>Memuat data...</p>
      ) : (
        Object.entries(rekapData).map(([plat, rekapList]) => (
          <div key={plat} style={{ marginBottom: 30 }}>
            <h4>Plat Nomor: {plat}</h4>
            <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Jumlah Penumpang</th>
                  <th>Total Penghasilan (Rp)</th>
                </tr>
              </thead>
              <tbody>
                {rekapList.map((rekap, idx) => (
                  <tr key={idx}>
                    <td>{rekap.tanggal}</td>
                    <td>{rekap.jumlahPenumpang}</td>
                    <td>Rp {rekap.totalPenghasilan.toLocaleString("id-ID")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default RekapHarian;

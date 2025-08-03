import React, { useEffect, useState, useCallback } from "react";

export default function Statistik() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("last30");

  const BASE_URL = "https://mil-yemen-vast-exceptions.trycloudflare.com/matomo/index.php";; 
  const TOKEN_AUTH = "bb99d99130da3a2dc1dcd3bf65bd76b7"; // Token Matomo

  const getDateParam = useCallback(() => {
    if (range === "today") return "today";
    if (range === "last7") return "last7";
    if (range === "last30") return "last30";
    return "2024-01-01,today"; 
  }, [range]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append("module", "API");
      form.append("method", "Events.getCategory");
      form.append("idSite", "2");
      form.append("period", "range");
      form.append("date", getDateParam());
      form.append("format", "JSON");
      form.append("token_auth", TOKEN_AUTH);

      const res = await fetch(BASE_URL, {
        method: "POST",
        body: form
      });
      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [getDateParam]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  
  const bulatkan500 = (angka) => Math.ceil(angka / 500) * 500;

  // Rekap total rata-rata
  const totalPenumpang = data.reduce((sum, item) => sum + Number(item.nb_events || 0), 0);
  const totalPenghasilan = data.reduce((sum, item) => {
    const value = Number(item.sum_event_value || 0);
    return sum + bulatkan500(value);
  }, 0);
  const rataRataBiaya = totalPenumpang > 0 ? bulatkan500(totalPenghasilan / totalPenumpang) : 0;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Statistik Penggunaan Aplikasi Angkot</h2>
        <div>
          <label>
            Pilih Periode:
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              style={{ marginLeft: "10px", padding: "4px 8px" }}
            >
              <option value="today">Hari Ini</option>
              <option value="last7">7 Hari Terakhir</option>
              <option value="last30">30 Hari Terakhir</option>
              <option value="all">Semua Data</option>
            </select>
          </label>
          <button onClick={fetchData} style={styles.refreshButton}>
            Refresh
          </button>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.tableColumn}>
          {loading && <p>Memuat data statistik...</p>}
          {!loading && data.length === 0 && (
            <p style={{ color: "red" }}>
              Tidak ada data event untuk periode yang dipilih.
            </p>
          )}
          {!loading && data.length > 0 && (
            <>
              <div style={{ marginBottom: "20px" }}>
                <p>Total Penumpang: <strong>{totalPenumpang}</strong></p>
                <p>Total Penghasilan: <strong>Rp {totalPenghasilan.toLocaleString()}</strong></p>
                <p>Rata-rata Biaya per Penumpang: <strong>Rp {rataRataBiaya.toLocaleString()}</strong></p>
              </div>

              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Plat Nomor</th>
                    <th style={styles.th}>Jumlah Penumpang</th>
                    <th style={styles.th}>Jumlah Penghasilan (Rp)</th>
                    <th style={styles.th}>Rata-rata Biaya (Rp)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, idx) => {
                    const platNomor = item.label;
                    const penumpang = Number(item.nb_events || 0);
                    const penghasilan = bulatkan500(Number(item.sum_event_value || 0));
                    const rataRata = bulatkan500(Number(item.avg_event_value || 0));
                    return (
                      <tr key={idx}>
                        <td style={styles.td}>{platNomor}</td>
                        <td style={styles.td}>{penumpang}</td>
                        <td style={styles.td}>Rp {penghasilan.toLocaleString()}</td>
                        <td style={styles.td}>Rp {rataRata.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// CSS-in-JS style object
const styles = {
  container: {
    padding: "20px",
    fontFamily: "sans-serif"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  refreshButton: {
    marginLeft: "20px",
    padding: "4px 12px"
  },
  content: {
    display: "flex",
    gap: "20px"
  },
  tableColumn: {
    flex: 2
  },
  infoPanel: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px"
  },
  infoBox: {
    fontSize: "14px",
    lineHeight: "1.6"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px"
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    background: "#f2f2f2",
    textAlign: "left"
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px"
  }
};

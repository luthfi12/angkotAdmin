import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Statistik() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("last7");

  const TOKEN_AUTH = "928a5c33be4b24a0d30b17f26f720687"; // api matomo
  const BASE_URL = "http://192.168.89.183/matomo/index.php"; //  Pake IP

  const getDateParam = () => {
    if (range === "last7") return "last7";
    if (range === "last30") return "last30";
    if (range === "all") return "2024-01-01,today";
    return "last30";
  };

  const fetchData = () => {
    setLoading(true);
    const url = `${BASE_URL}?module=API&method=Events.getCategory&idSite=1&period=range&date=${getDateParam()}&format=JSON&token_auth=${TOKEN_AUTH}`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal ambil data:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [range]);

  
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Jumlah Event",
        data: data.map((item) => parseInt(item.nb_events, 10) || 0),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Grafik Jumlah Event (${range})`,
      },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Statistik Event</h2>

      {/* Dropdown */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          Pilih Periode:
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            style={{ marginLeft: "10px", padding: "4px" }}
          >
            <option value="last7">7 Hari Terakhir</option>
            <option value="last30">30 Hari Terakhir</option>
            <option value="all">Semua Data</option>
          </select>
        </label>
      </div>

      {loading && <p>Memuat data statistik...</p>}

      {!loading && data.length === 0 && (
        <p style={{ color: "red" }}>
          Tidak ada data event untuk periode yang dipilih.
        </p>
      )}

      {/* Tampilkan Grafik */}
      {!loading && data.length > 0 && (
        <div style={{ maxWidth: "600px", marginBottom: "30px" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}

      {/* Tampilkan List Detail */}
      {!loading && data.map((item, index) => (
        <div
          key={index}
          style={{
            background: "#f9f9f9",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #ddd",
          }}
        >
          <p><strong>Kategori:</strong> {item.label}</p>
          <p><strong>Jumlah Event:</strong> {item.nb_events}</p>
          <p><strong>Jumlah Pengunjung:</strong> {item.nb_visits}</p>
        </div>
      ))}
    </div>
  );
}

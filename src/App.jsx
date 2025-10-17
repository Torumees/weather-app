import { useEffect, useState } from "react";

const LS_KEY = "weather_recent_v1";
const MAX_RECENT = 3;

export default function App() {
  const [q, setQ] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [recent, setRecent] = useState([]);

  // loe ajalugu mountimisel
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setRecent(JSON.parse(raw));
    } catch {}
  }, []);

  function saveRecent(name) {
    const city = String(name || "").trim();
    if (!city) return;
    const next = [city, ...recent.filter(c => c.toLowerCase() !== city.toLowerCase())]
      .slice(0, MAX_RECENT);
    setRecent(next);
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(next));
    } catch {}
  }

  async function searchCity(e) {
    if (e) e.preventDefault();
    const city = q.trim();
    if (!city) return;

    setLoading(true);
    setErr("");
    setData(null);

    try {
      // 1) geokodeerimine
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=et&format=json`
      );
      const geo = await geoRes.json();
      if (!geo.results || !geo.results.length) {
        setErr("Linna ei leitud.");
        return;
      }
      const { latitude, longitude, name, country } = geo.results[0];

      // 2) ilm
      const meteoRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`
      );
      const meteo = await meteoRes.json();

      setData({ place: `${name}, ${country}`, current: meteo.current });
      saveRecent(name);
    } catch (e) {
      setErr("Midagi läks valesti. Proovi uuesti.");
    } finally {
      setLoading(false);
    }
  }

  function quickSearch(city) {
    setQ(city);
    setTimeout(() => searchCity(), 0);
  }

  function clearRecent() {
    setRecent([]);
    try {
      localStorage.removeItem(LS_KEY);
    } catch {}
  }

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ marginBottom: 12 }}>Weather App</h1>

      {recent.length > 0 && (
        <div style={{ marginBottom: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
          {recent.map((c) => (
            <button
              key={c}
              onClick={() => quickSearch(c)}
              style={{
                padding: "6px 10px",
                borderRadius: 999,
                border: "1px solid #eee",
                color: "GrayText",
                background: "#f8f8f8",
                cursor: "pointer",
              }}
            >
              {c}
            </button>
          ))}
          <button
            onClick={clearRecent}
            style={{
              padding: "6px 10px",
              borderRadius: 999,
              border: "1px solid #eee",
              background: "transparent",
              color: "#666",
              cursor: "pointer",
            }}
            title="Tühjenda ajalugu"
          >
            Tühjenda
          </button>
        </div>
      )}

      <form onSubmit={searchCity} style={{ display: "flex", gap: 8 }}>
        <input
          placeholder="Sisesta linn (nt Tallinn)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
        />
        <button disabled={loading} style={{ padding: "10px 14px" }}>
          {loading ? "Laadin…" : "Otsi"}
        </button>
      </form>

      {err && <p style={{ color: "crimson", marginTop: 10 }}>{err}</p>}

      {data && (
        <div style={{ marginTop: 16, padding: 16, border: "1px solid #eee", borderRadius: 12 }}>
          <h2 style={{ marginTop: 0 }}>{data.place}</h2>
          <p><strong>Temperatuur:</strong> {data.current?.temperature_2m} °C</p>
          <p><strong>Tuul:</strong> {data.current?.wind_speed_10m} m/s</p>
        </div>
      )}
    </main>
  );
}

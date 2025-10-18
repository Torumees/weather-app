import { useEffect, useState, useRef } from "react";
import SearchBar from "./components/SearchBar";
import RecentList from "./components/RecentList";
const LS_KEY = "weather_recent_v1";
const MAX_RECENT = 3;

export default function App() {
  const [q, setQ] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [recent, setRecent] = useState([]);
  const reqRef = useRef(null); // <-- liigutatud siia (komponendi sisse)

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

  async function searchCity(eOrCity) {
    // lubame kutsuda nii submit-ürituse kui ka otse stringiga
    if (typeof eOrCity === "object" && eOrCity?.preventDefault) eOrCity.preventDefault();
    const city = (typeof eOrCity === "string" ? eOrCity : q).trim();
    if (!city) return;

    // tühista eelmised requestid
    reqRef.current?.abort();
    const controller = new AbortController();
    reqRef.current = controller;

    setLoading(true);
    setErr("");
    setData(null);

    try {
      // 1) geokodeerimine
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=et&format=json`, 
        { signal: controller.signal }
      );
      if (!geoRes.ok) throw new Error(`Geo HTTP ${geoRes.status}`);
      const geo = await geoRes.json();
      if (!geo.results?.length) {
         setErr("Linna ei leitud.");
          return; 
        }
      const { latitude, longitude, name, country } = geo.results[0];

      // 2) ilm
      const meteoRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`,
        { signal: controller.signal }
      );
      if (!meteoRes.ok) throw new Error(`Meteo HTTP ${meteoRes.status}`);
      const meteo = await meteoRes.json();

      setData({ place: `${name}, ${country}`, current: meteo.current });
      saveRecent(name);
      setQ(city);
    } catch (e) {
      if (e.name !== "AbortError") setErr("Midagi läks valesti. Proovi uuesti.");
    } finally {
      setLoading(false);
    }
  }

  function quickSearch(city) {
    setQ(city);
    searchCity(city);
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

      <RecentList
        items={recent}
        onPick={(city) => { setQ(city); searchCity(city);}}
        onClear={clearRecent}
      />
      
      <SearchBar
        value={q}
        onChange={setQ}
        onSubmit={searchCity}
        loading={loading}
        placeholder="Sisesta linn (nt Tallinn)"
      />

      {err && (
        <p aria-live="polite" style={{ color: "crimson", marginTop: 10 }}>
          {err}
        </p>
      )}

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
/**
 * WeatherCard – kuvab ühe koha põhi-ilma (nimi, temp, tuul).
 * SRP: ei tee API-t, ei halda state'i – saab taaskasutada/ testida isoleeritult.
 */

export default function WeatherCard({ place, current}) {
    if(!place || !current) return null;

     // Kaitse: kui API-lt midagi puudu (nt current.wind_speed_10m), näita '–'.
    const temp = typeof current.temperature_2m === "number" ? Math.round(current.temperature_2m) : "-";
    const wind = typeof current.wind_speed_10m === "number" ? current.wind_speed_10m.toFixed(1) : "–"

    return (
        <section
            aria-label={`Ilm: ${place}`}
            style={{
                marginTop: 16,
                padding: 16,
                border: "1px solid #eee",
                borderRadius: 12,
                display: "grid",
                gap: 6
            }}
        >
            <h2 style={{ margin: 0 }}>{place}</h2>
            <p style={{ margin: 0 }}>
                <strong>Temperatuur:</strong> {temp} °C
            </p>
            <p style={{ margin: 0 }}>
                <strong>Tuul: </strong> {wind} m/s
            </p>
        </section>
    );
}
/**
 * Loader – väike, sõltumatu laadimisindikator.
 * - Ei vaja eraldi CSS-faile (kasutab SVG <animateTransform> animatsiooni).
 * - A11y: role="status" + aria-live="polite" → ekraanilugeja teab, et "midagi toimub".
 * - Kasutamine: {loading && <Loader label="Laen ilmapäringut..." />}
 */
export default function Loader({ size = 20, stroke = 3, label = "Laadin…" }) {
  const r = (size - stroke) / 2; // ringi raadius

  return (
    <div
      role="status"
      aria-live="polite"
      style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 10 }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        {/* Taustarõngas (hele) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#eee"
          strokeWidth={stroke}
        />
        {/* Aktiivne segment (animatsiooniga) */}
        <path
          d={describeArc(size / 2, size / 2, r, 0, 270)} // 270° kaar → näeb "tükina" välja
          fill="none"
          stroke="#888"
          strokeLinecap="round"
          strokeWidth={stroke}
        >
          {/* Lihtne lõputu pöörlemine */}
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${size / 2} ${size / 2}`}
            to={`360 ${size / 2} ${size / 2}`}
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      <span>{label}</span>
    </div>
  );
}

/**
 * Väike util: kirjeldab kaare path'ina (SVG "arc").
 * – aitab teha "spinneri tükki" ilma CSSita.
 */
function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M", start.x, start.y,
    "A", r, r, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
}
function polarToCartesian(cx, cy, r, angleInDegrees) {
  const angle = (angleInDegrees - 90) * Math.PI / 180.0;
  return { x: cx + (r * Math.cos(angle)), y: cy + (r * Math.sin(angle)) };
}

/**
 * RecentList – kuvab hiljutiste linnade kiirnupud + "Tühjenda" nupu.
 * Vastutus: ainult kuvamine + sündmuste edastamine parentile.
 * Ei halda ise localStorage't – see on App'i töö (SRP).
 */
export default function RecentList({
  items = [],            // string[] – nt ["Tallinn","Tartu"]
  onPick,                // (city: string) => void
  onClear,               // () => void
  ariaLabel = "Hiljutised otsingud"
}) {
  if (!items.length) return null;

  return (
    <div
      aria-label={ariaLabel}
      style={{ marginBottom: 10, display: "flex", gap: 8, flexWrap: "wrap" }}
    >
      {items.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onPick?.(c)}
          title={`Otsi uuesti: ${c}`}
          style={{
            padding: "6px 10px",
            borderRadius: 999,
            border: "1px solid #eee",
            color: "GrayText",
            background: "#f8f8f8",
            cursor: "pointer",
          }}
          // A11y: klaviatuuriga navigeeritav chip
          aria-label={`Otsi uuesti ${c}`}
        >
          {c}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onClear?.()}
        style={{
          padding: "6px 10px",
          borderRadius: 999,
          border: "1px solid #eee",
          background: "transparent",
          color: "#666",
          cursor: "pointer",
        }}
        title="Tühjenda ajalugu"
        aria-label="Tühjenda hiljutised otsingud"
      >
        Tühjenda
      </button>
    </div>
  );
}

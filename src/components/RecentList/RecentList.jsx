/**
 * ErrorBanner – ühtne veateadete kuvaja.
 * - Hoia kõik veateated läbi ühe komponendi, et UX ja stiil oleks ühtlane.
 * - A11y: aria-live="assertive" -> ekraanilugejad loevad kohe ette.
 * - Võimalik laiendada (ikoon, "Retry" nupp, error codes).
 */
export default function ErrorBanner({ message, onRetry }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        marginTop: 10,
        padding: "10px 12px",
        borderRadius: 8,
        border: "1px solid #ffd3d3",
        background: "#fff5f5",
        color: "#8a1111",
        display: "flex",
        alignItems: "center",
        gap: 8
      }}
    >
      <span style={{ fontWeight: 600 }}>Viga:</span>
      <span style={{ flex: 1 }}>{message}</span>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #e5b1b1",
            background: "white",
            cursor: "pointer"
          }}
          title="Proovi uuesti"
        >
          Uuesti
        </button>
      )}
    </div>
  );
}

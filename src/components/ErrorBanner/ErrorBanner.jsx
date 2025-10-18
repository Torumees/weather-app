/**
 * ErrorBanner – ühtne ja lihtne veateate komponent.
 * Kui message puudub, ei renderda midagi (null).
 */

export default function ErrorBanner( { message }) {
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
            color: "#8a1111"
        }}
        >
            {message}
        </div>
    );
}
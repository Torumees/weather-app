import { useId } from "react";

/**
 * SearchBar – puhas presentatsioonikomponent.
 * Vastutab ainult UI ja sündmuste edastamise eest (propsid),
 * mitte API loogika eest. See hoiab vastutuspiiri selge.
 */
export default function SearchBar({
  value,           // string – praegune sisend (kontrollitav)
  onChange,        // (nextValue: string) => void
  onSubmit,        // (event) => void  VÕI ilma eventita kui see on juba wrapped
  loading = false, // boolean – disablime nupu, näitame "Laadin…"
  placeholder = "Sisesta linn (nt Tallinn)"
}) {
  // A11y jaoks unikaalne id (seob <label> ja <input>)
  const inputId = useId();

  return (
    // NB: form – Enter käivitab submit'i; jätame action'ita (SPA)
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", gap: 8 }}
      aria-busy={loading || undefined} // ekraanilugejatele vihje
    >
      <label htmlFor={inputId} className="sr-only">
        Otsi linna
      </label>

      <input
        id={inputId}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}   // prop annab otsuse Appile
        autoComplete="off"
        inputMode="text"
        style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
      />

      <button
        type="submit"
        disabled={loading}
        style={{ padding: "10px 14px", borderRadius: 8, cursor: loading ? "not-allowed" : "pointer" }}
        aria-live="polite"
      >
        {loading ? "Laadin…" : "Otsi"}
      </button>
    </form>
  );
}

/* 
Miks nii?
- SearchBar ei tea API-st ega localStoragest midagi. See on "dumb" UI.
- App juhib väärtust (value) ja kontrollib, mis submitil juhtub.
- Selline jaotus teeb testimise lihtsaks ja koodi loetavaks (SRP – single responsibility principle).
*/

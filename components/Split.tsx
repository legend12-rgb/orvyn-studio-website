/**
 * Server-rendered split text: words and letters as spans so Motion.tsx can animate them
 * without touching React-owned DOM. Screen readers get the plain text via aria-label.
 */
export default function Split({ text, lines, giant, fill }: { text: string; lines?: boolean; giant?: boolean; fill?: boolean }) {
  // fill: words light up one by one as the reader scrolls past (scroll-linked)
  const attrs = giant ? { "data-giant": "" } : fill ? { "data-fill": "" } : lines ? { "data-split-lines": "" } : { "data-split": "" };
  const words = text.split(" ");
  return (
    <span {...attrs} aria-label={text} role="text">
      {words.map((w, i) => (
        <span key={i}>
          {i > 0 && " "}
          <span className="w" aria-hidden="true">
            {[...w].map((c, j) => <span className="ch" key={j}>{c}</span>)}
          </span>
        </span>
      ))}
    </span>
  );
}

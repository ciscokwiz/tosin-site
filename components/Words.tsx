/* Splits a sentence into word spans so MotionEngine can light them up as
   the reader scrolls. Server-rendered, fully visible without JavaScript.
   - Wrap a phrase in *asterisks* to set it in gold italic.
   - Separate segments with " | " — each word gets data-seg="0", "1", …
     (used by "Meet the host" to switch photos as each segment is read). */
export function Words({ text, className }: { text: string; className?: string }) {
  const words: { w: string; em: boolean; seg: number }[] = [];
  text.split("|").forEach((segment, seg) => {
    for (const part of segment.split(/(\*[^*]+\*)/).filter(Boolean)) {
      const em = part.startsWith("*");
      for (const w of part.replace(/\*/g, "").split(/\s+/).filter(Boolean)) words.push({ w, em, seg });
    }
  });
  return (
    <p className={className} data-words style={{ ["--n" as string]: words.length }}>
      {words.map((x, i) => (
        <span key={i} className={x.em ? "w w--em" : "w"} data-seg={x.seg} style={{ ["--i" as string]: i }}>
          {x.w}{" "}
        </span>
      ))}
    </p>
  );
}

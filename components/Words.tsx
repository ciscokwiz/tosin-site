/* Splits a sentence into word spans so MotionEngine can light them up as
   the reader scrolls. Server-rendered, fully visible without JavaScript.
   Wrap a phrase in *asterisks* to set it in gold italic. */
export function Words({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\*[^*]+\*)/).filter(Boolean);
  const words: { w: string; em: boolean }[] = [];
  for (const part of parts) {
    const em = part.startsWith("*");
    for (const w of part.replace(/\*/g, "").split(/\s+/).filter(Boolean)) words.push({ w, em });
  }
  return (
    <p className={className} data-words style={{ ["--n" as string]: words.length }}>
      {words.map((x, i) => (
        <span key={i} className={x.em ? "w w--em" : "w"} style={{ ["--i" as string]: i }}>
          {x.w}{" "}
        </span>
      ))}
    </p>
  );
}

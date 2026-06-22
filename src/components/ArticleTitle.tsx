export default function ArticleTitle({
  title,
  titleEn,
  summary,
}: {
  title: string
  titleEn?: string
  summary?: string
}) {
  return (
    <div className="border-b border-wiki-border pb-2 mb-4">
      <h1 className="wiki-heading text-3xl font-bold text-wiki-text">{title}</h1>
      {titleEn && <p className="text-wiki-muted italic">{titleEn}</p>}
      {summary && <p className="mt-2 text-wiki-text">{summary}</p>}
    </div>
  )
}

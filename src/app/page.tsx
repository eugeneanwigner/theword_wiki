import Link from 'next/link'
import { getConcepts, getRounds, getItems } from '@/lib/queries'

export default async function HomePage() {
  const [concepts, rounds, items] = await Promise.all([
    getConcepts(),
    getRounds(),
    getItems(),
  ])

  return (
    <main>
      <div className="border-b border-wiki-border pb-2 mb-4">
        <h1 className="wiki-heading text-3xl font-bold text-wiki-text">Codex Wiki</h1>
      </div>

      <section className="mb-8">
        <h2 className="wiki-heading text-xl font-bold border-b border-wiki-border mb-2 pb-1">
          개념
        </h2>
        <ul className="list-disc pl-6">
          {concepts.map((c) => (
            <li key={c._id} className="mb-1">
              <Link href={`/concept/${c.slug}`}>{c.title}</Link>
              {c.titleEn && <span className="text-wiki-muted"> ({c.titleEn})</span>}
              {c.summary && <p className="text-sm text-wiki-muted">{c.summary}</p>}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="wiki-heading text-xl font-bold border-b border-wiki-border mb-2 pb-1">
          라운드
        </h2>
        <ul className="list-disc pl-6">
          {rounds.map((r) => (
            <li key={r._id} className="mb-1">
              <Link href={`/round/${r.number}`}>
                R{r.number} · {r.title}
              </Link>
              {r.dimension && <span className="text-wiki-muted"> [{r.dimension}]</span>}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="wiki-heading text-xl font-bold border-b border-wiki-border mb-2 pb-1">
          아이템
        </h2>
        <ul className="list-disc pl-6">
          {items.map((item) => (
            <li key={item._id} className="mb-1">
              <Link href={`/item/${item.slug}`}>{item.title}</Link>
              {item.grade && <span className="text-wiki-muted"> ({item.grade}급)</span>}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

import { notFound } from 'next/navigation'
import { getRoundByNumber, getAllRoundNumbers } from '@/lib/queries'
import PortableTextBody from '@/components/PortableTextBody'
import ArticleTitle from '@/components/ArticleTitle'
import RelatedList from '@/components/RelatedList'

type Props = { params: Promise<{ number: string }> }

export async function generateStaticParams() {
  const rounds = await getAllRoundNumbers()
  return rounds.map((r) => ({ number: String(r.number) }))
}

export default async function RoundPage({ params }: Props) {
  const { number } = await params
  const round = await getRoundByNumber(parseInt(number, 10))

  if (!round) notFound()

  return (
    <main>
      <ArticleTitle
        title={`R${round.number} · ${round.title}`}
        titleEn={round.titleEn}
        summary={round.summary}
      />
      {round.dimension && (
        <p className="text-wiki-muted mb-3">차원: {round.dimension}</p>
      )}
      <PortableTextBody value={round.body} />

      {round.unlockHint && (
        <section className="mt-4">
          <h2 className="wiki-heading text-lg font-bold mb-1">해금 힌트</h2>
          <p>{round.unlockHint}</p>
        </section>
      )}

      {round.fourthDimHint && (
        <section className="mt-4">
          <h2 className="wiki-heading text-lg font-bold mb-1">4차원 존재의 힌트</h2>
          <p>{round.fourthDimHint}</p>
        </section>
      )}

      {round.items && round.items.length > 0 && (
        <RelatedList
          title="이 라운드의 아이템"
          items={round.items.map((item) => ({
            href: `/item/${item.slug}`,
            label: item.title,
            meta: item.grade && `(${item.grade}급)`,
          }))}
        />
      )}
    </main>
  )
}

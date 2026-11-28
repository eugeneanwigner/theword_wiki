import { notFound } from 'next/navigation'
import { getItemBySlug, getAllItemSlugs } from '@/lib/queries'
import PortableTextBody from '@/components/PortableTextBody'
import ArticleTitle from '@/components/ArticleTitle'
import Infobox from '@/components/Infobox'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getAllItemSlugs()
  return slugs.map((s) => ({ slug: s.slug }))
}

export default async function ItemPage({ params }: Props) {
  const { slug } = await params
  const item = await getItemBySlug(slug)

  if (!item) notFound()

  const infoRows = [item.grade && { label: '등급', value: item.grade }].filter(
    (row): row is { label: string; value: string } => Boolean(row)
  )

  return (
    <main>
      <ArticleTitle title={item.title} titleEn={item.titleEn} />

      <div className="flow-root">
        {infoRows.length > 0 && <Infobox title={item.title} rows={infoRows} />}

        {item.origin && (
          <section className="mb-3">
            <h2 className="wiki-heading text-lg font-bold mb-1">기원</h2>
            <p>{item.origin}</p>
          </section>
        )}
        {item.effect && (
          <section className="mb-3">
            <h2 className="wiki-heading text-lg font-bold mb-1">효과</h2>
            <p>{item.effect}</p>
          </section>
        )}
        {item.skill && (
          <section className="mb-3">
            <h2 className="wiki-heading text-lg font-bold mb-1">스킬</h2>
            <p>{item.skill}</p>
          </section>
        )}
        <PortableTextBody value={item.body} />
      </div>
    </main>
  )
}

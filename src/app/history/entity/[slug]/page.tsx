import { notFound } from 'next/navigation'
import { getEntityBySlug, getAllEntitySlugs } from '@/lib/queries'
import PortableTextBody from '@/components/PortableTextBody'
import ArticleTitle from '@/components/ArticleTitle'
import Infobox from '@/components/Infobox'
import RelatedList from '@/components/RelatedList'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getAllEntitySlugs()
  return slugs.map((s) => ({ slug: s.slug }))
}

export default async function EntityPage({ params }: Props) {
  const { slug } = await params
  const entity = await getEntityBySlug(slug)

  if (!entity) notFound()

  const infoRows = [
    entity.kind && { label: '분류', value: entity.kind },
    entity.dimensionLevel && { label: '차원 위계', value: entity.dimensionLevel },
    entity.status && { label: '현재 상태', value: entity.status },
  ].filter((row): row is { label: string; value: string } => Boolean(row))

  return (
    <main>
      <ArticleTitle title={entity.title} titleEn={entity.titleEn} summary={entity.summary} />

      <div className="flow-root">
        {infoRows.length > 0 && <Infobox title={entity.title} rows={infoRows} />}
        <PortableTextBody value={entity.body} />
      </div>

      {entity.related && entity.related.length > 0 && (
        <RelatedList
          title="연관 항목"
          items={entity.related.map((r) => ({
            href: `/history/${r._type}/${r.slug}`,
            label: r.title,
            meta: r.titleEn && `(${r.titleEn})`,
          }))}
        />
      )}
    </main>
  )
}

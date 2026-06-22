import { notFound } from 'next/navigation'
import { getConceptBySlug, getAllConceptSlugs } from '@/lib/queries'
import PortableTextBody from '@/components/PortableTextBody'
import ArticleTitle from '@/components/ArticleTitle'
import RelatedList from '@/components/RelatedList'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getAllConceptSlugs()
  return slugs.map((s) => ({ slug: s.slug }))
}

export default async function ConceptPage({ params }: Props) {
  const { slug } = await params
  const concept = await getConceptBySlug(slug)

  if (!concept) notFound()

  return (
    <main>
      <ArticleTitle title={concept.title} titleEn={concept.titleEn} summary={concept.summary} />
      <PortableTextBody value={concept.body} />

      {concept.related && concept.related.length > 0 && (
        <RelatedList
          title="연관 항목"
          items={concept.related.map((r) => ({
            href: `/${r._type}/${r.slug}`,
            label: r.title,
            meta: r.titleEn && `(${r.titleEn})`,
          }))}
        />
      )}
    </main>
  )
}

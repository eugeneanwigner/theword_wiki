import Link from 'next/link'

export default function RelatedList({
  title,
  items,
}: {
  title: string
  items: { href: string; label: string; meta?: string }[]
}) {
  return (
    <section className="mt-8 border-t border-wiki-border pt-3">
      <h2 className="wiki-heading text-lg font-bold text-wiki-text mb-2">{title}</h2>
      <ul className="list-disc pl-6">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
            {item.meta && <span className="text-wiki-muted"> {item.meta}</span>}
          </li>
        ))}
      </ul>
    </section>
  )
}

import Link from 'next/link'

export default function SiteHeader() {
  return (
    <header className="border-b border-wiki-border bg-white">
      <div className="mx-auto max-w-3xl px-4 py-3">
        <Link href="/" className="wiki-heading text-2xl italic text-wiki-text hover:no-underline">
          Codex Wiki
        </Link>
      </div>
    </header>
  )
}

'use client'

import { PortableText, type PortableTextComponents } from '@portabletext/react'

const components: PortableTextComponents = {
  marks: {
    term: ({ children, value }) => (
      <span title={value?.tip} className="cursor-help border-b border-dotted border-wiki-muted">
        {children}
      </span>
    ),
    internalLink: ({ children }) => <span>{children}</span>,
  },
}

export default function PortableTextBody({ value }: { value: unknown }) {
  if (!value) return null
  return (
    <div className="wiki-article">
      <PortableText value={value as never} components={components} />
    </div>
  )
}

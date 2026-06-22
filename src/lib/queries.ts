import { client } from './sanity'

// ─── 목록 쿼리 (홈) ───────────────────────────────────────────

export async function getConcepts() {
  return client.fetch<ConceptListItem[]>(
    `*[_type == "concept" && draft != true] | order(order asc) {
      _id, title, titleEn, "slug": slug.current, summary
    }`
  )
}

export async function getRounds() {
  return client.fetch<RoundListItem[]>(
    `*[_type == "round" && draft != true] | order(number asc) {
      _id, number, title, titleEn, dimension, summary
    }`
  )
}

export async function getItems() {
  return client.fetch<ItemListItem[]>(
    `*[_type == "item" && draft != true] {
      _id, title, titleEn, "slug": slug.current, grade
    }`
  )
}

// ─── 상세 쿼리 ────────────────────────────────────────────────

export async function getConceptBySlug(slug: string) {
  return client.fetch<ConceptDetail | null>(
    `*[_type == "concept" && slug.current == $slug && draft != true][0] {
      _id, title, titleEn, summary, order,
      body,
      related[]-> { _type, _id, title, "slug": slug.current, titleEn }
    }`,
    { slug }
  )
}

export async function getRoundByNumber(number: number) {
  return client.fetch<RoundDetail | null>(
    `*[_type == "round" && number == $number && draft != true][0] {
      _id, number, title, titleEn, dimension, summary,
      unlockHint, fourthDimHint,
      body,
      items[]-> { _id, title, "slug": slug.current, grade }
    }`,
    { number }
  )
}

export async function getItemBySlug(slug: string) {
  return client.fetch<ItemDetail | null>(
    `*[_type == "item" && slug.current == $slug && draft != true][0] {
      _id, title, titleEn, "slug": slug.current,
      grade, origin, effect, skill,
      body
    }`,
    { slug }
  )
}

export async function getEntityBySlug(slug: string) {
  return client.fetch<EntityDetail | null>(
    `*[_type == "entity" && slug.current == $slug && draft != true][0] {
      _id, title, titleEn, "slug": slug.current,
      kind, dimensionLevel, status, summary,
      body,
      related[]-> { _type, _id, title, "slug": slug.current, titleEn }
    }`,
    { slug }
  )
}

// ─── generateStaticParams용 ────────────────────────────────────

export async function getAllConceptSlugs() {
  return client.fetch<{ slug: string }[]>(
    `*[_type == "concept" && draft != true && defined(slug.current)] { "slug": slug.current }`
  )
}

export async function getAllRoundNumbers() {
  return client.fetch<{ number: number }[]>(
    `*[_type == "round" && draft != true] { number }`
  )
}

export async function getAllItemSlugs() {
  return client.fetch<{ slug: string }[]>(
    `*[_type == "item" && draft != true && defined(slug.current)] { "slug": slug.current }`
  )
}

export async function getAllEntitySlugs() {
  return client.fetch<{ slug: string }[]>(
    `*[_type == "entity" && draft != true && defined(slug.current)] { "slug": slug.current }`
  )
}

// ─── 타입 ─────────────────────────────────────────────────────

export type ConceptListItem = {
  _id: string
  title: string
  titleEn?: string
  slug: string
  summary?: string
}

export type RoundListItem = {
  _id: string
  number: number
  title: string
  titleEn?: string
  dimension?: string
  summary?: string
}

export type ItemListItem = {
  _id: string
  title: string
  titleEn?: string
  slug: string
  grade?: string
}

export type RelatedItem = {
  _type: string
  _id: string
  title: string
  slug: string
  titleEn?: string
}

export type ConceptDetail = ConceptListItem & {
  order?: number
  body?: unknown
  related?: RelatedItem[]
}

export type RoundDetail = RoundListItem & {
  unlockHint?: string
  fourthDimHint?: string
  body?: unknown
  items?: { _id: string; title: string; slug: string; grade?: string }[]
}

export type ItemDetail = ItemListItem & {
  origin?: string
  effect?: string
  skill?: string
  body?: unknown
}

export type EntityDetail = {
  _id: string
  title: string
  titleEn?: string
  slug: string
  kind?: string
  dimensionLevel?: string
  status?: string
  summary?: string
  body?: unknown
  related?: RelatedItem[]
}

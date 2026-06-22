import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '4bzrr98e',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

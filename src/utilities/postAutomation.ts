import type { Payload, RequiredDataFromCollectionSlug } from 'payload'

type PostStatus = 'draft' | 'published'
type BoundaryType = 'suitable' | 'unsuitable'

export type PostAutomationData = {
  title: string
  slug: string
  content: string
  status: PostStatus
  categories: string[]
  authors: string[]
  heroImage?: string
  meta?: {
    title?: string
    description?: string
    image?: string
  }
  tldr?: string
  atomicFAQs?: {
    question: string
    answer: string
  }[]
  decisionFramework?: string
  boundaries?: {
    condition: string
    type: BoundaryType
  }[]
  publishedAt?: string
  updateIfExists: boolean
}

export class PostAutomationError extends Error {
  status: number

  constructor(message: string, status = 400) {
    super(message)
    this.name = 'PostAutomationError'
    this.status = status
  }
}

const MAX_TITLE_LENGTH = 180
const MAX_SLUG_LENGTH = 120
const MAX_CONTENT_LENGTH = 300_000
const MAX_META_TITLE_LENGTH = 180
const MAX_META_DESCRIPTION_LENGTH = 320
const MAX_REFERENCE_COUNT = 20
const MAX_REFERENCE_LENGTH = 120
const MAX_FAQ_COUNT = 20
const MAX_FAQ_QUESTION_LENGTH = 240
const MAX_FAQ_ANSWER_LENGTH = 1_500
const MAX_TLDR_LENGTH = 160
const MAX_BOUNDARY_COUNT = 20
const MAX_BOUNDARY_LENGTH = 240

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value)

const readOptionalString = (
  value: unknown,
  fieldName: string,
  maxLength: number,
): string | undefined => {
  if (value === undefined || value === null || value === '') return undefined
  if (typeof value !== 'string') {
    throw new PostAutomationError(`${fieldName} must be a string`)
  }

  const trimmed = value.trim()
  if (!trimmed) return undefined
  if (trimmed.length > maxLength) {
    throw new PostAutomationError(`${fieldName} is too long`)
  }

  return trimmed
}

const readRequiredString = (value: unknown, fieldName: string, maxLength: number) => {
  const result = readOptionalString(value, fieldName, maxLength)
  if (!result) {
    throw new PostAutomationError(`${fieldName} is required`)
  }
  return result
}

const readStringArray = (value: unknown, fieldName: string) => {
  if (value === undefined || value === null) return []
  if (!Array.isArray(value)) {
    throw new PostAutomationError(`${fieldName} must be an array`)
  }
  if (value.length > MAX_REFERENCE_COUNT) {
    throw new PostAutomationError(`${fieldName} has too many items`)
  }

  return value.map((item, index) =>
    readRequiredString(item, `${fieldName}[${index}]`, MAX_REFERENCE_LENGTH),
  )
}

const readStatus = (value: unknown): PostStatus => {
  if (value === undefined || value === null || value === '') return 'draft'
  if (value === 'draft' || value === 'published') return value
  throw new PostAutomationError('status must be draft or published')
}

const readPublishedAt = (value: unknown) => {
  const publishedAt = readOptionalString(value, 'publishedAt', 80)
  if (!publishedAt) return undefined
  if (Number.isNaN(Date.parse(publishedAt))) {
    throw new PostAutomationError('publishedAt must be an ISO date string')
  }
  return new Date(publishedAt).toISOString()
}

const readMeta = (value: unknown): PostAutomationData['meta'] => {
  if (value === undefined || value === null) return undefined
  if (!isRecord(value)) {
    throw new PostAutomationError('meta must be an object')
  }

  const meta = {
    title: readOptionalString(value.title, 'meta.title', MAX_META_TITLE_LENGTH),
    description: readOptionalString(
      value.description,
      'meta.description',
      MAX_META_DESCRIPTION_LENGTH,
    ),
    image: readOptionalString(value.image, 'meta.image', MAX_REFERENCE_LENGTH),
  }

  return meta.title || meta.description || meta.image ? meta : undefined
}

const readFAQs = (value: unknown): PostAutomationData['atomicFAQs'] => {
  if (value === undefined || value === null) return undefined
  if (!Array.isArray(value)) {
    throw new PostAutomationError('atomicFAQs must be an array')
  }
  if (value.length > MAX_FAQ_COUNT) {
    throw new PostAutomationError('atomicFAQs has too many items')
  }

  return value.map((item, index) => {
    if (!isRecord(item)) {
      throw new PostAutomationError(`atomicFAQs[${index}] must be an object`)
    }

    return {
      question: readRequiredString(
        item.question,
        `atomicFAQs[${index}].question`,
        MAX_FAQ_QUESTION_LENGTH,
      ),
      answer: readRequiredString(
        item.answer,
        `atomicFAQs[${index}].answer`,
        MAX_FAQ_ANSWER_LENGTH,
      ),
    }
  })
}

const readBoundaries = (value: unknown): PostAutomationData['boundaries'] => {
  if (value === undefined || value === null) return undefined
  if (!Array.isArray(value)) {
    throw new PostAutomationError('boundaries must be an array')
  }
  if (value.length > MAX_BOUNDARY_COUNT) {
    throw new PostAutomationError('boundaries has too many items')
  }

  return value.map((item, index) => {
    if (!isRecord(item)) {
      throw new PostAutomationError(`boundaries[${index}] must be an object`)
    }

    if (item.type !== 'suitable' && item.type !== 'unsuitable') {
      throw new PostAutomationError(`boundaries[${index}].type must be suitable or unsuitable`)
    }

    return {
      condition: readRequiredString(
        item.condition,
        `boundaries[${index}].condition`,
        MAX_BOUNDARY_LENGTH,
      ),
      type: item.type,
    }
  })
}

export const generatePostSlug = (title: string, explicitSlug?: string) => {
  const source = explicitSlug || title
  const slug = source
    .normalize('NFKD')
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, MAX_SLUG_LENGTH)

  return slug || `post-${Date.now()}`
}

export const parsePostAutomationInput = (input: unknown): PostAutomationData => {
  if (!isRecord(input)) {
    throw new PostAutomationError('JSON body must be an object')
  }

  const title = readRequiredString(input.title, 'title', MAX_TITLE_LENGTH)
  const explicitSlug = readOptionalString(input.slug, 'slug', MAX_SLUG_LENGTH)
  const content = readRequiredString(input.content, 'content', MAX_CONTENT_LENGTH)
  const status = readStatus(input.status)

  return {
    title,
    slug: generatePostSlug(title, explicitSlug),
    content,
    status,
    categories: readStringArray(input.categories, 'categories'),
    authors: readStringArray(input.authors, 'authors'),
    heroImage: readOptionalString(input.heroImage, 'heroImage', MAX_REFERENCE_LENGTH),
    meta: readMeta(input.meta),
    tldr: readOptionalString(input.tldr, 'tldr', MAX_TLDR_LENGTH),
    atomicFAQs: readFAQs(input.atomicFAQs),
    decisionFramework: readOptionalString(
      input.decisionFramework,
      'decisionFramework',
      MAX_CONTENT_LENGTH,
    ),
    boundaries: readBoundaries(input.boundaries),
    publishedAt: readPublishedAt(input.publishedAt),
    updateIfExists: input.updateIfExists === true,
  }
}

const textNode = (text: string, format = 0) => ({
  type: 'text',
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  text,
  version: 1,
})

const paragraphNode = (children: ReturnType<typeof textNode>[]) => ({
  type: 'paragraph',
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

const headingNode = (text: string, tag: 'h1' | 'h2' | 'h3' | 'h4') => ({
  type: 'heading',
  children: [textNode(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  tag,
  version: 1,
})

const listNode = (items: string[], ordered: boolean) => ({
  type: 'list',
  children: items.map((item, index) => ({
    type: 'listitem',
    children: inlineTextNodes(item),
    direction: 'ltr',
    format: '',
    indent: 0,
    value: index + 1,
    version: 1,
  })),
  direction: 'ltr',
  format: '',
  indent: 0,
  listType: ordered ? 'number' : 'bullet',
  start: 1,
  tag: ordered ? 'ol' : 'ul',
  version: 1,
})

const inlineTextNodes = (line: string) => {
  const parts = line.split(/\*\*(.+?)\*\*/g)
  const nodes = parts.flatMap((part, index) => {
    if (!part) return []
    return [textNode(part, index % 2 === 0 ? 0 : 1)]
  })

  return nodes.length > 0 ? nodes : [textNode('')]
}

export const markdownToLexical = (markdown: string) => {
  const children: unknown[] = []
  let listItems: string[] = []
  let listIsOrdered = false

  const flushList = () => {
    if (listItems.length === 0) return
    children.push(listNode(listItems, listIsOrdered))
    listItems = []
    listIsOrdered = false
  }

  for (const rawLine of markdown.split('\n')) {
    const line = rawLine.trim()

    if (!line) {
      flushList()
      continue
    }

    const unorderedMatch = line.match(/^[-*]\s+(.+)$/)
    const orderedMatch = line.match(/^\d+[.)]\s+(.+)$/)
    if (unorderedMatch || orderedMatch) {
      const isOrdered = Boolean(orderedMatch)
      if (listItems.length > 0 && listIsOrdered !== isOrdered) {
        flushList()
      }
      listIsOrdered = isOrdered
      listItems.push((unorderedMatch?.[1] || orderedMatch?.[1] || '').trim())
      continue
    }

    flushList()

    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/)
    if (headingMatch) {
      const level = headingMatch[1].length
      const tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4'
      children.push(headingNode(headingMatch[2].trim(), tag))
      continue
    }

    if (/^-{3,}$/.test(line)) {
      children.push({
        type: 'horizontalrule',
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })
      continue
    }

    children.push(paragraphNode(inlineTextNodes(line)))
  }

  flushList()

  return {
    root: {
      type: 'root',
      children: children.length > 0 ? children : [paragraphNode([textNode('')])],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

export const resolveCategoryIds = async (payload: Payload, categories: string[]) => {
  const ids: string[] = []

  for (const reference of categories) {
    const bySlug = await payload.find({
      collection: 'categories',
      where: {
        slug: {
          equals: reference,
        },
      },
      depth: 0,
      limit: 1,
    })

    if (bySlug.docs[0]) {
      ids.push(bySlug.docs[0].id)
      continue
    }

    const byId = await payload
      .findByID({
        collection: 'categories',
        id: reference,
        depth: 0,
      })
      .catch(() => null)

    if (!byId) {
      throw new PostAutomationError(`Unknown category: ${reference}`)
    }

    ids.push(byId.id)
  }

  return ids
}

export const buildPostData = (
  input: PostAutomationData,
  categoryIds: string[],
): RequiredDataFromCollectionSlug<'posts'> => {
  const data: Record<string, unknown> = {
    title: input.title,
    slug: input.slug,
    content: markdownToLexical(input.content),
    _status: input.status,
  }

  if (input.status === 'published') {
    data.publishedAt = input.publishedAt || new Date().toISOString()
  }
  if (categoryIds.length > 0) data.categories = categoryIds
  if (input.authors.length > 0) data.authors = input.authors
  if (input.heroImage) data.heroImage = input.heroImage
  if (input.meta) data.meta = input.meta
  if (input.tldr) data.tldr = input.tldr
  if (input.atomicFAQs?.length) data.atomicFAQs = input.atomicFAQs
  if (input.decisionFramework) {
    data.decisionFramework = markdownToLexical(input.decisionFramework)
  }
  if (input.boundaries?.length) data.boundaries = input.boundaries

  return data as RequiredDataFromCollectionSlug<'posts'>
}

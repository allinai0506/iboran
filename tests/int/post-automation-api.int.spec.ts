import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { NextRequest } from 'next/server'
import { getPayload, type Payload } from 'payload'

let payload: Payload
let postRoute: (req: NextRequest) => Promise<Response>

const createdPostIds: string[] = []
const createdCategoryIds: string[] = []

const makeRequest = (body: Record<string, unknown>, token?: string) =>
  new NextRequest('http://localhost/api/posts/automation', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  })

describe('post automation api', () => {
  beforeAll(async () => {
    process.env.POST_AUTOMATION_TOKEN = 'test-post-automation-token'
    process.env.SMTP_HOST = ''

    const { default: config } = await import('../../src/payload.config')
    payload = await getPayload({ config: await config })

    const route = await import('../../src/app/api/posts/automation/route')
    postRoute = route.POST
  })

  afterAll(async () => {
    for (const id of createdPostIds) {
      await payload.delete({ collection: 'posts', id }).catch(() => undefined)
    }

    for (const id of createdCategoryIds) {
      await payload.delete({ collection: 'categories', id }).catch(() => undefined)
    }
  })

  it('rejects requests without the automation bearer token', async () => {
    const response = await postRoute(
      makeRequest({
        title: 'Unauthorized Post',
        content: 'This should not be created.',
      }),
    )

    expect(response.status).toBe(401)
  })

  it('creates a published post from markdown content', async () => {
    const unique = Date.now()
    const category = await payload.create({
      collection: 'categories',
      data: {
        title: `Automation Test ${unique}`,
        slug: `automation-test-${unique}`,
      },
    })
    createdCategoryIds.push(category.id)

    const response = await postRoute(
      makeRequest(
        {
          title: `自动发文 API 测试 ${unique}`,
          slug: `automation-api-test-${unique}`,
          content: '## 开篇\n\n这是自动发布的正文。\n\n- 重点一\n- 重点二',
          status: 'published',
          categories: [category.slug],
          meta: {
            title: `自动发文 API 测试 ${unique}`,
            description: '自动发文 API 的集成测试描述。',
          },
          tldr: '自动发文 API 可以把 Markdown 内容发布成 Payload Posts。',
        },
        'test-post-automation-token',
      ),
    )

    expect(response.status).toBe(201)

    const body = await response.json()
    expect(body).toMatchObject({
      success: true,
      action: 'created',
      post: {
        slug: `automation-api-test-${unique}`,
        status: 'published',
        url: `/posts/automation-api-test-${unique}`,
      },
    })

    const createdPost = await payload.findByID({
      collection: 'posts',
      id: body.post.id,
    })
    createdPostIds.push(createdPost.id)

    expect(createdPost.title).toBe(`自动发文 API 测试 ${unique}`)
    expect(createdPost._status).toBe('published')
    expect(createdPost.publishedAt).toBeTruthy()
    expect(createdPost.content.root.children[0]).toMatchObject({
      type: 'heading',
      tag: 'h2',
    })
    const createdCategory = createdPost.categories?.[0]
    const createdCategoryId =
      typeof createdCategory === 'string' ? createdCategory : createdCategory?.id
    expect(createdCategoryId).toBe(category.id)
    expect(createdPost.meta?.description).toBe('自动发文 API 的集成测试描述。')
  })

  it('rejects unknown category slugs before creating a post', async () => {
    const unique = Date.now()
    const response = await postRoute(
      makeRequest(
        {
          title: `Unknown Category ${unique}`,
          slug: `unknown-category-${unique}`,
          content: 'This should fail before create.',
          categories: [`missing-category-${unique}`],
        },
        'test-post-automation-token',
      ),
    )

    expect(response.status).toBe(400)

    const body = await response.json()
    expect(body.error).toContain('Unknown category')

    const lookup = await payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: `unknown-category-${unique}`,
        },
      },
      limit: 1,
    })
    expect(lookup.totalDocs).toBe(0)
  })
})

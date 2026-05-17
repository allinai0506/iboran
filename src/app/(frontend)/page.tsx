import React from 'react'
import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { PaginatedDocs } from 'payload'
import type { Post } from '@/payload-types'
import { HomeContent } from './home.content'

export const metadata: Metadata = {
  title: '泊冉软件｜用友存量系统服务、U8/NC服务、YonSuite/BIP实施与行业数智化解决方案',
  description: '泊冉软件服务畅捷通T、U8、U9、U8C、NC 等用友存量系统客户，以 U8 和 NC 为主，提供系统运维、二次开发、报表优化、接口集成、数据治理、YonSuite / 用友BIP 实施交付和升级路径评估服务，帮助企业从当前系统稳定运行走向业务在线、数据驱动和智能运营。',
  keywords: '用友存量系统服务,用友U8服务,用友NC服务,YonSuite实施,用友BIP实施,用友系统集成,用友系统升级评估,用友实施服务,畅捷通T服务,用友U9服务,U8C服务,用友系统运维,用友二次开发,用友报表优化,用友接口集成,U8升级YonSuite,NC升级用友BIP',
  openGraph: {
    title: '泊冉软件｜用友存量系统服务、U8/NC服务、YonSuite/BIP实施与行业数智化解决方案',
    description: '服务畅捷通T、U8、U9、U8C、NC 等用友存量系统客户，提供系统运维、二次开发、报表优化、接口集成、数据治理、YonSuite / 用友BIP 实施交付和升级路径评估。',
    type: 'website',
    url: 'https://www.iboran.com/',
    siteName: '泊冉软件',
    locale: 'zh_CN',
  },
  alternates: {
    canonical: 'https://www.iboran.com/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      'name': '泊冉软件',
      'url': 'https://www.iboran.com/',
      'telephone': '400-9955-161',
      'logo': 'https://www.iboran.com/assets/boran-logo.png'
    },
    {
      '@type': 'Service',
      'name': '用友存量系统服务、U8/NC服务、YonSuite/BIP实施与行业数智化解决方案',
      'serviceType': [
        '畅捷通T服务',
        '用友U8服务',
        '用友U9服务',
        'U8C服务',
        '用友NC服务',
        '用友存量系统服务',
        '数据治理',
        'YonSuite实施',
        '用友BIP实施'
      ],
      'provider': {
        '@type': 'Organization',
        'name': '泊冉软件',
        'url': 'https://www.iboran.com/'
      },
      'areaServed': '中国'
    }
  ]
}

export default async function Page() {
    const payload = await getPayload({ config: configPromise })

    const [latestPosts, homeData] = await Promise.all([
      payload.find({
        collection: 'posts',
        limit: 3,
        sort: '-publishedAt',
      }),
      payload.findGlobal({ slug: 'home-config' }),
    ])

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HomeContent latestPosts={latestPosts.docs} homeData={homeData} />
        </>
    )
}

import { withPayload } from '@payloadcms/next/withPayload'


// Force restart
import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
  // 非 standalone 全量部署：排除所有 node_modules，nft 只扫描源码，
  // 避免 "Collecting build traces" 阶段 OOM（服务器内存受限）
  outputFileTracingExcludes: {
    '*': ['node_modules/**/*'],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })

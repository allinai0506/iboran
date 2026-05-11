
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="relative bg-[#0b1121] text-slate-400 border-t border-slate-800 pt-16 pb-10">
      <div className="container mx-auto px-5 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          {/* Brand & Description */}
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-heading font-black text-white tracking-tight">泊冉软件</div>
            </div>

            <p className="text-sm leading-relaxed text-slate-400">
              用友存量系统持续服务、YonSuite / 用友BIP 实施交付与行业数智化解决方案服务商
            </p>
          </div>

          {/* Simplified Navigation */}
          <nav className="flex flex-wrap gap-6 md:gap-12 text-sm font-medium" aria-label="页脚导航">
            <Link href="/services" className="text-slate-300 hover:text-white transition-colors">服务总览</Link>
            <Link href="/products/bip" className="text-slate-300 hover:text-white transition-colors">用友BIP</Link>
            <Link href="/products/yonsuite" className="text-slate-300 hover:text-white transition-colors">YonSuite</Link>
            <Link href="/about" className="text-slate-300 hover:text-white transition-colors">关于我们</Link>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[11px] font-mono font-medium text-slate-500 flex flex-col md:flex-row gap-2 md:gap-6 text-center md:text-left">
            <p>© 2026 上海泊冉软件有限公司 版权所有</p>
            <p className="hover:text-slate-300 transition-colors cursor-pointer">沪ICP备13039056号</p>
          </div>
          <div className="flex gap-4 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">隐私政策</Link>
            <span className="text-slate-700">|</span>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">服务条款</Link>
            <span className="text-slate-700">|</span>
            <Link href="/sitemap" className="hover:text-slate-300 transition-colors">网站地图</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

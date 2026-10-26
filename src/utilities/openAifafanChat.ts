/**
 * 唤起爱番番在线咨询。
 *
 * 背景（2026-10-26 修复）：
 * - 移动端（≤1023px）globals.css 会把爱番番自动注入的入口（.embed-icon / .embed-toolbar-btn）
 *   隐藏，避免遮挡页面自带底部栏。被隐藏的元素虽然仍能被 querySelector 找到，
 *   但对它 click() 不会产生可见反馈，导致「在线咨询」点了没反应。
 * - 微信/夸克等拦截百度统计脚本的浏览器里，爱番番 SDK 根本不加载，
 *   此时任何页内入口都不存在，必须直跳聊天页。
 *
 * 策略：
 * 1. 只点击「可见」的页内入口（桌面端 SDK 浮球/通栏，保留原有体验）；
 * 2. 没有可见入口时兜底跳转爱番番聊天页：
 *    - 移动端：同标签跳转（微信/百度App 等内置 WebView 常拦截 window.open，同标签一定生效）；
 *    - 桌面端：优先新标签打开，被拦截则同标签跳转。
 */
const AIFAFAN_SITE_PATH = 'unique_52771578'
const AIFAFAN_QUERY = 'siteToken=aac20df95e015006d1b11e4bd6e64a83&siteId=22949567&userId=52771578'

/** 桌面端聊天页 */
const AIFAFAN_CHAT_URL = `https://affim.baidu.com/${AIFAFAN_SITE_PATH}/chat?${AIFAFAN_QUERY}`
/** 移动端聊天页直链，省掉一次按 UA 的跳转 */
const AIFAFAN_MOBILE_CHAT_URL = `https://affim.baidu.com/${AIFAFAN_SITE_PATH}/mobile/chat?${AIFAFAN_QUERY}`

const AIFAFAN_WIDGET_SELECTORS = [
  // 新版爱番番 SDK（mobile-affim.js / aff-im-root）入口
  '.embed-icon',
  '.embed-toolbar .embed-toolbar-btn',
  // 旧版商桥/离线宝入口
  '#nb_icon_wrap',
  '.nb-icon-inner-wrap',
  '#lxb-container-icon',
  '.lxb-container',
  '#nb_invite_ok',
  '.nb-invite-ok',
]

const MOBILE_QUERY = '(max-width: 1023px)'

/** 元素是否真的可见：display:none / visibility:hidden / 零尺寸的入口一律跳过 */
const isVisible = (element: HTMLElement): boolean => {
  if (typeof window === 'undefined') return false
  const style = window.getComputedStyle(element)
  if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false
  const rect = element.getBoundingClientRect()
  return rect.width > 0 && rect.height > 0
}

const gotoChatPage = (url: string) => {
  if (typeof window === 'undefined') return
  window.location.href = url
}

export const openAifafanChat = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  const isMobile = window.matchMedia(MOBILE_QUERY).matches

  // 1) 点击当前真正可见的页内入口
  for (const selector of AIFAFAN_WIDGET_SELECTORS) {
    const element = document.querySelector(selector)
    if (element instanceof HTMLElement && isVisible(element)) {
      element.click()
      return
    }
  }

  // 2) 没有可用入口时兜底跳转
  if (isMobile) {
    // 内置 WebView 常拦截新开窗口，移动端一律同标签跳转，保证点击一定有反馈
    gotoChatPage(AIFAFAN_MOBILE_CHAT_URL)
    return
  }

  const popup = window.open(AIFAFAN_CHAT_URL, '_blank', 'noopener,noreferrer')
  if (!popup) {
    gotoChatPage(AIFAFAN_CHAT_URL)
  }
}

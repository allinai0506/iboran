'use client'

/**
 * 线索表单（原「两步表单」，2026-10-27 简化为单步）
 *
 * 简化原因：移动端底部栏「预约专家评估」弹出后，第一步要填姓名/公司/手机，
 * 点「下一步」后还要再填邮箱/角色/当前系统/备注共 4 项，第二步字段比第一步还多，
 * 用户感知是"步骤太多"。现改为一屏填完：姓名 / 公司 / 手机 / 需求类型。
 *
 * 后端约束（/api/leads）：name、company、phone 必填，手机需满足 ^1[3-9]\d{9}$；
 * message/remark 会写入线索的「补充说明」，因此需求类型复用 message 字段传递。
 */

import React, { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => Promise<void>
  source?: string
  submitLabel?: string
}

interface LeadFormData {
  name: string
  company: string
  phone: string
  intent?: string
  message?: string
  email?: string
  role?: string
  currentSystem?: string
  source?: string
}

const INTENT_OPTIONS = [
  '当前系统运维与优化',
  '系统升级评估（U8 / NC 等）',
  '新平台实施（YonSuite / BIP）',
  '系统集成与二次开发',
  '其他',
]

export const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, source, submitLabel = '提交预约' }) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>()

  const onFormSubmit = async (data: LeadFormData) => {
    setIsLoading(true)
    setError(null)
    try {
      // 需求类型写入 message，后端会作为「补充说明」进入线索记录与通知邮件
      const message = data.intent ? `需求类型：${data.intent}` : data.message
      await onSubmit({
        name: data.name,
        company: data.company,
        phone: data.phone,
        message,
        source,
      })
      if (window._agl) {
        window._agl.push(['track', ['success', { t: 3 }]])
      }
      window.uet_report_conversion?.()
      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : '提交失败，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return <SuccessState onClose={() => setIsSuccess(false)} />
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1F2329] mb-1.5">
              姓名 <span className="text-[#E60012]">*</span>
            </label>
            <input
              {...register('name', { required: '请输入姓名' })}
              type="text"
              placeholder="您的姓名"
              className={`w-full px-4 py-2.5 border rounded-lg text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-[#0052D9]/20 ${
                errors.name ? 'border-red-300' : 'border-slate-200'
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1F2329] mb-1.5">
              公司名称 <span className="text-[#E60012]">*</span>
            </label>
            <input
              {...register('company', { required: '请输入公司名称' })}
              type="text"
              placeholder="您的公司"
              className={`w-full px-4 py-2.5 border rounded-lg text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-[#0052D9]/20 ${
                errors.company ? 'border-red-300' : 'border-slate-200'
              }`}
            />
            {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1F2329] mb-1.5">
            手机号 <span className="text-[#E60012]">*</span>
          </label>
          <input
            {...register('phone', {
              required: '请输入手机号',
              pattern: { value: /^1[3-9]\d{9}$/, message: '请输入有效手机号' },
            })}
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="您的手机号"
            className={`w-full px-4 py-2.5 border rounded-lg text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-[#0052D9]/20 ${
              errors.phone ? 'border-red-300' : 'border-slate-200'
            }`}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1F2329] mb-1.5">
            您想先解决什么 <span className="text-[#E60012]">*</span>
          </label>
          <select
            {...register('intent', { required: '请选择需求类型' })}
            className={`w-full px-4 py-2.5 border rounded-lg text-base md:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0052D9]/20 ${
              errors.intent ? 'border-red-300' : 'border-slate-200'
            }`}
          >
            <option value="">请选择</option>
            {INTENT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.intent && <p className="mt-1 text-sm text-red-500">{errors.intent.message}</p>}
        </div>

        {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-[#E60012] hover:bg-red-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : submitLabel}
        </button>

        <p className="text-xs text-slate-400 text-center">我们只用于本次沟通，不会向第三方共享您的信息</p>
      </motion.div>
    </form>
  )
}

/** 兼容旧引用：名称已改为 LeadForm，保留别名避免遗漏的 import 导致构建失败 */
export const TwoStepLeadForm = LeadForm

const SuccessState: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="text-center py-8">
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <CheckCircle2 className="w-8 h-8 text-green-600" />
    </div>
    <h3 className="text-xl font-bold text-[#1F2329] mb-3">预约提交成功！</h3>
    <p className="text-slate-600 mb-6">
      我们的项目顾问将在 <strong className="text-[#E60012]">1 个工作日内</strong>与您联系
    </p>

    <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left">
      <p className="text-sm font-medium text-[#1F2329] mb-3">等待期间您可以：</p>
      <ul className="space-y-2 text-sm text-slate-600">
        <li className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <Link href="/cases" className="hover:text-[#0052D9]">
            查看同行业成功案例
          </Link>
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <Link href="/solution" className="hover:text-[#0052D9]">
            了解详细的解决方案
          </Link>
        </li>
      </ul>
    </div>

    <button onClick={onClose} className="w-full py-3 bg-[#0052D9] text-white rounded-lg font-medium hover:bg-blue-700">
      关闭
    </button>
  </div>
)

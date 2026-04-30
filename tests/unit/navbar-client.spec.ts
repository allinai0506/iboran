import React from 'react'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { NavbarClient } from '../../src/components/Navbar/NavbarClient'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

const menuItems = [
  {
    label: '解决方案',
    href: '/solution',
    hasDropdown: true,
    isMegaMenu: true,
  },
  {
    label: '核心产品',
    href: '/products',
    hasDropdown: true,
    isMegaMenu: true,
  },
  { label: '客户案例', href: '/cases' },
]

afterEach(cleanup)

describe('NavbarClient desktop dropdown triggers', () => {
  it('does not open the solution mega menu on hover', () => {
    render(React.createElement(NavbarClient, { menuItems, onOpenDemo: () => {} }))

    fireEvent.mouseEnter(screen.getByRole('button', { name: /解决方案/ }))

    expect(screen.queryByText(/查看全部解决方案/)).toBeNull()
  })

  it('opens the solution mega menu on click', async () => {
    render(React.createElement(NavbarClient, { menuItems, onOpenDemo: () => {} }))

    fireEvent.click(screen.getByRole('button', { name: /解决方案/ }))

    await waitFor(() => {
      expect(screen.queryByText(/查看全部解决方案/)).not.toBeNull()
    })
  })
})

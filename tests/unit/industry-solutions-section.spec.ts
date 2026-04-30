import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { IndustrySolutionsSection } from '../../src/app/(frontend)/_sections/IndustrySolutionsSection'

afterEach(cleanup)

describe('IndustrySolutionsSection', () => {
  it('links industry solution cards to the industry detail route', () => {
    render(
      React.createElement(IndustrySolutionsSection, {
        solutions: [
          {
            id: 'industry-1',
            slug: 'semiconductor',
            title: 'Semiconductor solution',
            summary: 'Digital solution for semiconductor companies',
          },
        ] as any,
      }),
    )

    expect(document.querySelector('a[href="/solution/industry/semiconductor"]')).not.toBeNull()
    expect(document.querySelector('a[href="/solution/semiconductor"]')).toBeNull()
  })
})

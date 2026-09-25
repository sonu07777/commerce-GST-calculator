import { applyProportionalDiscount } from '../src'

describe('applyProportionalDiscount', () => {
  it('distributes discount proportionally across items', () => {
    const result = applyProportionalDiscount({
      items: [
        { amount: 1000 },
        { amount: 2000 },
        { amount: 3000 }
      ],
      discountAmount: 600
    })

    expect(result.totalDiscount).toBe(600)
    // Item A: 1000/6000 * 600 = 100
    expect(result.items[0].discount).toBe(100)
    // Item B: 2000/6000 * 600 = 200
    expect(result.items[1].discount).toBe(200)
    // Item C: 3000/6000 * 600 = 300
    expect(result.items[2].discount).toBe(300)
  })

  it('handles single item', () => {
    const result = applyProportionalDiscount({
      items: [
        { amount: 500 }
      ],
      discountAmount: 100
    })

    expect(result.totalDiscount).toBe(100)
    expect(result.items[0].discount).toBe(100)
  })

  it('handles zero discount', () => {
    const result = applyProportionalDiscount({
      items: [
        { amount: 1000 },
        { amount: 2000 }
      ],
      discountAmount: 0
    })

    expect(result.totalDiscount).toBe(0)
    expect(result.items[0].discount).toBe(0)
    expect(result.items[1].discount).toBe(0)
  })

  it('handles edge case where total item amount is 0', () => {
    expect(() =>
      applyProportionalDiscount({
        items: [
          { amount: 0 },
          { amount: 0 }
        ],
        discountAmount: 100
      })
    ).toThrow('Discount amount cannot exceed the total item amount')
  })
})
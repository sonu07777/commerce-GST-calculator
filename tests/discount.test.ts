import { applyDiscount } from '../src'

describe('applyDiscount - percentage', () => {
  it('applies percentage discount', () => {
    const result = applyDiscount({
      amount: 1000,
      type: 'percentage',
      value: 10
    })

    expect(result.originalAmount).toBe(1000)
    expect(result.discountAmount).toBe(100)
    expect(result.finalAmount).toBe(900)
  })

  it('applies 50% discount', () => {
    const result = applyDiscount({
      amount: 1000,
      type: 'percentage',
      value: 50
    })

    expect(result.discountAmount).toBe(500)
    expect(result.finalAmount).toBe(500)
  })

  it('applies 100% discount', () => {
    const result = applyDiscount({
      amount: 1000,
      type: 'percentage',
      value: 100
    })

    expect(result.discountAmount).toBe(1000)
    expect(result.finalAmount).toBe(0)
  })

  it('applies 0% discount', () => {
    const result = applyDiscount({
      amount: 1000,
      type: 'percentage',
      value: 0
    })

    expect(result.discountAmount).toBe(0)
    expect(result.finalAmount).toBe(1000)
  })
})

describe('applyDiscount - fixed', () => {
  it('applies fixed discount', () => {
    const result = applyDiscount({
      amount: 1000,
      type: 'fixed',
      value: 150
    })

    expect(result.originalAmount).toBe(1000)
    expect(result.discountAmount).toBe(150)
    expect(result.finalAmount).toBe(850)
  })

  it('caps discount at amount when fixed > amount', () => {
    const result = applyDiscount({
      amount: 100,
      type: 'fixed',
      value: 150
    })

    expect(result.discountAmount).toBe(100)
    expect(result.finalAmount).toBe(0)
  })

  it('applies 0 fixed discount', () => {
    const result = applyDiscount({
      amount: 1000,
      type: 'fixed',
      value: 0
    })

    expect(result.discountAmount).toBe(0)
    expect(result.finalAmount).toBe(1000)
  })
})
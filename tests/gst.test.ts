import { calculateGST, calculateGSTSplit } from '../src'

describe('calculateGST', () => {
  it('calculates exclusive GST', () => {
    const result = calculateGST({
      amount: 1000,
      gstRate: 18,
      type: 'exclusive'
    })

    expect(result.baseAmount).toBe(1000)
    expect(result.gstAmount).toBe(180)
    expect(result.totalAmount).toBe(1180)
    expect(result.gstRate).toBe(18)
    expect(result.type).toBe('exclusive')
  })

  it('calculates inclusive GST', () => {
    const result = calculateGST({
      amount: 1180,
      gstRate: 18,
      type: 'inclusive'
    })

    expect(result.baseAmount).toBe(1000)
    expect(result.gstAmount).toBe(180)
    expect(result.totalAmount).toBe(1180)
    expect(result.gstRate).toBe(18)
    expect(result.type).toBe('inclusive')
  })

  it('calculates 5% GST inclusive', () => {
    const result = calculateGST({
      amount: 105,
      gstRate: 5,
      type: 'inclusive'
    })

    expect(result.baseAmount).toBe(100)
    expect(result.gstAmount).toBe(5)
    expect(result.totalAmount).toBe(105)
  })

  it('calculates 0% GST', () => {
    const result = calculateGST({
      amount: 100,
      gstRate: 0,
      type: 'exclusive'
    })

    expect(result.baseAmount).toBe(100)
    expect(result.gstAmount).toBe(0)
    expect(result.totalAmount).toBe(100)
  })

  it('throws on invalid GST rate', () => {
    expect(() =>
      calculateGST({
        amount: 100,
        gstRate: 150,
        type: 'exclusive'
      })
    ).toThrow('GST rate must be between 0 and 100')
  })

  it('throws on negative amount', () => {
    expect(() =>
      calculateGST({
        amount: -100,
        gstRate: 18,
        type: 'exclusive'
      })
    ).toThrow('Amount must be a finite non-negative number')
  })

  it('calculates decimal amounts', () => {
    const result = calculateGST({
      amount: 299.99,
      gstRate: 18,
      type: 'exclusive'
    })

    expect(result.baseAmount).toBe(299.99)
    expect(result.gstAmount).toBeCloseTo(53.998, 1)
    expect(result.totalAmount).toBeCloseTo(353.988, 1)
  })
})

describe('calculateGSTSplit', () => {
  it('splits 18% GST into CGST and SGST for intra-state', () => {
    const result = calculateGSTSplit({
      amount: 1000,
      gstRate: 18,
      transactionType: 'intra-state'
    })

    expect(result.cgst).toBe(9)
    expect(result.sgst).toBe(9)
    expect(result.totalGST).toBe(18)
    expect(result.igst).toBeUndefined()
  })

  it('uses IGST for inter-state', () => {
    const result = calculateGSTSplit({
      amount: 1000,
      gstRate: 18,
      transactionType: 'inter-state'
    })

    expect(result.igst).toBe(18)
    expect(result.cgst).toBeUndefined()
    expect(result.sgst).toBeUndefined()
    expect(result.totalGST).toBe(18)
  })

  it('handles 0% GST split', () => {
    const result = calculateGSTSplit({
      amount: 1000,
      gstRate: 0,
      transactionType: 'intra-state'
    })

    expect(result.cgst).toBe(0)
    expect(result.sgst).toBe(0)
    expect(result.totalGST).toBe(0)
  })
})
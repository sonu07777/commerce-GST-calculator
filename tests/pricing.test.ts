import { calculateMargin, calculateMarkup, calculateSellingPrice, calculatePercentage } from '../src'

describe('calculateMargin', () => {
  it('calculates margin', () => {
    const result = calculateMargin({
      costPrice: 500,
      sellingPrice: 750
    })

    expect(result.marginAmount).toBe(250)
    expect(result.marginPercentage).toBe(33.33)
  })

  it('handles different values', () => {
    const result = calculateMargin({
      costPrice: 100,
      sellingPrice: 150
    })

    expect(result.marginAmount).toBe(50)
    expect(result.marginPercentage).toBe(33.33)
  })
})

describe('calculateMarkup', () => {
  it('calculates markup', () => {
    const result = calculateMarkup({
      costPrice: 500,
      sellingPrice: 750
    })

    expect(result.markupAmount).toBe(250)
    expect(result.markupPercentage).toBe(50)
  })

  it('markup and margin differ in percentage calculation', () => {
    // Same cost and selling price, but markup % is on cost, margin % is on selling
    const markupResult = calculateMarkup({
      costPrice: 500,
      sellingPrice: 750
    })

    const marginResult = calculateMargin({
      costPrice: 500,
      sellingPrice: 750
    })

    // Both should have same amount (250), but different percentages
    expect(markupResult.markupPercentage).not.toBe(marginResult.marginPercentage)
  })
})

describe('calculateSellingPrice', () => {
  it('calculates selling price from cost and markup', () => {
    const result = calculateSellingPrice({
      costPrice: 500,
      markupPercentage: 20
    })

    expect(result.sellingPrice).toBe(600)
    expect(result.markupAmount).toBe(100)
  })

  it('handles zero markup', () => {
    const result = calculateSellingPrice({
      costPrice: 500,
      markupPercentage: 0
    })

    expect(result.sellingPrice).toBe(500)
    expect(result.markupAmount).toBe(0)
  })
})

describe('calculatePercentage', () => {
  it('calculates percentage of a value', () => {
    const result = calculatePercentage({
      base: 100,
      percentage: 15
    })

    expect(result.percentageValue).toBe(15)
    expect(result.result).toBe(15)
  })

  it('calculates 100% of a value', () => {
    const result = calculatePercentage({
      base: 200,
      percentage: 100
    })

    expect(result.result).toBe(200)
  })

  it('calculates 0% of a value', () => {
    const result = calculatePercentage({
      base: 200,
      percentage: 0
    })

    expect(result.result).toBe(0)
  })
})
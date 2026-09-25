import { calculateInvoice } from '../src'

describe('calculateInvoice', () => {
  it('calculates invoice with items and no discount', () => {
    const result = calculateInvoice({
      items: [
        {
          name: 'Haircut',
          price: 456,
          quantity: 1,
          gstRate: 18,
          gstType: 'exclusive'
        },
        {
          name: 'Facial',
          price: 399,
          quantity: 1,
          gstRate: 5,
          gstType: 'exclusive'
        }
      ]
    })

    expect(result.subtotal).toBe(855)
    expect(result.discount).toBe(0)
    expect(result.taxableAmount).toBe(855)
    expect(result.gstAmount).toBeGreaterThan(0)
    expect(result.totalAmount).toBeGreaterThan(855)
    expect(result.items).toHaveLength(2)
  })

  it('calculates invoice with fixed discount', () => {
    const result = calculateInvoice({
      items: [
        {
          name: 'Haircut',
          price: 456,
          quantity: 1,
          gstRate: 18,
          gstType: 'exclusive'
        },
        {
          name: 'Facial',
          price: 399,
          quantity: 1,
          gstRate: 5,
          gstType: 'exclusive'
        }
      ],
      discount: {
        type: 'fixed',
        value: 200
      }
    })

    expect(result.subtotal).toBe(855)
    expect(result.discount).toBe(200)
    expect(result.taxableAmount).toBe(655)
    expect(result.gstAmount).toBeCloseTo(78.16, 2)
    expect(result.totalAmount).toBeCloseTo(733.16, 2)
    expect(result.items).toHaveLength(2)
  })

  it('calculates invoice with percentage discount', () => {
    const result = calculateInvoice({
      items: [
        {
          name: 'Haircut',
          price: 456,
          quantity: 1,
          gstRate: 18,
          gstType: 'exclusive'
        },
        {
          name: 'Facial',
          price: 399,
          quantity: 1,
          gstRate: 5,
          gstType: 'exclusive'
        }
      ],
      discount: {
        type: 'percentage',
        value: 10
      }
    })

    expect(result.subtotal).toBe(855)
    expect(result.discount).toBeCloseTo(85.5, 1)
    expect(result.taxableAmount).toBeCloseTo(769.5, 1)
    expect(result.gstAmount).toBeGreaterThan(0)
    expect(result.totalAmount).toBeGreaterThan(0)
  })

  it('has correct item-level calculations', () => {
    const result = calculateInvoice({
      items: [
        {
          name: 'Haircut',
          price: 456,
          quantity: 1,
          gstRate: 18,
          gstType: 'exclusive'
        }
      ]
    })

    expect(result.items[0].name).toBe('Haircut')
    expect(result.items[0].price).toBe(456)
    expect(result.items[0].quantity).toBe(1)
    expect(result.items[0].gstAmount).toBeGreaterThan(0)
    expect(result.items[0].total).toBeGreaterThan(456)
  })
})
import {
  InvoiceInput,
  InvoiceOutput,
  InvoiceOutputItem,
} from '../types'
import { applyDiscount, applyProportionalDiscount } from '../discount'
import { calculateGST } from '../gst'
import { assertArray, assertNonNegativeNumber, assertRate } from '../utils/validate'
import { roundMoney } from '../utils/roundMoney'

/**
 * Calculate an invoice with item-level pricing, discounts and GST.
 *
 * Invoice-level discounts are allocated proportionally across item bases,
 * then each discounted item is taxed at its own GST rate.
 */
export function calculateInvoice(input: InvoiceInput): InvoiceOutput {
  assertArray(input.items, 'Items must be an array')

  for (const item of input.items) {
    assertNonNegativeNumber(item.price, 'Item price must be a finite non-negative number')
    assertNonNegativeNumber(item.quantity, 'Item quantity must be a finite non-negative number')
    assertRate(item.gstRate, 'Item GST rate must be between 0 and 100')
  }

  const itemBases = input.items.map((item) => {
    return roundMoney(item.price * item.quantity)
  })

  const subtotal = roundMoney(itemBases.reduce((sum, amount) => sum + amount, 0))
  let discountAmount = 0

  if (input.discount) {
    const discountResult = applyDiscount({
      amount: subtotal,
      type: input.discount.type,
      value: input.discount.value,
    })
    discountAmount = discountResult.discountAmount
  }

  const allocatedDiscounts = applyProportionalDiscount({
    items: itemBases.map((amount) => ({ amount })),
    discountAmount,
  }).items.map((item) => item.discount)

  const outputItems: InvoiceOutputItem[] = input.items.map((item, index) => {
    const itemBase = itemBases[index]
    const allocatedDiscount = allocatedDiscounts[index]
    const discountedAmount = roundMoney(itemBase - allocatedDiscount)
    const gstResult = calculateGST({
      amount: discountedAmount,
      gstRate: item.gstRate,
      type: item.gstType,
    })

    return {
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      gstAmount: gstResult.gstAmount,
      total: roundMoney(gstResult.baseAmount + gstResult.gstAmount),
    }
  })

  const taxableAmount = roundMoney(
    outputItems.reduce((sum, item) => sum + item.total - item.gstAmount, 0),
  )
  const gstAmount = roundMoney(
    outputItems.reduce((sum, item) => sum + item.gstAmount, 0),
  )
  const totalAmount = roundMoney(taxableAmount + gstAmount)

  return {
    subtotal,
    discount: discountAmount,
    taxableAmount,
    gstAmount,
    totalAmount,
    items: outputItems,
  }
}

import { DiscountInput, DiscountOutput } from '../types'
import { assertNonNegativeNumber, assertRate } from '../utils/validate'
import { roundMoney } from '../utils/roundMoney'

/** Apply either a percentage discount or a fixed discount to an amount. */
export function applyDiscount(input: DiscountInput): DiscountOutput {
  const { amount, type, value } = input

  assertNonNegativeNumber(amount, 'Amount must be a finite non-negative number')
  assertNonNegativeNumber(value, 'Discount value must be a finite non-negative number')

  if (type !== 'percentage' && type !== 'fixed') {
    throw new Error('Discount type must be "percentage" or "fixed"')
  }

  if (type === 'percentage') {
    assertRate(value, 'Discount value must be between 0 and 100')
  }

  const discountAmount =
    type === 'percentage'
      ? roundMoney(amount * value / 100)
      : Math.min(roundMoney(value), amount)

  return {
    originalAmount: amount,
    discountAmount,
    finalAmount: roundMoney(amount - discountAmount),
  }
}

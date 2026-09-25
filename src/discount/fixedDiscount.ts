import { DiscountInput, DiscountOutput } from '../types'
import { applyDiscount } from './percentageDiscount'

/** Apply a fixed discount to an amount. */
export function applyFixedDiscount(input: DiscountInput): DiscountOutput {
  if (input.type !== 'fixed') {
    throw new Error('Discount type must be "fixed"')
  }

  return applyDiscount(input)
}

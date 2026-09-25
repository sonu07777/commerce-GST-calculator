import { GSTInput, GSTOutput } from '../types'
import { assertNonNegativeNumber, assertRate } from '../utils/validate'
import { roundMoney } from '../utils/roundMoney'

/**
 * Calculate GST for a given amount.
 *
 * Exclusive GST is added to the base amount. Inclusive GST is already
 * included in the supplied amount, so the base amount is extracted first.
 */
export function calculateGST(input: GSTInput): GSTOutput {
  const { amount, gstRate, type } = input

  assertNonNegativeNumber(amount, 'Amount must be a finite non-negative number')
  assertRate(gstRate, 'GST rate must be between 0 and 100')

  if (type !== 'inclusive' && type !== 'exclusive') {
    throw new Error('GST type must be "inclusive" or "exclusive"')
  }

  const baseAmount =
    type === 'exclusive' ? amount : roundMoney(amount / (1 + gstRate / 100))
  const gstAmount =
    type === 'exclusive'
      ? roundMoney((baseAmount * gstRate) / 100)
      : roundMoney(amount - baseAmount)
  const totalAmount = roundMoney(baseAmount + gstAmount)

  return {
    baseAmount,
    gstAmount,
    totalAmount,
    gstRate,
    type,
  }
}

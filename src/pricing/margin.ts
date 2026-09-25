import { MarginInput, MarginOutput } from '../types'
import { assertNonNegativeNumber } from '../utils/validate'
import { roundMoney } from '../utils/roundMoney'

/** Calculate margin between cost price and selling price. */
export function calculateMargin(input: MarginInput): MarginOutput {
  const { costPrice, sellingPrice } = input

  assertNonNegativeNumber(costPrice, 'Cost price must be a finite non-negative number')
  assertNonNegativeNumber(sellingPrice, 'Selling price must be a finite non-negative number')

  if (costPrice === 0 || sellingPrice === 0) {
    throw new Error('Cost price and selling price must be greater than zero')
  }

  const marginAmount = roundMoney(sellingPrice - costPrice)
  const marginPercentage =
    sellingPrice === 0
      ? 0
      : roundMoney((marginAmount / sellingPrice) * 100)

  return {
    marginAmount,
    marginPercentage,
  }
}

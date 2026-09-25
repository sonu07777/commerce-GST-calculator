import { MarkupInput, MarkupOutput } from '../types'
import { assertNonNegativeNumber } from '../utils/validate'
import { roundMoney } from '../utils/roundMoney'

/** Calculate markup between cost price and selling price. */
export function calculateMarkup(input: MarkupInput): MarkupOutput {
  const { costPrice, sellingPrice } = input

  assertNonNegativeNumber(costPrice, 'Cost price must be a finite non-negative number')
  assertNonNegativeNumber(sellingPrice, 'Selling price must be a finite non-negative number')

  if (costPrice === 0) {
    throw new Error('Cost price must be greater than zero')
  }

  const markupAmount = roundMoney(sellingPrice - costPrice)
  const markupPercentage = roundMoney((markupAmount / costPrice) * 100)

  return {
    markupAmount,
    markupPercentage,
  }
}

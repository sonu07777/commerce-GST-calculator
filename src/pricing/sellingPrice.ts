import { SellingPriceInput, SellingPriceOutput } from '../types'
import { assertNonNegativeNumber } from '../utils/validate'
import { roundMoney } from '../utils/roundMoney'

/** Calculate selling price from cost price and markup percentage. */
export function calculateSellingPrice(input: SellingPriceInput): SellingPriceOutput {
  const { costPrice, markupPercentage } = input

  assertNonNegativeNumber(costPrice, 'Cost price must be a finite non-negative number')
  assertNonNegativeNumber(
    markupPercentage,
    'Markup percentage must be a finite non-negative number',
  )

  const markupAmount = roundMoney((costPrice * markupPercentage) / 100)
  const sellingPrice = roundMoney(costPrice + markupAmount)

  return {
    sellingPrice,
    markupAmount,
  }
}

import { ProportionalDiscountInput, ProportionalDiscountOutput } from '../types'
import {
  assertArray,
  assertNonNegativeNumber,
} from '../utils/validate'
import { roundMoney } from '../utils/roundMoney'

/** Distribute a fixed discount proportionally across multiple item amounts. */
export function applyProportionalDiscount(input: ProportionalDiscountInput): ProportionalDiscountOutput {
  assertArray(input.items, 'Items must be an array')
  assertNonNegativeNumber(
    input.discountAmount,
    'Discount amount must be a finite non-negative number',
  )

  const itemCents = input.items.map((item) => {
    assertNonNegativeNumber(
      item.amount,
      'Item amount must be a finite non-negative number',
    )
    return Math.round(item.amount * 100)
  })
  const totalItemCents = itemCents.reduce((sum, amount) => sum + amount, 0)
  const discountCents = Math.round(input.discountAmount * 100)

  if (discountCents > totalItemCents) {
    throw new Error('Discount amount cannot exceed the total item amount')
  }

  const resultItems = itemCents.map((amount ) => ({
    amount: roundMoney(amount / 100),
    discountCents: Math.floor((amount * discountCents) / totalItemCents),
  }))

  let remainingCents =
    discountCents -
    resultItems.reduce((sum, item) => sum + item.discountCents, 0)

  for (let index = resultItems.length - 1; remainingCents > 0; index -= 1) {
    const addition = Math.min(1, remainingCents)
    resultItems[index].discountCents += addition
    remainingCents -= addition
  }

  return {
    items: resultItems.map((item) => ({
      amount: item.amount,
      discount: item.discountCents / 100,
    })),
    totalDiscount: discountCents / 100,
  }
}

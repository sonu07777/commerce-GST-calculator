import { PercentageInput, PercentageOutput } from '../types'
import { assertNonNegativeNumber } from '../utils/validate'
import { roundMoney } from '../utils/roundMoney'

/** Calculate a percentage of a base value. */
export function calculatePercentage(input: PercentageInput): PercentageOutput {
  const { base, percentage } = input

  assertNonNegativeNumber(base, 'Base must be a finite non-negative number')
  assertNonNegativeNumber(
    percentage,
    'Percentage must be a finite non-negative number',
  )

  return {
    percentageValue: roundMoney(percentage),
    result: roundMoney((base * percentage) / 100),
  }
}

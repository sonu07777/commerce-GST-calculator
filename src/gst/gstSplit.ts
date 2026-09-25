import { GSTSplitInput, GSTSplitOutput } from '../types'
import { assertNonNegativeNumber, assertRate } from '../utils/validate'
import { roundMoney } from '../utils/roundMoney'

/** Split GST into CGST and SGST for intra-state transactions, or IGST for inter-state transactions. */
export function calculateGSTSplit(input: GSTSplitInput): GSTSplitOutput {
  const { amount, gstRate, transactionType } = input

  assertNonNegativeNumber(amount, 'Amount must be a finite non-negative number')
  assertRate(gstRate, 'GST rate must be between 0 and 100')

  if (transactionType !== 'intra-state' && transactionType !== 'inter-state') {
    throw new Error('Transaction type must be "intra-state" or "inter-state"')
  }

  const totalGST = roundMoney(gstRate)

  if (transactionType === 'intra-state') {
    return {
      cgst: roundMoney(gstRate / 2),
      sgst: roundMoney(gstRate / 2),
      totalGST,
    }
  }

  return {
    igst: totalGST,
    totalGST,
  }
}

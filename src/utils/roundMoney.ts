/** Round a monetary value to the requested number of decimal places. */
export function roundMoney(value: number, digits = 2): number {
  if (!Number.isInteger(digits) || digits < 0 || digits > 20) {
    throw new Error('Decimal places must be an integer between 0 and 20')
  }

  if (!Number.isFinite(value)) {
    throw new Error('Value must be a finite number')
  }

  const factor = 10 ** digits
  const rounded = Math.round((Math.abs(value) + Number.EPSILON) * factor) / factor

  return rounded === 0 ? 0 : rounded * Math.sign(value)
}

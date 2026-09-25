export function assertArray(value: unknown, message: string): asserts value is unknown[] {
  if (!Array.isArray(value)) {
    throw new Error(message)
  }
}

export function assertFiniteNumber(value: number, message: string): void {
  if (!Number.isFinite(value)) {
    throw new Error(message)
  }
}

export function assertNonNegativeNumber(value: number, message: string): void {
  assertFiniteNumber(value, message)
  if (value < 0) {
    throw new Error(message)
  }
}

export function assertRate(value: number, message: string): void {
  assertFiniteNumber(value, message)
  if (value < 0 || value > 100) {
    throw new Error(message)
  }
}

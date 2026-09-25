# 🧮 Commerce Calculator

[![npm version](https://img.shields.io/npm/v/commerce-calculator.svg)](https://www.npmjs.com/package/@sonusahoo/commerce-calculator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-First-blue.svg)](https://www.typescriptlang.org/)

A TypeScript-first npm package for calculating **GST, discounts, invoices, pricing, CGST, SGST, and IGST** for Indian commerce applications.

A reliable, framework-independent calculation engine you can drop into:

- React / Next.js apps
- Node.js APIs (Express / NestJS)
- E-commerce, billing, POS & booking systems
- Invoice and SaaS applications

Instead of every app re-implementing GST math differently:

```ts
const gst = amount * 0.18; // ❌ error-prone, inconsistent
```

write:

```ts
import { calculateGST } from "@yourname/commerce-calculator";

const result = calculateGST({ amount: 1000, gstRate: 18, type: "exclusive" });
// { baseAmount: 1000, gstAmount: 180, totalAmount: 1180, gstRate: 18, type: "exclusive" }
```

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [GST Calculator](#gst-calculator)
- [Discounts](#discounts)
- [Invoices](#invoices)
- [CGST / SGST](#cgst--sgst)
- [IGST](#igst)
- [Pricing Utilities](#pricing-utilities)
- [API Reference](#api-reference)
- [Error Handling](#error-handling)
- [Precision](#precision)
- [Examples](#examples)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

```bash
npm install commerce-calculator
```

```bash
yarn add commerce-calculator
```

```bash
pnpm add commerce-calculator
```

Ships as **ESM + CommonJS** with full TypeScript declarations out of the box — no extra `@types` package needed.

---

## Quick Start

```ts
import { calculateGST, applyDiscount, calculateInvoice } from "commerce-calculator";

calculateGST({ amount: 1000, gstRate: 18, type: "exclusive" });
applyDiscount({ amount: 1000, type: "percentage", value: 10 });
```

---

## GST Calculator

Supports GST-inclusive and GST-exclusive pricing.

**Exclusive** — GST is added on top of the base amount:

```ts
calculateGST({ amount: 1000, gstRate: 18, type: "exclusive" });
// { baseAmount: 1000, gstAmount: 180, totalAmount: 1180 }
```

**Inclusive** — the base amount is extracted from a tax-inclusive total:

```ts
calculateGST({ amount: 1180, gstRate: 18, type: "inclusive" });
// { baseAmount: 1000, gstAmount: 180, totalAmount: 1180 }
```

| Formula (exclusive) | Formula (inclusive) |
|---|---|
| `GST = Base × Rate / 100` | `Base = Total × 100 / (100 + Rate)` |
| `Total = Base + GST` | `GST = Total − Base` |

---

## Discounts

**Percentage discount**

```ts
applyDiscount({ amount: 1000, type: "percentage", value: 10 });
// { originalAmount: 1000, discountAmount: 100, finalAmount: 900 }
```

**Fixed discount**

```ts
applyDiscount({ amount: 1000, type: "fixed", value: 150 });
// { originalAmount: 1000, discountAmount: 150, finalAmount: 850 }
```

**Proportional discount distribution** — splits a total discount across line items in proportion to their value:

```
Item A = ₹1,000   →   ₹100 discount
Item B = ₹2,000   →   ₹200 discount
Item C = ₹3,000   →   ₹300 discount
```

```ts
applyProportionalDiscount({ items, discountAmount: 600 });
```

---

## Invoices

Calculate a complete multi-item invoice, including per-item GST and an overall discount:

```ts
calculateInvoice({
  items: [
    { name: "Haircut", price: 456, quantity: 1, gstRate: 18, gstType: "exclusive" },
    { name: "Facial", price: 399, quantity: 1, gstRate: 5, gstType: "exclusive" },
  ],
  discount: { type: "fixed", value: 200 },
});
// {
//   subtotal: 855,
//   discount: 200,
//   taxableAmount: 655,
//   gstAmount: 78.16,
//   totalAmount: 733.16,
//   items: [...]
// }
```

---

## CGST / SGST

For **intra-state** transactions, GST is split evenly between CGST and SGST:

```ts
calculateGSTSplit({ amount: 1000, gstRate: 18, transactionType: "intra-state" });
// { cgst: 90, sgst: 90, totalGST: 180 }
```

## IGST

For **inter-state** transactions, the full GST is charged as IGST:

```ts
calculateGSTSplit({ amount: 1000, gstRate: 18, transactionType: "inter-state" });
// { igst: 180, totalGST: 180 }
```

---

## Pricing Utilities

```ts
calculateMargin({ costPrice: 500, sellingPrice: 750 });
// { marginAmount: 250, marginPercentage: 33.33 }
```

Also available: `calculateMarkup()`, `calculateSellingPrice()`, `calculateCostPrice()`, `calculatePercentage()`, `calculatePercentageDifference()`.

---

## API Reference

```ts
// GST
calculateGST(input: GSTInput): GSTResult;
calculateGSTSplit(input: GSTSplitInput): GSTSplitResult;

// Discounts
applyDiscount(input: DiscountInput): DiscountResult;
applyProportionalDiscount(input: ProportionalDiscountInput): ProportionalDiscountResult;

// Invoice
calculateInvoice(input: InvoiceInput): InvoiceResult;

// Pricing
calculateMargin(input: MarginInput): MarginResult;
calculateMarkup(input: MarkupInput): MarkupResult;
calculateSellingPrice(input: SellingPriceInput): SellingPriceResult;

// Utilities
roundMoney(value: number, precision?: number): number;
calculatePercentage(part: number, whole: number): number;
```

All functions take a **single, named-property object** rather than positional arguments — this keeps financial code explicit and safe to read at a glance:

```ts
// ✅ preferred
calculateGST({ amount: 1180, gstRate: 18, type: "inclusive" });

// ❌ avoided
calculateGST(1180, 18, true);
```

---

## Error Handling

Invalid input (negative amounts, GST rates outside `0–100`, malformed invoice items, etc.) throws a descriptive `Error` rather than silently returning `NaN` or incorrect totals — catch it at the call site:

```ts
try {
  calculateGST({ amount: -100, gstRate: 18, type: "exclusive" });
} catch (err) {
  console.error(err.message); // "amount must be a non-negative number"
}
```

## Precision

Money math is sensitive to floating-point rounding (`0.1 + 0.2 !== 0.3`). Every result passes through an internal `roundMoney()` utility so amounts are consistently rounded to 2 decimal places — you never have to round totals yourself.

---

## Examples

```ts
import { calculateInvoice } from "commerce-calculator";

const invoice = calculateInvoice({
  items: [
    { name: "Haircut", price: 456, quantity: 1, gstRate: 18, gstType: "exclusive" },
    { name: "Facial", price: 399, quantity: 1, gstRate: 5, gstType: "exclusive" },
  ],
  discount: { type: "fixed", value: 200 },
});

console.log(invoice);
```

More runnable examples live in [`examples/`](./examples).

---

## FAQ

**Does this depend on React, Vue, or any framework?**
No — the core package is framework-independent and runs anywhere JavaScript/TypeScript runs (browser, Node.js, edge runtimes).

**Does it handle floating-point rounding for me?**
Yes, all monetary results are rounded consistently via an internal precision utility.

**Can I use this outside of India?**
The GST/CGST/SGST/IGST helpers are specific to the Indian tax system, but `applyDiscount`, `calculateInvoice`'s non-tax logic, and the pricing utilities are generic and usable anywhere.

**Is it tree-shakeable?**
Yes — it's published as ESM + CommonJS with per-module exports.

---

## Contributing

Contributions are welcome!

1. Fork the repo and create a branch from `main`.
2. Run `npm install`.
3. Make your change and add tests in `tests/`.
4. Before opening a PR, make sure all checks pass:

   ```bash
   npm run lint
   npm run typecheck
   npm test
   npm run build
   ```
5. Open a pull request describing the change.

Please follow [Semantic Versioning](https://semver.org/) — bug fixes bump `PATCH`, backward-compatible features bump `MINOR`, breaking changes bump `MAJOR`.

## License

[MIT](./LICENSE)

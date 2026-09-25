# 🧮 Commerce Calculator

A TypeScript-first npm package for calculating **GST, discounts, invoices, pricing, CGST, SGST, and IGST** for Indian commerce applications.

The goal is to provide a reliable, framework-independent calculation engine that can be used in:

* React applications
* Next.js applications
* Node.js APIs
* Express / NestJS
* E-commerce applications
* Billing systems
* POS systems
* Booking systems
* Invoice applications
* SaaS applications

---

# 🚀 Project Goal

Build a production-ready npm package that makes financial calculations simple and consistent.

Instead of every application implementing GST and discount calculations differently:

```ts
const gst = amount * 0.18;
```

developers should be able to write:

```ts
import { calculateGST } from "@yourname/commerce-calculator";

const result = calculateGST({
  amount: 1000,
  gstRate: 18,
  type: "exclusive"
});

console.log(result);
```

Output:

```ts
{
  baseAmount: 1000,
  gstAmount: 180,
  totalAmount: 1180,
  gstRate: 18,
  type: "exclusive"
}
```

---

# 🎯 Main Features

## Phase 1

### GST Calculator

Support:

* GST inclusive pricing
* GST exclusive pricing
* GST amount calculation
* Base amount calculation
* Total amount calculation

Example:

```ts
calculateGST({
  amount: 1180,
  gstRate: 18,
  type: "inclusive"
});
```

Result:

```ts
{
  baseAmount: 1000,
  gstAmount: 180,
  totalAmount: 1180
}
```

---

# 💸 Discount Calculator

Support:

### Percentage discount

```ts
applyDiscount({
  amount: 1000,
  type: "percentage",
  value: 10
});
```

Result:

```ts
{
  originalAmount: 1000,
  discountAmount: 100,
  finalAmount: 900
}
```

### Fixed discount

```ts
applyDiscount({
  amount: 1000,
  type: "fixed",
  value: 150
});
```

Result:

```ts
{
  originalAmount: 1000,
  discountAmount: 150,
  finalAmount: 850
}
```

---

# 🧾 Invoice Calculator

Allow developers to calculate an entire invoice.

```ts
calculateInvoice({
  items: [
    {
      name: "Haircut",
      price: 456,
      quantity: 1,
      gstRate: 18,
      gstType: "exclusive"
    },
    {
      name: "Facial",
      price: 399,
      quantity: 1,
      gstRate: 5,
      gstType: "exclusive"
    }
  ],
  discount: {
    type: "fixed",
    value: 200
  }
});
```

Return:

```ts
{
  subtotal: 855,
  discount: 200,
  taxableAmount: 655,
  gstAmount: 78.16,
  totalAmount: 733.16,
  items: [...]
}
```

---

# 🇮🇳 GST Distribution

Support:

### CGST + SGST

For intra-state transactions:

```ts
calculateGSTSplit({
  amount: 1000,
  gstRate: 18,
  transactionType: "intra-state"
});
```

Result:

```ts
{
  cgst: 90,
  sgst: 90,
  totalGST: 180
}
```

### IGST

For inter-state transactions:

```ts
calculateGSTSplit({
  amount: 1000,
  gstRate: 18,
  transactionType: "inter-state"
});
```

Result:

```ts
{
  igst: 180,
  totalGST: 180
}
```

---

# 📊 Proportional Discount Distribution

This is an important feature for real-world billing systems.

Example:

```text
Item A = ₹1,000
Item B = ₹2,000
Item C = ₹3,000

Total = ₹6,000

Discount = ₹600
```

The package should distribute the discount proportionally:

```text
Item A → ₹100 discount
Item B → ₹200 discount
Item C → ₹300 discount
```

API:

```ts
applyProportionalDiscount({
  items,
  discountAmount: 600
});
```

---

# 🧮 Pricing Utilities

Later versions can support:

```ts
calculateMarkup()

calculateMargin()

calculateSellingPrice()

calculateCostPrice()

calculatePercentage()

calculatePercentageDifference()
```

Example:

```ts
calculateMargin({
  costPrice: 500,
  sellingPrice: 750
});
```

Result:

```ts
{
  marginAmount: 250,
  marginPercentage: 33.33
}
```

---

# 🏗️ Technology Stack

Use:

* TypeScript
* Node.js
* npm
* Vitest
* ESLint
* Prettier
* tsup
* GitHub Actions
* npm publishing

Optional later:

* Zod
* Changesets
* Storybook/demo application
* Docusaurus documentation

---

# 📁 Project Structure

Start with this structure:

```text
commerce-calculator/
│
├── src/
│   ├── gst/
│   │   ├── calculateGST.ts
│   │   ├── gstSplit.ts
│   │   └── index.ts
│   │
│   ├── discount/
│   │   ├── percentageDiscount.ts
│   │   ├── fixedDiscount.ts
│   │   ├── proportionalDiscount.ts
│   │   └── index.ts
│   │
│   ├── invoice/
│   │   ├── calculateInvoice.ts
│   │   └── index.ts
│   │
│   ├── pricing/
│   │   ├── margin.ts
│   │   ├── markup.ts
│   │   └── index.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   └── index.ts
│
├── tests/
│   ├── gst.test.ts
│   ├── discount.test.ts
│   ├── invoice.test.ts
│   └── pricing.test.ts
│
├── examples/
│   └── basic.ts
│
├── .github/
│   └── workflows/
│       └── test.yml
│
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── vitest.config.ts
├── eslint.config.js
├── .gitignore
├── LICENSE
└── README.md
```

---

# 🥇 STEP 1: Create the Project

Create the project:

```bash
mkdir commerce-calculator

cd commerce-calculator

npm init -y
```

Initialize TypeScript:

```bash
npm install -D typescript
```

Create:

```bash
npx tsc --init
```

---

# 🥈 STEP 2: Install Development Tools

Install the required packages:

```bash
npm install -D tsup vitest eslint prettier
```

Your development stack becomes:

```text
TypeScript
    ↓
tsup
    ↓
ESM + CommonJS
    ↓
npm package
```

---

# 🥉 STEP 3: Configure TypeScript

Create a clean `tsconfig.json`.

Important goals:

* strict mode
* declaration files
* modern JavaScript
* source maps

The package should generate:

```text
dist/
├── index.js
├── index.mjs
├── index.d.ts
└── ...
```

---

# STEP 4: Create the First GST Function

Start extremely small.

Create:

```text
src/gst/calculateGST.ts
```

Implement:

```ts
type GSTType = "inclusive" | "exclusive";

interface GSTInput {
  amount: number;
  gstRate: number;
  type: GSTType;
}
```

Then implement:

```ts
calculateGST()
```

### Exclusive GST

Formula:

```text
GST = Base × GST Rate / 100

Total = Base + GST
```

Example:

```text
Base = ₹1,000
GST = 18%

GST = ₹180

Total = ₹1,180
```

### Inclusive GST

Formula:

```text
Base = Total × 100 / (100 + GST Rate)

GST = Total - Base
```

Example:

```text
Total = ₹1,180
GST = 18%

Base = ₹1,000
GST = ₹180
```

---

# STEP 5: Handle Decimal Precision

Money calculations are sensitive to floating-point errors.

Avoid blindly doing:

```ts
0.1 + 0.2
```

and expecting:

```text
0.3
```

Create a utility:

```text
src/utils/roundMoney.ts
```

Example:

```ts
roundMoney(value, 2)
```

The package should consistently document how monetary precision is handled.

---

# STEP 6: Add Tests

Create:

```text
tests/gst.test.ts
```

Test:

```text
1000 + 18% exclusive
1180 with 18% inclusive
299 with 5% inclusive
0% GST
invalid GST rate
negative amount
decimal amounts
```

Example:

```ts
describe("calculateGST", () => {
  it("calculates exclusive GST", () => {
    const result = calculateGST({
      amount: 1000,
      gstRate: 18,
      type: "exclusive"
    });

    expect(result.baseAmount).toBe(1000);
    expect(result.gstAmount).toBe(180);
    expect(result.totalAmount).toBe(1180);
  });
});
```

Run:

```bash
npm test
```

---

# STEP 7: Build Discount Module

Create:

```text
src/discount/
```

Implement:

```ts
applyDiscount()
```

Support:

```text
percentage
fixed
```

Then implement:

```ts
applyProportionalDiscount()
```

This should distribute a fixed discount across multiple items based on their individual value.

---

# STEP 8: Build Invoice Engine

Now combine everything.

Architecture:

```text
                    Invoice
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
       Pricing      Discount       GST
          │            │            │
          └────────────┼────────────┘
                       ↓
                  Final Amount
```

The invoice engine should calculate:

```text
Subtotal
↓
Discount
↓
Taxable Amount
↓
GST
↓
Final Total
```

---

# STEP 9: Add CGST / SGST / IGST

Create:

```text
src/gst/gstSplit.ts
```

Support:

```ts
"intra-state"
"inter-state"
```

For 18% GST:

```text
Intra-state:

CGST = 9%
SGST = 9%

Total GST = 18%
```

Inter-state:

```text
IGST = 18%
```

---

# STEP 10: Create a Clean Public API

Do NOT make users import internal files:

```ts
import { calculateGST } from "./src/gst/calculateGST";
```

Instead expose:

```ts
import {
  calculateGST,
  applyDiscount,
  calculateInvoice
} from "@yourname/commerce-calculator";
```

Your main:

```text
src/index.ts
```

should export the public API.

---

# STEP 11: Build the Package

Use `tsup`.

Build:

```bash
npm run build
```

Expected output:

```text
dist/
├── index.js
├── index.mjs
├── index.d.ts
└── index.js.map
```

---

# STEP 12: Test the Package Locally

Before publishing to npm, create a test application.

For example:

```bash
mkdir test-app

cd test-app

npm init -y
```

Install your local package:

```bash
npm install ../
```

Then:

```ts
import {
  calculateGST
} from "@yourname/commerce-calculator";

console.log(
  calculateGST({
    amount: 1180,
    gstRate: 18,
    type: "inclusive"
  })
);
```

This confirms that the package actually works as an npm consumer would use it.

---

# STEP 13: Add Documentation

Your README should contain:

```text
Installation
Quick Start
GST
Discounts
Invoices
CGST / SGST
IGST
Pricing
API Reference
Error Handling
Precision
Examples
FAQ
Contributing
License
```

Make documentation a first-class feature.

A good npm package is not just code. It is an easy-to-understand contract.

---

# STEP 14: Add GitHub Actions

Create:

```text
.github/workflows/test.yml
```

Every push should automatically:

```text
Push
 ↓
Install dependencies
 ↓
TypeScript check
 ↓
Lint
 ↓
Run tests
 ↓
Build
```

This prevents broken code from reaching npm.

---

# STEP 15: Add Code Quality Rules

Add:

```text
ESLint
Prettier
TypeScript strict mode
Vitest
```

Before publishing:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

All four should pass.

---

# STEP 16: Semantic Versioning

Follow:

```text
MAJOR.MINOR.PATCH
```

Example:

```text
1.0.0
```

Bug fix:

```text
1.0.1
```

New backward-compatible feature:

```text
1.1.0
```

Breaking API change:

```text
2.0.0
```

Never casually break the public API.

---

# STEP 17: Publish to npm

Create an npm account.

Login:

```bash
npm login
```

Check package:

```bash
npm pack --dry-run
```

Publish:

```bash
npm publish
```

For a scoped package:

```bash
npm publish --access public
```

Then developers should be able to install:

```bash
npm install @yourname/commerce-calculator
```

---

# STEP 18: Create a Demo Website

After the core package works, create:

```text
apps/
└── demo/
```

Use:

```text
React
TypeScript
Tailwind
```

Build a simple calculator:

```text
┌─────────────────────────────────────┐
│       Commerce Calculator           │
├─────────────────────────────────────┤
│ Amount       ₹ 1180                 │
│ GST Rate     18%                    │
│ GST Type     Inclusive              │
│                                     │
│          Calculate                  │
├─────────────────────────────────────┤
│ Base Amount     ₹1000.00            │
│ GST             ₹180.00             │
│ Total           ₹1180.00            │
└─────────────────────────────────────┘
```

This gives your npm package a visual demonstration.

---

# 🗺️ Development Roadmap

## Version 0.1.0

Build the foundation:

* [ ] TypeScript setup
* [ ] Project structure
* [ ] GST inclusive
* [ ] GST exclusive
* [ ] Decimal handling
* [ ] Basic tests
* [ ] Build configuration

---

## Version 0.2.0

Discount engine:

* [ ] Percentage discount
* [ ] Fixed discount
* [ ] Proportional discount
* [ ] Discount tests

---

## Version 0.3.0

GST distribution:

* [ ] CGST
* [ ] SGST
* [ ] IGST
* [ ] Intra-state
* [ ] Inter-state

---

## Version 0.4.0

Invoice engine:

* [ ] Multiple items
* [ ] Quantity
* [ ] Item-level GST
* [ ] Invoice discount
* [ ] Taxable amount
* [ ] Final total

---

## Version 0.5.0

Pricing:

* [ ] Margin
* [ ] Markup
* [ ] Selling price
* [ ] Percentage calculations

---

## Version 1.0.0

Production release:

* [ ] 90%+ test coverage
* [ ] Complete documentation
* [ ] API reference
* [ ] GitHub Actions
* [ ] ESLint
* [ ] Prettier
* [ ] ESM support
* [ ] CommonJS support
* [ ] Type declarations
* [ ] Demo website
* [ ] npm publication
* [ ] Semantic versioning
* [ ] Changelog
* [ ] License

---

# 🧪 Testing Strategy

Test every financial operation with:

### Normal values

```text
100
1000
9999
```

### Decimal values

```text
299.99
999.95
1234.567
```

### GST

```text
0%
5%
12%
18%
28%
```

### Discounts

```text
0
10
100
999
```

### Edge cases

```text
0 amount
negative amount
negative GST
GST > 100%
discount greater than amount
empty invoice
zero quantity
```

Financial libraries live or die by edge cases. Treat them as citizens, not weeds.

---

# 🔐 Design Principles

The package should follow these principles:

## 1. Framework Independent

Do not depend on:

```text
React
Angular
Vue
Next.js
```

The core package should work everywhere JavaScript/TypeScript works.

---

## 2. TypeScript First

Everything should have proper types.

Avoid:

```ts
any
```

Prefer:

```ts
interface
type
generics
```

where appropriate.

---

## 3. Predictable Results

Given:

```ts
calculateGST(input)
```

the same input should always produce the same output.

Avoid hidden global state.

---

## 4. Explicit APIs

Prefer:

```ts
calculateGST({
  amount: 1180,
  gstRate: 18,
  type: "inclusive"
});
```

over:

```ts
calculateGST(1180, 18, true);
```

Named properties make financial code much safer to read.

---

# 📦 Final API

The final package could expose:

```ts
// GST
calculateGST();
calculateGSTSplit();

// Discounts
applyDiscount();
applyProportionalDiscount();

// Invoice
calculateInvoice();

// Pricing
calculateMargin();
calculateMarkup();
calculateSellingPrice();

// Utilities
roundMoney();
calculatePercentage();
```

---

# 💻 Example

```ts
import {
  calculateInvoice
} from "@yourname/commerce-calculator";

const invoice = calculateInvoice({
  items: [
    {
      name: "Haircut",
      price: 456,
      quantity: 1,
      gstRate: 18,
      gstType: "exclusive"
    },
    {
      name: "Facial",
      price: 399,
      quantity: 1,
      gstRate: 5,
      gstType: "exclusive"
    }
  ],
  discount: {
    type: "fixed",
    value: 200
  }
});

console.log(invoice);
```

---

# 🌟 Future Ideas

Once version 1.0 is stable, you can expand into:

```text
Recurring billing
EMI calculator
Loan calculator
Invoice PDF generation
Currency conversion
Tax reports
GST invoice generator
Round-off calculations
Payment settlement calculations
POS utilities
Subscription billing
```

But **do not build these initially**.

First make the core calculation engine excellent.

---

# 🏆 What Makes This a Strong Portfolio Project

This single project can demonstrate:

```text
TypeScript
        ↓
Library Design
        ↓
Functional Programming
        ↓
Financial Calculations
        ↓
Unit Testing
        ↓
Package Bundling
        ↓
ESM / CommonJS
        ↓
CI/CD
        ↓
GitHub
        ↓
npm
        ↓
Documentation
        ↓
Open Source
```

Instead of saying:

> "I know TypeScript."

You can show:

> "I designed, tested, built, documented and published a production-ready TypeScript npm package."

That's a much stronger story.

---

# 🎯 Your Exact Build Order

Do **not** try to build everything at once.

Follow this sequence:

```text
DAY 1
│
├── Create npm project
├── Configure TypeScript
├── Configure tsup
└── Configure Vitest
│
DAY 2
│
├── GST calculation
├── GST tests
└── Decimal handling
│
DAY 3
│
├── Percentage discount
├── Fixed discount
└── Discount tests
│
DAY 4
│
├── Proportional discount
├── CGST
├── SGST
└── IGST
│
DAY 5
│
├── Invoice engine
├── Multiple items
└── Invoice tests
│
DAY 6
│
├── ESLint
├── Prettier
├── GitHub Actions
└── Documentation
│
DAY 7
│
├── Demo React application
├── npm package testing
└── First npm release
```

---

# 🚀 Final Milestone

Your final repository should look like:

```text
commerce-calculator
│
├── src
├── tests
├── examples
├── demo
├── .github
├── README.md
├── CHANGELOG.md
├── LICENSE
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── vitest.config.ts
```

And your npm page should clearly communicate:

> **Commerce Calculator**
>
> A type-safe TypeScript financial calculation library for GST, discounts, invoices and pricing.

Start with **GST only**.

Get that part mathematically correct.

Then add discounts.

Then invoice calculation.

Then polish the package.

**Don't build a giant calculator. Build a tiny financial engine that developers trust.**

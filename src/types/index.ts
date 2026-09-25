/**
 * Core types for the Commerce Calculator package
 */

export interface GSTInput {
  amount: number
  gstRate: number
  type: 'inclusive' | 'exclusive'
}

export interface GSTOutput {
  baseAmount: number
  gstAmount: number
  totalAmount: number
  gstRate: number
  type: 'inclusive' | 'exclusive'
}

export interface GSTSplitInput {
  amount: number
  gstRate: number
  transactionType: 'intra-state' | 'inter-state'
}

export interface GSTSplitOutput {
  cgst?: number
  sgst?: number
  igst?: number
  totalGST: number
}

export interface DiscountInput {
  amount: number
  type: 'percentage' | 'fixed'
  value: number
}

export interface DiscountOutput {
  originalAmount: number
  discountAmount: number
  finalAmount: number
}

export interface ProportionalDiscountInput {
  items: Array<{ amount: number }>
  discountAmount: number
}

export interface ProportionalDiscountOutput {
  items: Array<{ amount: number; discount: number }>
  totalDiscount: number
}

export interface InvoiceItem {
  name: string
  price: number
  quantity: number
  gstRate: number
  gstType: 'inclusive' | 'exclusive'
}

export interface InvoiceInput {
  items: InvoiceItem[]
  discount?: {
    type: 'percentage' | 'fixed'
    value: number
  }
}

export interface InvoiceOutput {
  subtotal: number
  discount: number
  taxableAmount: number
  gstAmount: number
  totalAmount: number
  items: InvoiceOutputItem[]
}

export interface InvoiceOutputItem {
  name: string
  price: number
  quantity: number
  gstAmount: number
  total: number
}

export interface MarginInput {
  costPrice: number
  sellingPrice: number
}

export interface MarginOutput {
  marginAmount: number
  marginPercentage: number
}

export interface MarkupInput {
  costPrice: number
  sellingPrice: number
}

export interface MarkupOutput {
  markupAmount: number
  markupPercentage: number
}

export interface SellingPriceInput {
  costPrice: number
  markupPercentage: number
}

export interface SellingPriceOutput {
  sellingPrice: number
  markupAmount: number
}

export interface PercentageInput {
  base: number
  percentage: number
}

export interface PercentageOutput {
  percentageValue: number
  result: number
}
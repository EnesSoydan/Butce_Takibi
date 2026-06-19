export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
}

export const CATEGORIES = {
  income: ['Maaş', 'Freelance', 'Yatırım', 'Kira Geliri', 'Diğer'],
  expense: ['Yemek', 'Ulaşım', 'Kira', 'Faturalar', 'Eğlence', 'Sağlık', 'Giyim', 'Diğer'],
}

export function createTransaction({ type, amount, description, category, date }) {
  return {
    id: crypto.randomUUID(),
    type,
    amount: parseFloat(amount),
    description,
    category,
    date,
    createdAt: Date.now(),
  }
}

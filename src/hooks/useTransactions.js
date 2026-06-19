import { useState, useEffect } from 'react'
import { createTransaction } from '../interfaces/transaction'

const STORAGE_KEY = 'butce_islemleri'

function loadFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function useTransactions() {
  const [transactions, setTransactions] = useState(loadFromStorage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  }, [transactions])

  function addTransaction(data) {
    setTransactions(prev => [createTransaction(data), ...prev])
  }

  function updateTransaction(id, data) {
    setTransactions(prev =>
      prev.map(t => (t.id === id ? { ...t, ...data, amount: parseFloat(data.amount) } : t))
    )
  }

  function deleteTransaction(id) {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpense

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    totalIncome,
    totalExpense,
    balance,
  }
}

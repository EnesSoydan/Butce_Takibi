import { useState, useMemo } from 'react'

const DEFAULT_FILTERS = {
  type: 'all',       // 'all' | 'income' | 'expense'
  search: '',        // serbest metin
  dateRange: 'all',  // 'all' | 'thisMonth' | 'lastMonth' | 'last7days'
}

function startOfThisMonth() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1)
}

function startOfLastMonth() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() - 1, 1)
}

function endOfLastMonth() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59)
}

function sevenDaysAgo() {
  const d = new Date()
  d.setDate(d.getDate() - 7)
  d.setHours(0, 0, 0, 0)
  return d
}

function matchesDateRange(transactionDate, range) {
  if (range === 'all') return true
  const d = new Date(transactionDate)

  if (range === 'thisMonth') {
    return d >= startOfThisMonth()
  }
  if (range === 'lastMonth') {
    return d >= startOfLastMonth() && d <= endOfLastMonth()
  }
  if (range === 'last7days') {
    return d >= sevenDaysAgo()
  }
  return true
}

export function useFilteredTransactions(transactions) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const setFilter = (key, value) =>
    setFilters(prev => ({ ...prev, [key]: value }))

  const resetFilters = () => setFilters(DEFAULT_FILTERS)

  const filtered = useMemo(() => {
    const term = filters.search.trim().toLowerCase()
    return transactions
      .filter(t => filters.type === 'all' || t.type === filters.type)
      .filter(t => matchesDateRange(t.date, filters.dateRange))
      .filter(t => !term || t.description.toLowerCase().includes(term))
  }, [transactions, filters])

  return { filtered, filters, setFilter, resetFilters }
}

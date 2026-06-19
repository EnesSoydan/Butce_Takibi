import { useState } from 'react'
import BalanceSummary from '../components/BalanceSummary'
import CategoryChart from '../components/CategoryChart'
import ExchangeRateBar from '../components/ExchangeRateBar'
import TransactionFilters from '../components/TransactionFilters'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import { useTransactions } from '../hooks/useTransactions'
import { useFilteredTransactions } from '../hooks/useFilteredTransactions'

export default function HomePage() {
  const {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    totalIncome,
    totalExpense,
    balance,
  } = useTransactions()

  const { filtered, filters, setFilter } = useFilteredTransactions(transactions)

  const [showForm, setShowForm] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  function handleSubmit(formData) {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, formData)
      setEditingTransaction(null)
    } else {
      addTransaction(formData)
    }
  }

  function handleEdit(transaction) {
    setEditingTransaction(transaction)
    setShowForm(true)
  }

  function handleClose() {
    setShowForm(false)
    setEditingTransaction(null)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">💰 Bütçe Takibi</h1>
            <p className="text-xs text-gray-400 mt-0.5">Gelir ve giderlerini takip et</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
          >
            + Yeni İşlem
          </button>
        </div>
      </header>

      {/* Döviz kuru çubuğu */}
      <ExchangeRateBar balance={balance} />

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <BalanceSummary
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          balance={balance}
        />

        <CategoryChart transactions={transactions} />

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-base font-semibold text-gray-800 mb-4">İşlemler</h2>
          <TransactionFilters
            filters={filters}
            setFilter={setFilter}
            count={filtered.length}
          />
          <TransactionList
            transactions={filtered}
            onEdit={handleEdit}
            onDelete={deleteTransaction}
          />
        </div>
      </main>

      {/* Modal */}
      {showForm && (
        <TransactionForm
          onSubmit={handleSubmit}
          onClose={handleClose}
          editingTransaction={editingTransaction}
        />
      )}
    </div>
  )
}

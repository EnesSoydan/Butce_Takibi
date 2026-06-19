import { useState, useEffect } from 'react'
import { CATEGORIES, TRANSACTION_TYPES } from '../interfaces/transaction'

const EMPTY_FORM = {
  type: TRANSACTION_TYPES.EXPENSE,
  amount: '',
  description: '',
  category: CATEGORIES.expense[0],
  date: new Date().toISOString().split('T')[0],
}

export default function TransactionForm({ onSubmit, onClose, editingTransaction }) {
  const [form, setForm] = useState(EMPTY_FORM)

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        type: editingTransaction.type,
        amount: editingTransaction.amount,
        description: editingTransaction.description,
        category: editingTransaction.category,
        date: editingTransaction.date,
      })
    } else {
      setForm(EMPTY_FORM)
    }
  }, [editingTransaction])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => {
      const updated = { ...prev, [name]: value }
      if (name === 'type') {
        updated.category = CATEGORIES[value][0]
      }
      return updated
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.amount || !form.description) return
    onSubmit(form)
    onClose()
  }

  const categories = CATEGORIES[form.type]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            {editingTransaction ? 'İşlemi Düzenle' : 'Yeni İşlem Ekle'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Tür */}
          <div className="flex rounded-xl overflow-hidden border border-gray-200">
            <button
              type="button"
              onClick={() => setForm(prev => ({ ...prev, type: 'expense', category: CATEGORIES.expense[0] }))}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                form.type === 'expense'
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              Gider
            </button>
            <button
              type="button"
              onClick={() => setForm(prev => ({ ...prev, type: 'income', category: CATEGORIES.income[0] }))}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                form.type === 'income'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              Gelir
            </button>
          </div>

          {/* Tutar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tutar (₺)</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              placeholder="0,00"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Açıklama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="İşlem açıklaması..."
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Tarih */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tarih</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium"
            >
              İptal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium"
            >
              {editingTransaction ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount)
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function TransactionItem({ transaction, onEdit, onDelete }) {
  const isIncome = transaction.type === 'income'

  return (
    <div className={`flex items-center justify-between p-4 bg-white rounded-xl border-l-4 shadow-sm ${
      isIncome ? 'border-green-500' : 'border-red-400'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
          isIncome ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {isIncome ? '↑' : '↓'}
        </div>
        <div>
          <p className="font-medium text-gray-800">{transaction.description}</p>
          <p className="text-xs text-gray-400">{transaction.category} · {formatDate(transaction.date)}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className={`font-semibold text-base ${isIncome ? 'text-green-600' : 'text-red-500'}`}>
          {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
        </span>
        <button
          onClick={() => onEdit(transaction)}
          className="text-gray-400 hover:text-blue-500 text-sm px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors"
          title="Düzenle"
        >
          ✎
        </button>
        <button
          onClick={() => {
            if (window.confirm('Bu işlemi silmek istediğinize emin misiniz?')) {
              onDelete(transaction.id)
            }
          }}
          className="text-gray-400 hover:text-red-500 text-sm px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
          title="Sil"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

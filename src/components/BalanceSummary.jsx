function formatCurrency(amount) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount)
}

export default function BalanceSummary({ totalIncome, totalExpense, balance }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <p className="text-sm text-gray-500 mb-1">Toplam Gelir</p>
        <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <p className="text-sm text-gray-500 mb-1">Toplam Gider</p>
        <p className="text-2xl font-bold text-red-500">{formatCurrency(totalExpense)}</p>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <p className="text-sm text-gray-500 mb-1">Net Bakiye</p>
        <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
          {formatCurrency(balance)}
        </p>
      </div>
    </div>
  )
}

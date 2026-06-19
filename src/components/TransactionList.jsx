import TransactionItem from './TransactionItem'

export default function TransactionList({ transactions, onEdit, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-4xl mb-3">💸</p>
        <p className="font-medium">Sonuç bulunamadı</p>
        <p className="text-sm mt-1">Filtreleri değiştir veya yeni işlem ekle</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {transactions.map(t => (
        <TransactionItem
          key={t.id}
          transaction={t}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

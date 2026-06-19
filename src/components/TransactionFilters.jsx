const TYPE_FILTERS = [
  { label: 'Tümü', value: 'all' },
  { label: 'Gelir', value: 'income' },
  { label: 'Gider', value: 'expense' },
]

const DATE_FILTERS = [
  { label: 'Tüm Zamanlar', value: 'all' },
  { label: 'Bu Ay', value: 'thisMonth' },
  { label: 'Geçen Ay', value: 'lastMonth' },
  { label: 'Son 7 Gün', value: 'last7days' },
]

export default function TransactionFilters({ filters, setFilter, count }) {
  return (
    <div className="space-y-3 mb-4">
      {/* Tür butonları + sayaç */}
      <div className="flex gap-2 items-center flex-wrap">
        {TYPE_FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter('type', f.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filters.type === f.value
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-sm text-gray-400">{count} işlem</span>
      </div>

      {/* Arama + tarih */}
      <div className="flex gap-2 flex-col sm:flex-row">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            value={filters.search}
            onChange={e => setFilter('search', e.target.value)}
            placeholder="Açıklamada ara..."
            className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filters.dateRange}
          onChange={e => setFilter('dateRange', e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {DATE_FILTERS.map(d => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

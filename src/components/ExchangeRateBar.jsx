import { useExchangeRates } from '../hooks/useExchangeRates'

const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'Dolar' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'GBP', symbol: '£', label: 'Sterlin' },
]

function formatForeign(value) {
  if (!Number.isFinite(value)) return '—'
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export default function ExchangeRateBar({ balance }) {
  const { rates, loading, error } = useExchangeRates()

  if (error) return null

  return (
    <div className="bg-slate-900 text-white">
      <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center justify-between text-sm">
        <span className="text-slate-400 text-xs hidden sm:inline">
          Bakiye karşılığı
        </span>
        <div className="flex gap-4 sm:gap-6 mx-auto sm:mx-0">
          {CURRENCIES.map(c => (
            <div key={c.code} className="flex items-center gap-1.5">
              <span className="text-slate-400 text-xs">{c.symbol}</span>
              {loading || !rates ? (
                <span className="inline-block h-3 w-14 bg-slate-700 rounded animate-pulse" />
              ) : (
                <span className="font-medium tabular-nums">
                  {formatForeign(balance * rates[c.code])}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

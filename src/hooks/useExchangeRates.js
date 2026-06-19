import { useState, useEffect } from 'react'

const CACHE_KEY = 'butce_kur_cache'
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 saat
const API_URL = 'https://open.er-api.com/v6/latest/TRY'

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (Date.now() - parsed.timestamp > CACHE_TTL_MS) return null
    return parsed
  } catch {
    return null
  }
}

function writeCache(rates) {
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({ rates, timestamp: Date.now() })
  )
}

export function useExchangeRates() {
  const [state, setState] = useState({ rates: null, loading: true, error: null })

  useEffect(() => {
    const cached = readCache()
    if (cached) {
      setState({ rates: cached.rates, loading: false, error: null })
      return
    }

    let cancelled = false

    async function fetchRates() {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error('Kur servisi yanıt vermedi')
        const data = await res.json()
        if (cancelled) return

        // API "TRY base" döner: rates.USD = kaç USD 1 TRY eder (yani küçük sayı)
        // Bizim ihtiyacımız: 1 TRY → X USD
        const rates = {
          USD: data.rates.USD,
          EUR: data.rates.EUR,
          GBP: data.rates.GBP,
        }
        writeCache(rates)
        setState({ rates, loading: false, error: null })
      } catch (err) {
        if (cancelled) return
        setState({ rates: null, loading: false, error: err.message })
      }
    }

    fetchRates()

    return () => {
      cancelled = true
    }
  }, [])

  return state
}

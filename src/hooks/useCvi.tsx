import { useState, useCallback } from 'react'
import { useInterval } from './useInterval'

interface CviObject {
  id: number
  value: number
  sum: number
  storedAt: string
}

interface Currency {
  id: number
  name: string
  symbol: string
}

interface BasketEntry {
  currency: Currency
  liquidity: number
  marketCapUsdLog: number
  storedAt: string
}

interface CviData {
  indexValue: number
  entries: BasketEntry[]
  sum: number
  refresh: number
  first: BasketEntry
  current: CviObject
  previous: CviObject | null
  previousDay: CviObject
  next: CviObject | null
}

const useCvi = () => {
  const [data, setData] = useState<null | CviData>(null)

  const fetchData = useCallback(() => {
    fetch('https://api.cryptovalueindex.com/?type=json')
      .then(response => response.json())
      .then(response => {
        setData(response)
      })
  }, [])

  useInterval(fetchData, 15000, true)

  return { data }
}

export default useCvi

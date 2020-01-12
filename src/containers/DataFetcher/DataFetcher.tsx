import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'

import DataDisplay from '../DataDisplay'
import Loader from '../../components/Loader'

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
  plotlyData: any
}

const toLocalIsoTime = (d: Date) => {
  var tzoffset = d.getTimezoneOffset() * 60000 //offset in milliseconds
  var localISOTime = new Date(d.getTime() - tzoffset).toISOString().slice(0, -1)
  return localISOTime
}

const DataFetcher: React.FC = () => {
  const [data, setData] = useState<null | CviData>(null)
  const [refetchAt, setRefetchAt] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const { date } = useParams()
  const { pathname } = useLocation()
  const history = useHistory()
  const dateObject = useMemo(() => (!!date ? new Date(date) : null), [date])
  const zonedDate = useMemo(() => (dateObject ? toLocalIsoTime(dateObject) : null), [dateObject])

  const fetchData = useCallback(
    () =>
      fetch('https://api.cryptovalueindex.com/?type=json' + (zonedDate ? `&date=${zonedDate}` : ''))
        .then(response => response.json())
        .then(response => {
          setLoading(false)
          setData(response)
          if (!response.next) {
            setRefetchAt(response.refresh)
            if (pathname !== '/') {
              history.push('/')
            }
          }
          return response
        }),
    [pathname, history, zonedDate]
  )

  useEffect(() => {
    setLoading(true)
    fetchData()
  }, [fetchData])

  const checkFetch = useCallback(() => {
    if (refetchAt === null) {
      return
    }

    setRefetchAt(prev => (prev ? prev - 1 : null))

    if (refetchAt > 0) {
      return
    }

    setRefetchAt(null)

    setTimeout(() => {
      if (loading) {
        setRefetchAt(15)
      }

      setLoading(true)
      fetchData()
    }, 1000)
  }, [fetchData, refetchAt, loading])

  useEffect(() => {
    const id = setInterval(checkFetch, 1000)
    return () => clearInterval(id)
  }, [checkFetch])

  return (
    <>
      {loading && <Loader />}
      {!!data ? <DataDisplay data={data} loading={loading} /> : <>Loading...</>}
    </>
  )
}

export default DataFetcher

import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import Anchor from '../../components/Anchor'

import { round } from '../../utils'

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

interface CviObject {
  storedAt: string
  value: number
  sum: number
}

interface Data {
  indexValue: number
  previous: CviObject | null
  previousDay: CviObject
  current: CviObject
  next: CviObject | null
  entries: BasketEntry[]
}

interface DataDisplayProps {
  data: Data
}

const CurrencyIcon = styled.img`
  width: 1.25rem;
  margin-right: 0.1rem;
`

const DataDisplay: React.FC<DataDisplayProps> = ({
  data: { indexValue, previous, next, current, previousDay, entries },
}) => {
  const diff = ((current.value - previousDay.value) / current.value) * 100

  return (
    <div>
      {!!previous && (
        <Anchor>
          <FontAwesomeIcon title="previous" icon={faArrowLeft} />
          &nbsp;{previous.storedAt}
        </Anchor>
      )}
      <div>
        <h2>
          CVI: {round(indexValue, 0.01).toFixed(2)}
          <small>{round(diff, 0.01).toFixed(2)}</small>
        </h2>
        <p>{current.storedAt}</p>
      </div>
      {!!next && (
        <Anchor>
          {next.storedAt}&nbps;
          <FontAwesomeIcon title="next" icon={faArrowRight} />
        </Anchor>
      )}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Symbol</th>
            <th>Name</th>
            <th>Trade-Index</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr key={entry.currency.symbol}>
              <td>{i + 1}</td>
              <td>
                <CurrencyIcon
                  src={`https://bcb.red0.ch/ccicons/transparent/${entry.currency.symbol}.png`}
                  alt={entry.currency.symbol}
                />{' '}
                {entry.currency.symbol}
              </td>
              <td>{entry.currency.name}</td>
              <td>{round(entry.liquidity, 0.01).toFixed(2)}</td>
              <td>{round((entry.marketCapUsdLog * 100) / current.sum, 0.01).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataDisplay

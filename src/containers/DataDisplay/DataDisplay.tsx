import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'

import Anchor from '../../components/Anchor'

import { round } from '../../utils'

import { DesignToken } from '../../design-tokens'
import { DATE_TIME_FORMAT } from '../../constants'

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
  first: BasketEntry
  entries: BasketEntry[]
}

interface DataDisplayProps {
  data: Data
}

const Table = styled.table`
  border-collapse: collapse;
  margin-bottom: ${DesignToken.defaultPadding};
`

const DataDisplayContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CurrencyIcon = styled.img`
  width: 1.6rem;
  margin-right: 0.1rem;
  vertical-align: middle;
`

const CviHeading = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const TimeNavigation = styled.div`
  white-space: nowrap;
  flex-basis: 25%;
  flex-grow: 0;
  flex-shrink: 1;
`

const CviBlock = styled.div`
  text-align: center;
  padding-bottom: ${DesignToken.defaultPadding};

  h2 {
    margin: 0 0 0;
    font-size: ${DesignToken.cviDisplay.fontSize};
    line-height: calc(${DesignToken.cviDisplay.fontSize});
  }
`

const CurrencyLine = styled.tr`
  border-bottom: ${DesignToken.table.border};

  td,
  th {
    padding: ${DesignToken.table.padding};
  }

  th {
    text-align: left;
  }
`

interface CellProps {
  textAlign?: 'left' | 'center' | 'right'
}
const Cell = styled.td`
  text-align: ${(props: CellProps) => props.textAlign || 'left'};
  white-space: nowrap;
`

interface DiffProps {
  isNegative?: boolean
}

const Diff = styled.small`
  color: ${(props: DiffProps) => (props.isNegative ? DesignToken.negativeColor : DesignToken.positiveColor)};
`

const DataDisplay: React.FC<DataDisplayProps> = ({
  data: { indexValue, previous, next, current, previousDay, entries, first },
}) => {
  const diff = ((current.value - previousDay.value) / current.value) * 100

  return (
    <DataDisplayContainer>
      <CviHeading>
        <TimeNavigation>
          {!!previous && (
            <Anchor>
              <FontAwesomeIcon title="previous" icon={faArrowLeft} />
              &nbsp;{format(new Date(previous.storedAt), DATE_TIME_FORMAT)}
            </Anchor>
          )}
        </TimeNavigation>
        <CviBlock>
          <h2>
            CVI: {round(indexValue, 0.01).toFixed(2)}&nbsp;
            <Diff isNegative={diff < 0}>{round(diff, 0.01).toFixed(2)}</Diff>
          </h2>
          <p>{format(new Date(current.storedAt), DATE_TIME_FORMAT)}</p>
        </CviBlock>
        <TimeNavigation>
          {!!next && (
            <Anchor>
              {format(new Date(next.storedAt), DATE_TIME_FORMAT)}&nbps;
              <FontAwesomeIcon title="next" icon={faArrowRight} />
            </Anchor>
          )}
        </TimeNavigation>
      </CviHeading>
      <Table>
        <thead>
          <CurrencyLine>
            <th>#</th>
            <th>Symbol</th>
            <th>Name</th>
            <th>Trade-Index</th>
            <th>Weight</th>
          </CurrencyLine>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <CurrencyLine key={entry.currency.symbol}>
              <Cell>{i + 1}</Cell>
              <Cell>
                <CurrencyIcon
                  src={`https://bcb.red0.ch/ccicons/transparent/${entry.currency.symbol}.png`}
                  alt={entry.currency.symbol}
                />{' '}
                {entry.currency.symbol}
              </Cell>
              <Cell>{entry.currency.name}</Cell>
              <Cell textAlign="right">{round(entry.liquidity, 0.01).toFixed(2)}</Cell>
              <Cell textAlign="right">{round((entry.marketCapUsdLog * 100) / current.sum, 0.01).toFixed(2)}</Cell>
            </CurrencyLine>
          ))}
        </tbody>
      </Table>
      <div>Reference date: {format(new Date(first.storedAt), DATE_TIME_FORMAT)}</div>
    </DataDisplayContainer>
  )
}

export default DataDisplay

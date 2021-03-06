import React, { lazy, Suspense, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { format, parseISO } from 'date-fns'

import StyledLink from '../../components/StylesLink'

import { round } from '../../utils'

import { DesignToken, BreakPoint } from '../../design-tokens'
import { DATE_TIME_FORMAT } from '../../constants'

const Plot = lazy(() => import('react-plotly.js'))

const parseDate = (date: string) => parseISO(date)

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
  plotlyData: any
}

interface DataDisplayProps {
  data: Data
  loading: boolean
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

  @media (max-width: ${BreakPoint.mobile}) {
    flex-direction: column;
  }
`

interface TimeNavigationProps {
  textAlign?: 'left' | 'center' | 'right'
}
const TimeNavigation = styled.div`
  text-align: ${(props: TimeNavigationProps) => props.textAlign || 'left'};
  white-space: nowrap;
  flex-basis: 25%;
  flex-grow: 0;
  flex-shrink: 1;

  @media (max-width: ${BreakPoint.mobile}) {
    padding-bottom: ${DesignToken.defaultPadding};
    text-align: center;
  }
`

const CviBlock = styled.div`
  text-align: center;
  padding-bottom: ${DesignToken.defaultPadding};

  h2 {
    margin: 0 0 0;
    font-size: ${DesignToken.cviDisplay.fontSize};
    line-height: calc(${DesignToken.cviDisplay.fontSize});
  }

  @media (max-width: ${BreakPoint.mobile}) {
    padding-bottom: ${DesignToken.defaultPadding};
  }
`

const CurrencyLine = styled.tr`
  border-bottom: ${DesignToken.table.border};

  &:nth-child(2n) {
    background-color: ${DesignToken.table.stripe}38;
  }

  td,
  th {
    padding: ${DesignToken.table.padding};
  }

  th {
    text-align: left;
  }

  font-size: ${DesignToken.table.textSize.desktop};
  @media (max-width: ${BreakPoint.mobile}) {
    font-size: ${DesignToken.table.textSize.mobile};
  }
`

interface CellProps {
  textAlign?: 'left' | 'center' | 'right'
  noWrap?: boolean
}
const Cell = styled.td`
  text-align: ${(props: CellProps) => props.textAlign || 'left'};
  white-space: ${props => (props.noWrap ? 'nowrap' : 'normal')};
`

const PlotArea = styled.div`
  width: 100%;
  height: 0;
  min-height: 400px;
  margin-bottom: ${DesignToken.defaultPadding};
`

interface DiffProps {
  isNegative?: boolean
}

const Diff = styled.small`
  color: ${(props: DiffProps) => (props.isNegative ? DesignToken.negativeColor : DesignToken.positiveColor)};
`

const DataDisplay: React.FC<DataDisplayProps> = ({
  data: { indexValue, previous, next, current, previousDay, entries, first, plotlyData },
  loading,
}) => {
  const diff = ((current.value - previousDay.value) / current.value) * 100
  const formattedCvi = round(indexValue, 0.01).toFixed(2)

  useEffect(() => {
    document.title = `CVI: ${formattedCvi} - Crypto Value Index`
  }, [formattedCvi])

  return (
    <DataDisplayContainer>
      <CviHeading>
        <TimeNavigation>
          {previous && (
            <StyledLink to={`/${previous.storedAt}`} disabled={loading}>
              <FontAwesomeIcon title="previous" icon={faArrowLeft} />
              &nbsp;{format(parseDate(previous.storedAt), DATE_TIME_FORMAT)}
            </StyledLink>
          )}
        </TimeNavigation>
        <CviBlock>
          <h2>
            CVI: {formattedCvi}&nbsp;
            <Diff isNegative={diff < 0}>
              <FontAwesomeIcon icon={diff < 0 ? faArrowDown : faArrowUp} />
              &nbsp;{round(diff, 0.01).toFixed(2)}%
            </Diff>
          </h2>
          <p>{format(parseDate(current.storedAt), DATE_TIME_FORMAT)}</p>
        </CviBlock>
        <TimeNavigation textAlign="right">
          {!!next && (
            <StyledLink to={`/${next.storedAt}`} disabled={loading}>
              {format(parseDate(next.storedAt), DATE_TIME_FORMAT)}&nbsp;
              <FontAwesomeIcon title="next" icon={faArrowRight} />
            </StyledLink>
          )}
        </TimeNavigation>
      </CviHeading>
      <PlotArea>
        <Suspense fallback={<>Loading...</>}>
          <Plot
            data={plotlyData}
            layout={{
              title: 'Crypto Value Index',
              autosize: true,
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(0,0,0,0)',
              margin: {
                l: 25,
                r: 0,
                b: 25,
                t: 100,
                pad: 0,
              },
              yaxis: {
                type: 'log',
                gridcolor: DesignToken.primaryColor + '30',
              },
              xaxis: {
                gridcolor: DesignToken.primaryColor + '30',
              },
            }}
            style={{ width: '100%', height: '100%' }}
            useResizeHandler
          />
        </Suspense>
      </PlotArea>
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
              <Cell noWrap>
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
      <div>Reference date: {format(parseDate(first.storedAt), DATE_TIME_FORMAT)}</div>
    </DataDisplayContainer>
  )
}

export default DataDisplay

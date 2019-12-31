import React from 'react'

import { useCvi } from '../../hooks'
import DataDisplay from '../DataDisplay'

const DataFetcher: React.FC = () => {
  const { data } = useCvi()

  if (!data) {
    return <>Loading...</>
  }

  console.log(data)

  return <DataDisplay data={data} />
}

export default DataFetcher

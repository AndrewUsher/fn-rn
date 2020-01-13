import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'

const PieChartWithCenteredLabels = ({ data }) => {
  const Labels = ({ slices = data, height, width }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice
      return (
        <Text
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={'white'}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={12}
          stroke={'red'}
          strokeWidth={0.2}
        >
          {`${data.label}: ${data.amount}`}
        </Text>
      )
    })
  }

  return (
    <PieChart
      style={{ height: 400, width: 300 }}
      valueAccessor={({ item }) => item.amount}
      data={data}
      spacing={0}
      outerRadius={'95%'}
    >
      <Labels data={data} />
    </PieChart>
  )
}

export default PieChartWithCenteredLabels

import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import PieChartWithCenteredLabels from '../PieChart'

const Card = ({ card }) => {
  return <View
    style={styles.card}
  >
    <View style={styles.photoDescriptionContainer}>
      <PieChartWithCenteredLabels data={card && card.data} />
      <Text style={styles.text}>
        {`${card.name}`}
      </Text>
    </View>
  </View>
}

export default Card

import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

const Card = ({ card }) => (
  <View
    style={styles.card}
  >
    <View style={styles.photoDescriptionContainer}>
      <Text style={styles.text}>
        {`${card.name}, ${card.age}`}
      </Text>
    </View>
  </View>
)

export default Card

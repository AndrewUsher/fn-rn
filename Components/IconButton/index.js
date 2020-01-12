import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import styles from './styles.js'

const IconButton = ({onPress, name, backgroundColor, color}) => (
  <TouchableOpacity
    style={[styles.singleButton, { backgroundColor }]}
    onPress={() => onPress()}
    activeOpacity={0.85}
  >
    <Icon
      name={name}
      size={20}
      color={color}
    />
  </TouchableOpacity>
)

export default IconButton

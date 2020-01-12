import React from 'react'
import styled from 'styled-components'

const Text = styled.Text`
color: green;
`
const View = styled.View`
flex: 1;
align-items: center;
justify-content: center
`

const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  )
}
export default HomeScreen

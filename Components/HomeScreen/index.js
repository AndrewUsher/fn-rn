import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components';

const Text = styled.Text`
color: red;
`

class HomeScreen extends React.Component {
  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    )
  }
}
export default HomeScreen

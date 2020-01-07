import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
  align-items: center;
  background-color: #fff;
  flex: 1;
  justify-content: center;
`

export default function App() {
  return (
    <Container>
      <Text>Open up App.tsx to start working on your app!</Text>
    </Container>
  )
}

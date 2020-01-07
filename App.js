import React from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
  align-items: center;
  background-color: black;
  flex: 1;
  justify-content: center;
`

const Text = styled.Text`
  color: white;
`

export default function App() {
  return (
    <Container>
      <Text>Open up App.js to start working on your app!</Text>
    </Container>
  )
}

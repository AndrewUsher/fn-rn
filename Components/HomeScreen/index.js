import React from 'react'
import { connect } from 'react-redux'
import { DrawerActions } from 'react-navigation-drawer'
import { Button } from 'react-native-elements'
import styled from 'styled-components'
import { toggleDrawer } from '../../actions/sideNavDrawer'

const Text = styled.Text`
color: green;
`
const View = styled.View`
flex: 1;
align-items: center;
justify-content: center;
`

const HomeScreen = ({ toggleDrawer, navigation }) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button title='OPEN DRAWERss' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
      </Button>
    </View>
  )
}

export const mapDispatchToProps = (dispatch) => ({
  toggleDrawer: () =>
    dispatch(toggleDrawer())
})

export default connect(null, mapDispatchToProps)(HomeScreen)

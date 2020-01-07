import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import HomeScreen from '../HomeScreen'
import Search from '../Search'

const DrawerNavigatorConfig = {
  drawerBackgroundColor: 'gold'
}

const RouteConfigs = {
  // For each screen that you can navigate to, create a new entry like this:
  Home: HomeScreen,
  Search: Search
}

export const AppNavigator = createDrawerNavigator(RouteConfigs, DrawerNavigatorConfig)

export default createAppContainer(AppNavigator)

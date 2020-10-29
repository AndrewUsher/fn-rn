import { connect } from 'react-redux'
import Search from '../Components/Search'
import { toggleDrawer } from '../actions/sideNavDrawer'

export const mapStateToProps = (state) => {
  console.log('TCL: mapStateToProps -> state', state)
  const { sideNavDrawer: { open } } = state
  return { open }
}

export const mapDispatchToProps = (dispatch) => ({
  toggleDrawer: () =>
    dispatch(toggleDrawer())
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)

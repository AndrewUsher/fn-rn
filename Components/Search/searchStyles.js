import { StyleSheet, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

export default StyleSheet.create({
  swiper: {
    /*
      Setting the height according to the screen height,
      also could be fixed value or based on percentage.
      In this example this worked well on Android and iOS.
    */
    height: height - 300,
    width: width * 0.80,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black'
  }
})

import React, { useState, useRef } from 'react'
import { TouchableHighlight, StyleSheet, SafeAreaView, Platform, View } from 'react-native'
// import ViewOverflow from 'react-native-view-overflow'
import styled from 'styled-components'
import axios from 'axios'
import { SearchBar, Button } from 'react-native-elements'
import Modal from 'react-native-modal'
import Swiper from 'react-native-deck-swiper'
import IconButton from '../IconButton'
import OverlayLabel from '../OverlayLabel'
import Card from '../Card'
import searchStyles from './searchStyles.js'

// https://superheroapi.com/api/access-token/search/name
// 729084498444

const API_TOKEN = '729084498444'
const baseUrl = `https://superheroapi.com/api/${API_TOKEN}`
const apiEndPoint = '/search/'

// const View = styled.View`
// background-color: #4d4646;
// display: flex;
// padding-bottom: 16px;
// justify-content: flex-start;
// align-items: center;
// height: 100%;
// `

const Image = styled.Image`
margin-top: 50px;
display: flex;
justify-content: center;
width: 200px;
height: 200px;
`

const Text = styled.Text`
color: brown;
`

const containerTheme = {
  backgroundColor: '#4d4646',
  borderBottomWidth: 0,
  borderTopWidth: 0,
  width: '100%',
  marginTop: 40,
  marginBottom: 16,
  paddingBottom: 16
}

const styles = StyleSheet.create({
  overlayWrapper: {
    display: 'flex'

  },
  flexOne: {
    flex: 1
  },
  swiper: {
    paddingTop: '16px'
  },
  container: {
    flexDirection: 'column',
    backgroundColor: '#000'
  },
  content: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    width: 320,
    height: 470,
    backgroundColor: '#FE474C',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5
  },
  card1: {
    backgroundColor: '#FE474C'
  },
  card2: {
    backgroundColor: '#FEB12C'
  },
  label: {
    lineHeight: 400,
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
    alignItems: 'center'
  },
  modalStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
    flex: 1
  },
  closeBtn: {
    display: 'flex',
    marginBottom: 16
  },
  button: {
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0
  },
  orange: {
    width: 55,
    height: 55,
    borderWidth: 6,
    borderColor: 'rgb(246,190,66)',
    borderRadius: 55,
    marginTop: -15
  },
  green: {
    width: 75,
    height: 75,
    backgroundColor: '#fff',
    borderRadius: 75,
    borderWidth: 6,
    borderColor: '#01df8a'
  },
  red: {
    width: 75,
    height: 75,
    backgroundColor: '#fff',
    borderRadius: 75,
    borderWidth: 6,
    borderColor: '#fd267d'
  },
  swiperContainer: {
    flex: 1,
    backgroundColor: '#000',
    flexDirection: 'column-reverse'
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const Search = () => {
  const [superHeroInput, setSuperHeroInput] = useState('')
  const [superHeroImage, setSuperHeroImage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [superHeroData, setSuperHeroData] = useState('')
  const swiperRef = useRef(null)
  // console.log('TCL: Search -> swiperRef', swiperRef)

  const nameCards = [
    { key: 1, name: 'greg', age: 33 },
    { key: 2, name: 'sky', age: 31 },
    { key: 3, name: 'carmelo', age: 8 },
    { key: 4, name: 'Semira', age: 2 },
    { key: 5, name: 'money', age: 522 }
  ]

  const shuffleCards = (array) => {
    let i = 0
    let j = 0
    let temp = null

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    swiperRef.current.swipeRight()
  }

  const getHeroInfo = async searchInput => {
    const fullURL = `${baseUrl}${apiEndPoint}${superHeroInput}`
    try {
      const response = await axios.get(fullURL)
      const image = response && response.data.results[0].image.url
      const results = response && response.data.results
      setSuperHeroImage(image)
      setSuperHeroData(results)
    } catch (error) {
      console.log(error)
    } finally {
      setSuperHeroInput('')
    }
    // console.log('superHeroData', superHeroData)
  }

  return (
    <View style={styles.searchContainer}>
      <SearchBar
        containerStyle={containerTheme}
        placeholder="Search Superhero"
        value={superHeroInput}
        onChangeText={setSuperHeroInput}
      />
      <Button
        disabled={!superHeroInput}
        title={'Get Super Info!'}
        type='outline'
        onPress={() => getHeroInfo(superHeroInput)}
        raised={true}
      />
      <TouchableHighlight onPress={() => setIsModalOpen(!isModalOpen)}>
        <Image source={{ uri: superHeroImage }} />
      </TouchableHighlight>
      <Modal style={styles.modalStyle} backdropOpacity={0.9} isVisible={isModalOpen}>
        <Text>{superHeroData && superHeroData[0].name}</Text>
        <View style={styles.swiperContainer}>
          <Swiper
            ref={swiperRef}
            onSwiped={() => {
              console.log('General swipe')
            }}
            onSwipedAll={(e) => {
              console.log(`Swiped ALL current index is: ${e}`)
            }}
            onSwipedLeft={(e) => {
              console.log(`Swiped LEFT current index is: ${e}`)
            }}
            onSwipedRight={
              (e) => {
                console.log(`Swiped RIGHT current index is: ${e}`)
              }
            }
            onSwipedBottom={
              (e) => {
                console.log(`swiped BOTTOM current index is: ${e}`)
              }
            }
            useViewOverflow={Platform.OS === 'ios'}
            animateCardOpacity
            containerStyle={styles.container}
            cards={nameCards}
            renderCard={card => <Card card={card} />}
            cardIndex={0}
            backgroundColor="black"
            stackSize={3}
            infinite
            showSecondCard
            animateOverlayLabelsOpacity
            overlayLabels={{
              left: {
                style: {
                  wrapper: {
                    ...styles.overlayWrapper,
                    alignItems: 'flex-end',
                    color: 'black'
                  }
                }
              },
              right: {
                style: {
                  wrapper: {
                    ...styles.overlayWrapper,
                    alignItems: 'flex-start',
                    marginLeft: 30
                  }
                }
              }
            }}
          />
          <Button buttonStyle={styles.closeBtn} accessibilityLabel={'Close'} title="Close" onPress={() => setIsModalOpen(!isModalOpen)} />
          <View style={styles.buttonContainer}>
            <IconButton
              name="stepbackward"
              onPress={() => {
                swiperRef.current.swipeLeft()
              }}
              color="white"
              backgroundColor="#E5566D"
              accessibilityLabel="step backward"
              animated
            />
            <IconButton
              name="sync"
              onPress={() => shuffleCards(nameCards)}
              color="white"
              backgroundColor="#3CA3FF"
              accessibilityLabel="shuffle cards"
              animated
            />
            <IconButton
              name="stepforward"
              onPress={() => {
                swiperRef.current.swipeRight()
              }}
              color="white"
              backgroundColor="#4CCC93"
              accessibilityLabel="step forward"
              animated
            />
          </View>
          <View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Search

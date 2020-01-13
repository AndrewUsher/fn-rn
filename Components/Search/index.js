import React, { useState, useRef } from 'react'
import { TouchableHighlight, StyleSheet, Platform, View } from 'react-native'
// import { Wave, Animate, Composing, AnimationType } from 'react-native-wave'
import styled from 'styled-components'
import axios from 'axios'
import { SearchBar, Button } from 'react-native-elements'
import Modal from 'react-native-modal'
import Swiper from 'react-native-deck-swiper'
import IconButton from '../IconButton'
import Card from '../Card'

// https://superheroapi.com/api/access-token/search/name
// 729084498444

const API_TOKEN = '729084498444'
const baseUrl = `https://superheroapi.com/api/${API_TOKEN}`
const apiEndPoint = '/search/'

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
  },
  errorMsg: {
    color: 'red',
    padding: 16
  }
})

const Search = () => {
  const [superHeroInput, setSuperHeroInput] = useState('')
  const [noData, setNoData] = useState(false)
  const [superHeroImage, setSuperHeroImage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [superHeroData, setSuperHeroData] = useState('')
  const [powerData, setPowerData] = useState([])
  const [fullName, setFullName] = useState('')
  const [showLoading, setShowLoading] = useState(false)
  const swiperRef = useRef(null)

  const nameCards = [
    { key: 1, name: fullName, age: 33, data: powerData },
    { key: 2, name: 'sky', age: 31, data: [] },
    { key: 3, name: 'carmelo', age: 8, data: [] },
    { key: 4, name: 'Semira', age: 2, data: [] },
    { key: 5, name: 'money', age: 522, data: [] }
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

  const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

  const makePowerDataFn = (data) => {
    const dataArr = []
    const tempDataArr = Object.entries(data)
    tempDataArr.map((elem, idx) => {
      dataArr.push({
        key: idx,
        amount: parseInt(elem[1], 10),
        label: elem[0],
        svg: { fill: randomColor() }
      })
    })
    return setPowerData(dataArr)
  }

  const trimText = str => str && str.replace(/^,+|,+$/gm, '')

  const getHeroInfo = async searchInput => {
    const cleanedInput = superHeroInput.trim()
    const fullURL = `${baseUrl}${apiEndPoint}${cleanedInput}`
    try {
      setShowLoading(true)
      const response = await axios.get(fullURL)
      const results = response && response.data.results
      const heroOnly = results.filter(elem => elem.name.toLowerCase() === superHeroInput.toLowerCase())[0]
      const image = heroOnly && heroOnly.image.url
      const powerStats = heroOnly && heroOnly.powerstats
      const birthName = heroOnly && heroOnly.biography['full-name']
      const akaText = heroOnly && heroOnly.biography.aliases[0] !== '-' ? trimText(heroOnly && heroOnly.biography.aliases.join(', ')) : ''
      const fullName = akaText ? `${birthName} AKA ${akaText}` : `${birthName}`
      setFullName(fullName)
      setSuperHeroImage(image)
      setSuperHeroData(heroOnly)
      makePowerDataFn(powerStats)
    } catch (error) {
      setNoData(true)
      console.log(error)
    } finally {
      setShowLoading(false)
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
        showLoading={showLoading}
      />
      {/* {noData && <Text style={styles.errorMsg}>Sorry, no results for {superHeroInput}</Text>} */}
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
        <Text>{superHeroData && superHeroData.name}</Text>
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
              () => {
                setIsModalOpen(false)
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

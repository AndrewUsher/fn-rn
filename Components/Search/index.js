import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { SearchBar, Button } from 'react-native-elements'

// https://superheroapi.com/api/access-token/search/name
// 729084498444

const API_TOKEN = '729084498444'
const baseUrl = `https://superheroapi.com/api/${API_TOKEN}`
const apiEndPoint = '/search/'

const View = styled.View`
display: flex;
padding-bottom: 16px;
justify-content: flex-start;
align-items: center;
height: 100%;
`

const Image = styled.Image`
margin-top: 50px;
display: flex;
justify-content: center;
width: 200px;
height: 200px;
`

const containerTheme = {
  width: '100%',
  marginTop: 40,
  marginBottom: 16,
  paddingBottom: 16
}

function Search () {
  const [superHeroInput, setSuperHeroInput] = React.useState('')
  const [superHeroImage, setSuperHeroImage] = React.useState('')

  const getHeroInfo = async searchInput => {
    const fullURL = `${baseUrl}${apiEndPoint}${superHeroInput}`
    try {
      const response = await axios.get(fullURL)
      setSuperHeroImage(response.data.results[0].image.url)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View>
      <SearchBar
        containerStyle={containerTheme}
        placeholder="Search SuperHero"
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

      <Image source={{ uri: superHeroImage }} />

    </View>
  )
}

export default Search

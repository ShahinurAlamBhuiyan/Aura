import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'

import { icons } from '../constants'
import { router, usePathname } from 'expo-router'
import { Alert } from 'react-native'

const SearchInput = () => {
  const pathname = usePathname()
  const [query, setQuery] = useState('')

  return (
    <View className='w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl  items-center flex-row focus:border-secondary'>
      <TextInput
        className='text-base mt-0.5 text-white flex-1 font-pregular'
        value={query}
        placeholder='Search for a video topic'
        placeholderTextColor='#cdcde0'
        onChangeText={e => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              'Missing query',
              'Please input something to search results across database'
            )
          }

          if (pathname.startsWith('/search')) router.setParams({ query })
          else router.push(`/search/${query}`)
        }}
      >
        <Image source={icons.search} className='h-5 w-5' resizeMode='contain' />
      </TouchableOpacity>
    </View>
  )
}
export default SearchInput

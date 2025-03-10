import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'

import { icons } from '../constants'

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className='w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl  items-center flex-row focus:border-secondary'>
      <TextInput
        className='text-base mt-0.5 text-white flex-1 font-pregular'
        value={value}
        placeholder='Search for a video topic'
        placeholderTextColor='#7b7b8b'
        onChangeText={handleChangeText}
        secureTextEntry={title === 'Password' && !showPassword}
      />

      <TouchableOpacity>
        <Image source={icons.search} className='h-5 w-5' resizeMode='contain' />
      </TouchableOpacity>
    </View>
  )
}
export default SearchInput

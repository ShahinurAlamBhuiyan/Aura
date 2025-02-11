import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export default function App () {
  return (
    <View className='flex-1 justify-center items-center bg-white'>
      <Text className='text-3xl font-pblack'>Aura!</Text>
      <StatusBar style='auto' />
      <Link href='/profile' style={{ color: 'blue' }}>
        Go to Profile
      </Link>
    </View>
  )
}

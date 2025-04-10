import { useLocalSearchParams } from 'expo-router'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const Search = () => {
  const { query } = useLocalSearchParams()
  return (
    <SafeAreaView className='bg-primary h-full'>
      <Text className='text-white text-3xl'>{query}</Text>
    </SafeAreaView>
  )
}
export default Search

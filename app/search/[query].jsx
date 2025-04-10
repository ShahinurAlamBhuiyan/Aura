import { useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { getSearchedPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'
const Search = () => {
  const params = useLocalSearchParams()
  const query = params.query
  const { data: posts, refetchData } = useAppwrite(() =>
    getSearchedPosts(query)
  )
  console.log(query, posts)
  useEffect(() => {
    refetchData()
  }, [query])

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={item => item.$id}
        renderItem={({ item, index }) => <VideoCard key={index} video={item} />}
        ListHeaderComponent={() => (
          <View className='my-6 px-4'>
            <Text className='font-pmedium text-sm text-gray-100'>
              Search Results
            </Text>
            <Text className='text-2xl font-psemibold text-white'>{query}</Text>
            <View className='mt-6 mb-8'>
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No videos available'
            subtitle='No videos found for this search query!'
          />
        )}
      />
    </SafeAreaView>
  )
}
export default Search

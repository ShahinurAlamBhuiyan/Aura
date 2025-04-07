import { View, Text, FlatList } from 'react-native'
const Trending = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.$id}
      renderItem={({ item, index }) => (
        <Text className='text-3xl text-white' key={index}>
          {item.id}
        </Text>
      )}
      horizontal
    />
  )
}
export default Trending

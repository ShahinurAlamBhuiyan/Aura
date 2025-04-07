import { View, Text } from 'react-native'
const VideoCard = ({ video }) => {
  return (
    <View>
      <Text className='text-white'>{video.title}</Text>
    </View>
  )
}
export default VideoCard

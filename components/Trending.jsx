import { useState } from 'react'
import { ResizeMode, Video } from 'expo-av'
import * as Animatable from 'react-native-animatable'
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native'

import { icons } from '../constants'
import WebView from 'react-native-webview'

const zoomIn = {
  0: { scale: 0.9 },
  1: { scale: 1 }
}

const zoomOut = {
  0: { scale: 1 },
  1: { scale: 0.9 }
}

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false)
  return (
    <Animatable.View
      className='mr-5'
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <View className='w-52 h-72 rounded-[33px] mt-3 bg-white/10 overflow-hidden '>
          <WebView
            source={{ uri: item.video }}
            style={styles.video}
            allowsFullscreenVideo
            mediaPlaybackRequiresUserAction={false}
          />
        </View>
      ) : (
        <TouchableOpacity
          className='relative flex justify-center items-center'
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className='w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40'
            resizeMode='cover'
          />
          <Image
            source={icons.play}
            className='w-12 h-12 absolute'
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  video: {
    // marginTop: 12,
    // borderRadius: 33,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    borderRadius: '33px',
    marginTop: '20px',
    marginBottom: '20px'
  }
})

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1])

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={item => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70
      }}
      contentOffset={{ x: 170 }}
    />
  )
}

export default Trending

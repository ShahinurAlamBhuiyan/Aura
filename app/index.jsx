import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import CustomButton from '../components/CustomButton'
import { StatusBar } from 'expo-status-bar'
import { Redirect, router } from 'expo-router'
import { useGlobalContext } from '../context/GlobalProvider'

export default function App () {
  const { isLoading, isLoggedIn } = useGlobalContext()
  console.log(isLoading, isLoggedIn)
  if (!isLoading && isLoggedIn) return <Redirect href='/home' />
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='w-full min-h-[85vh] items-center justify-center px-4'>
          <Image
            source={images.logo}
            className='w-[130px] h-[84px]'
            resizeMode='contain'
          />
          <Image
            source={images.cards}
            className='max-w-[380px] w-full h-[300px]'
            resizeMode='contain'
          />

          <View className='relative mt-5'>
            <Text className='text-white text-3xl text-center font-bold'>
              Discover Endless {'\n'} Possibilities with{' '}
              <Text className='text-secondary-200'>Aura</Text>
            </Text>
            <Image
              source={images.path}
              className='w-[130px] h-[15px] absolute -bottom-[10px] -right-8'
              resizeMode='contain'
            />
          </View>

          <Text className='text-sm font-pregular text-gray-100 text-center mt-7'>
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Aura
          </Text>

          <CustomButton
            title='Continue with Email'
            handlePress={() => {
              router.push('/sign-in')
            }}
            containerStyles='w-full mt-7'
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  )
}

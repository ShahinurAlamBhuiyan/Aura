import { useState } from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
const SignIn = () => {
  const [isSubmitting, setIsSubmitted] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const submit = () => {}
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[80vh] px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />

          <Text className='text-2xl text-white font-semibold mt-10'>
            Log in to Aura
          </Text>

          <FormField
            title='Email'
            value={form.email}
            handleChangeText={e => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />
          <FormField
            title='Password'
            value={form.password}
            handleChangeText={e => setForm({ ...form, password: e })}
            otherStyles='mt-7'
          />

          <CustomButton
            title='Sign In'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have account?
              <Link
                href='/sign-up'
                className='text-lg font-psemibold text-secondary'
              >
                {' '}
                Sign Up
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default SignIn

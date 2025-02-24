import { useState } from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
const SignUp = () => {
  const [isSubmitting, setIsSubmitted] = useState(false)
  const [form, setForm] = useState({
    username: '',
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
            Register in Aura!
          </Text>

          <FormField
            title='Username'
            value={form.username}
            handleChangeText={e => setForm({ ...form, email: e })}
            otherStyles='mt-10'
          />
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
            title='Sign Up'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Already have an account?
              <Link
                href='/sign-in'
                className='text-lg font-psemibold text-secondary'
              >
                {' '}
                Sign in
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default SignUp

import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '../../components/FormField'
import { useState } from 'react'
const Create = () => {
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  })
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-2xl text-white font-psemibold'>Upload Video</Text>

        <FormField
          title={'Video Title'}
          value={form.title}
          placeholder={'Give your video a catchy title.'}
          handleChangeText={e => setForm({ ...form, title: e })}
          otherStyles={'mt-10'}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
export default Create

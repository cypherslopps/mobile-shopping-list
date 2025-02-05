import React from 'react'
import { View } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import Button from '@/components/ui/Button'

const HomeScreen = () => {
  return (
    <View>
      <ThemedText type="title">Home Screen</ThemedText>
      <Button loading={true} disabled={true}>Hello</Button>
    </View>
  )
}

export default HomeScreen
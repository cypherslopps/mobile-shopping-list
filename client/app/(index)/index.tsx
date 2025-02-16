import React from 'react'
import { Pressable, View } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import Button from '@/components/ui/Button'
import { useClerk } from '@clerk/clerk-expo'
import { router, Stack } from 'expo-router'
import { BodyScrollView } from '@/components/ui/BodyScrollView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { appleBlue } from '@/constants/Colors'

const HomeScreen = () => {
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    try {
      await signOut();

      // Redirect to sign in page
      router.replace("/(auth)");
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
    }
  }

  const renderHeaderRight = () => {
    return (
      <Pressable onPress={() => router.push("/(index)/list/new")}>
        <IconSymbol name="plus" color={appleBlue} />
      </Pressable>
    )
  }

  const renderHeaderLeft = () => {
    return (
      <Pressable onPress={() => router.push("/(index)/profile")}>
        <IconSymbol name="gear" color={appleBlue} />
      </Pressable>
    )
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: renderHeaderRight,
          headerLeft: renderHeaderLeft
        }}
      />
      <BodyScrollView
        contentContainerStyle={{
          padding: 16,
        }}
      >
        <ThemedText type="title">Home Screen</ThemedText>
        <Button onPress={handleSignOut}>Sign out</Button>
      </BodyScrollView>
    </>
  )
}

export default HomeScreen
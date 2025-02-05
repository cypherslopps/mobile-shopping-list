import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function HomeRoutesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index" 
        options={{ headerTitle: "Home" }} 
      />
    </Stack>
  )
}
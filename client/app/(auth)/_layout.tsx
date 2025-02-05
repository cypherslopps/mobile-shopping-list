import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) return null;
  if (isSignedIn) {
    return <Redirect href={'/(index)'} />
  }

  return <Stack>
    <Stack.Screen 
      name="index" 
      options={{ headerTitle: "Sign In" }}
    />
    <Stack.Screen 
      name="sign-up" 
      options={{ headerTitle: "Sign Up" }}
    />
    <Stack.Screen 
      name="reset-password" 
      options={{ headerTitle: "Reset Password" }}
    />
  </Stack>
}
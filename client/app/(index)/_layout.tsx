import Button from '@/components/ui/Button'
import { Stack, useRouter } from 'expo-router'

export default function HomeRoutesLayout() {
  const router = useRouter();

  return (
    <Stack screenOptions={{
      ...(process.env.EXPO_OS != "ios" 
        ? {}
        : {
            headerLargeTitle: true,
            headerTransparent: true,
            headerBlurEffect: "systemChromeMaterial", // Requires expo-blue package
            headerLargeTitleShadowVisible: false,
            headerShadowVisible: true,
            headerLargeStyle: {
                backgroundColor: "transparent"
            }
        })
      }}
    >
      <Stack.Screen
        name="index" 
        options={{ headerTitle: "Shopping Lists" }} 
      />
      <Stack.Screen
        name="list/new/index" 
        options={{
          presentation: "formSheet",
          sheetGrabberVisible: true,
          headerShown: false
        }} 
      />
      <Stack.Screen
        name="profile" 
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.75,1],
          sheetGrabberVisible: true,
          headerShown: false
        }} 
      />
      <Stack.Screen
        name="list/new/scan" 
        options={{
          presentation: "fullScreenModal",
          headerLargeTitle: false,
          headerTitle: "Scan QR Code",
          headerLeft: () => (
            <Button
              variant="ghost"
              onPress={() => router.back()}
            >
              Cancel
            </Button>
          )
        }} 
      />
    </Stack>
  )
}
# SHOPPING LIST

Real-time Shopping List built using React Native & Expo

## STACK

- React Native
- Expo
- TinyBase: Data store for local-first apps
- Clerk - User Management Platform
- CloudFlare - Durable Objects for Data Synchronization
- Expo Blur for blurry components ```npx expo install expo-blur```

## Features

- Offline Update
- Real-time Update
- User Authentication
- Invite user's to your list
- QR Code with Validation by using DeepLink
- Adding, Deleting, Updating of List

## Takeout

#### Blurry Header
```
    <Stack screenOptions={{
        ...(process.env.EXPO_OS != "ios" 
            ? {}
            : {
                headerLargeTitle: true,
                headerTransparent: true,
                headerBlurEffect: "systemChromeMaterial" // Requires expo-blue package
                headerLargeTitleShadowVisible: false,
                headerShadowVisible: true,
                headerLargeStyle: {
                    backgroundColor: "transparent"
                }
            })
    }}></Stack>
```
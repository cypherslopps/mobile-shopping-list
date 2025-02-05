import React from 'react'
import { View } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { useSignIn } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import Button from '@/components/ui/Button'
import TextInput from '@/components/ui/TextInput'

const SignInScreen = () => {
    const { signIn, setActive, isLoaded } = useSignIn();

    const [formData, setFormData] = React.useState({
        email: "",
        password: ""
    });
    const [isSigningIn, setIsSigningIn] = React.useState(false);

    return (
        <View>
            <ThemedText type="title">Sign In</ThemedText>
            <Link 
                href="/sign-up"
                style={{
                    color: "white"
                }}
            >
                Go to Sign up
            </Link>
            <TextInput label="hello" placeholder="Hello" />
            <Button loading={true}>Hello</Button>
        </View>
    )
}

export default SignInScreen
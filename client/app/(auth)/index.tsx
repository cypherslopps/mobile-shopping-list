import React from 'react'

import { ThemedText } from '@/components/ThemedText'
import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import Button from '@/components/ui/Button'
import TextInput from '@/components/ui/TextInput'
import { BodyScrollView } from '@/components/ui/BodyScrollView'
import { View } from 'react-native'
import { appleBlue } from '@/constants/Colors'
import { ClerkAPIError } from '@clerk/types'

const SignInScreen = () => {
    const { signIn, setActive, isLoaded } = useSignIn();
    const [formData, setFormData] = React.useState({
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const isValid = Object.values(formData).every(val => val !== "");
    const [errors, setErrors] = React.useState<ClerkAPIError[]>([]);

    const handleInput = (formName: string) => {
        return (value: any) => {
            setFormData((prev: any) => ({
                ...prev,
                [formName]: value
            }));
        }
    }

    const onSignInPress = React.useCallback(async () => {
        if (!isLoaded) return;

        try {
            setIsLoading(true);
            const completeSignin = await signIn.create({
                identifier: formData.email,
                password: formData.password
            });

            // This indicated the user is signed in
            await setActive({ session: completeSignin.createdSessionId })
        } catch (err) {
            if (isClerkAPIResponseError(err)) setErrors(err.errors);
            console.log('err', err, isClerkAPIResponseError(err));
        } finally {
            setIsLoading(false);
        }
    }, [isLoaded, signIn, formData.email, formData.password, setActive])

    return (
        <BodyScrollView
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingVertical: 10
            }}
        >
            <TextInput 
                label="Email" 
                placeholder="Enter email" 
                value={formData.email}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={handleInput("email")}
            />

            <TextInput 
                label="Password" 
                placeholder="Enter password" 
                value={formData.password}
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={handleInput("password")}
            />
            
            <Button 
                onPress={onSignInPress}
                disabled={!isValid || isLoading}
                loading={isLoading}
            >
                Sign in
            </Button>

            {errors.map(err => (
                <ThemedText
                    key={err.longMessage}
                    style={{ color: "red" }}
                >
                    {err.longMessage}
                </ThemedText>
            ))}

            <Link
                href="/(auth)/reset-password"
                style={{
                    color: appleBlue,
                    textAlign: "right",
                    marginTop: 5,
                    textDecorationLine: "underline",
                    fontSize: 15
                }}
            >
                Forgot Password?
            </Link>

            <View style={{ marginTop: 26, flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5 }}>
                <ThemedText>Don't have an account?</ThemedText>
                <Link
                    href="/sign-up"
                    style={{
                        color: appleBlue,
                        textAlign: "right",
                        textDecorationLine: "underline",
                        fontSize: 15.5
                    }}
                >
                    Sign up
                </Link>
            </View>
        </BodyScrollView>
    )
}

export default SignInScreen

// Password: Tronna23

// etimdaniel08@gmail.com - Truce222
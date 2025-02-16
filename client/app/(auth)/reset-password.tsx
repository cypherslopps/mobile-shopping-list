import React, { useState } from 'react'

import { ThemedText } from '@/components/ThemedText'
import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo'
import { router } from 'expo-router'
import Button from '@/components/ui/Button'
import TextInput from '@/components/ui/TextInput'
import { BodyScrollView } from '@/components/ui/BodyScrollView'
import { ClerkAPIError } from '@clerk/types'

const ResetPasswordScreen = () => {
    const { signIn, setActive, isLoaded } = useSignIn();
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
        code: ""
    });
    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [errors, setErrors] = useState<ClerkAPIError[]>([]);

    const handleInput = (formName: string) => {
        return (value: any) => {
            setFormData((prev: any) => ({
                ...prev,
                [formName]: value
            }));
        }
    }

    const onVerifyPress = React.useCallback(async () => {
        try {
            setIsLoading(true);
            await signIn!.create({
                strategy: "reset_password_email_code",
                identifier: formData.email
            });
            setSuccessfulCreation(true);
            setErrors([]);
        } catch(err) {
            if (isClerkAPIResponseError(err)) setErrors(err.errors);
            console.log('err', err, isClerkAPIResponseError(err));
            console.error(JSON.stringify(err, null, 2));
        } finally {
            setIsLoading(false);
        }
    }, [isLoaded, formData.email, signIn]);

    const onPasswordReset = React.useCallback(async () => {
        try {
            setIsLoading(true);

            const result = await signIn!.attemptFirstFactor({
                strategy: "reset_password_email_code",
                code: formData.code,
                password: formData.password
            });
            console.log(result, "result");

            alert("Password reset successful.");

            await setActive!({ session: result.createdSessionId });
        } catch(err) {
            alert(err);
        } finally {
            setIsLoading(false);
        }
    }, [isLoaded, formData.code, formData.password, signIn, setActive, router]);

    if (!successfulCreation) {
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

                <Button 
                    onPress={onVerifyPress}
                    disabled={!formData.email || isLoading}
                    loading={isLoading}
                >
                    Continue
                </Button>

                {errors.map(err => (
                    <ThemedText
                        key={err.longMessage}
                        style={{ color: "red" }}
                    >
                        {err.longMessage}
                    </ThemedText>
                ))}
            </BodyScrollView>
        )
    }

    return (
        <BodyScrollView
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingVertical: 10
            }}
        >
            <TextInput 
                label={`Enter the verification code sent to ${formData.email}`}
                placeholder="Enter code"  
                value={formData.code}
                keyboardType="phone-pad"
                onChangeText={handleInput("code")}
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
                onPress={onPasswordReset}
                disabled={!(formData.password && formData.code) || isLoading}
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
        </BodyScrollView>
    )
}

export default ResetPasswordScreen
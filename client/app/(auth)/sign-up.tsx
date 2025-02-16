import * as React from "react";

import {
    Text,
    View
} from "react-native";
import TextInput from "@/components/ui/TextInput";
import {
    useSignUp
} from "@clerk/clerk-expo";
import {
    Link,
    useRouter
} from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import useForm from "@/hooks/useForm";
import Button from "@/components/ui/Button";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { appleBlue } from "@/constants/Colors";

const SignupScreen = () => {
    const { 
        isLoaded,
        signUp,
        setActive 
    } = useSignUp();
    const router = useRouter();

    const {formData, handleInput} = useForm({
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const [code, setCode] = React.useState("");
    const [pendingVerification, setPendingVerification] = React.useState(false);
    const isValid = Object.values(formData).every(val => val !== "");

    // Handle Submission of sign-up form
    const onSignUpPress = async () => {
        if (!isLoaded) return;

        try {
            setIsLoading(true);

            await signUp.create({
                emailAddress: formData.email,
                password: formData.password
            });

            // Send user an email with verification code 
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            // Set 'pendingVerification' to true to display second form and capture OTP code
            setPendingVerification(true);
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        } finally {
            setIsLoading(false);
        }
    }

    // Handle form
    const onVerifyPress = async () => {
        if (!isLoaded) return;

        try {
            setIsLoading(true);

            // Verify code
            const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

            // Set session and redirect user if the user is successfully verified
            if (signUpAttempt.status === "complete") {
                await setActive({ session: signUpAttempt.createdSessionId });
                router.replace("/");
            } else {
                console.error(JSON.stringify(signUpAttempt, null, 2));
            }
        } catch (err) {
            console.log(JSON.stringify(err, null, 2));
        } finally {
            setIsLoading(true);
        }
    } 

    if (pendingVerification) {
        return <BodyScrollView
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingVertical: 10
                }}
            >
                <Text>Verify your email</Text>
                <TextInput 
                    value={code}
                    placeholder="Enter your verification code"
                    onChangeText={code => setCode(code)}
                    keyboardType="phone-pad"
                />
                <Button 
                    onPress={onVerifyPress}
                    disabled={!isValid || isLoading}
                    loading={isLoading}
                >
                    Verify
                </Button>
            </BodyScrollView>
    }

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
                autoCapitalize="none"
                value={formData.password}
                placeholder="Enter Password"
                secureTextEntry={true}
                onChangeText={handleInput("password")}
            />
            
            <Button 
                onPress={onSignUpPress}
                disabled={!isValid || isLoading}
                loading={isLoading}
            >
                Sign up
            </Button>

            <View style={{ marginTop: 26, flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5 }}>
                <ThemedText>Already have an account?</ThemedText>
                <Link
                    href="/(auth)"
                    style={{
                        color: appleBlue,
                        textAlign: "right",
                        textDecorationLine: "underline",
                        fontSize: 15.5
                    }}
                >
                    Sign in
                </Link>
            </View>
        </BodyScrollView>
    )
}

export default SignupScreen;
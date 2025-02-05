import * as React from "react";

import {
    Text,
    TextInput,
    Button,
    View,
    TextInputProps
} from "react-native";
import {
    useSignUp
} from "@clerk/clerk-expo";
import {
    useRouter
} from "expo-router";
import { ThemedText } from "@/components/ThemedText";

type FormName = "email" | "password";

const Signup = () => {
    const { 
        isLoaded,
        signUp,
        setActive 
    } = useSignUp();
    const router = useRouter();

    const [formData, setFormData] = React.useState({
        email: "",
        password: ""
    });
    const [code, setCode] = React.useState("");
    const [pendingVerification, setPendingVerification] = React.useState(false);

    // Handle Input's 
    const handleInput = (formName: string) => {
        return (value: any) => {

            if (formName === "email") {
                // Set Email Value
                setFormData(prev => ({
                    ...prev,
                    email: value
                }))
            } else if (formName === "password") {
                // Set Password Value
                setFormData(prev => ({
                    ...prev,
                    password: value
                }))
            }
        }
    }

    // Handle Submission of sign-up form
    const onSignUpPress = async () => {
        if (!isLoaded) return;

        try {
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
        }
    }

    // Handle form
    const onVerifyPress = async () => {
        if (!isLoaded) return;

        try {
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
        }
    } 

    if (pendingVerification) {
        return <>
            <Text>Verify your email</Text>
            <TextInput 
                value={code}
                placeholder="Enter your verification code"
                onChangeText={code => setCode(code)}
                style={{
                    backgroundColor: "white"
                }}
            />
            <Button
                title="Verify"
                onPress={onVerifyPress} 
            />
        </>
    }

    return (
        <View>
            <ThemedText type="title">Sign Up</ThemedText>
            <TextInput 
                autoCapitalize="none"
                value={formData.email}
                placeholder="Enter email"
                onChangeText={handleInput("email")}
                style={{
                    backgroundColor: "white"
                }}
            />
            <TextInput 
                autoCapitalize="none"
                value={formData.password}
                placeholder="Enter Password"
                onChangeText={handleInput("password")}
                style={{
                    backgroundColor: "white"
                }}
            />
            <Button 
                title="Submit"
                onPress={onSignUpPress}
            />
        </View>
    )
}

export default Signup;
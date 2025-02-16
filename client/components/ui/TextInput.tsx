import { appleBlue, appleRed, zincColors } from "@/constants/Colors";
import React from "react";
import { 
    ActivityIndicator, 
    Pressable, 
    StyleSheet, 
    TextStyle,
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps, 
    useColorScheme, 
    ViewStyle,
    View
} from "react-native";
import { ThemedText } from "../ThemedText";

type InputVariant = "default" | "filled" | "outline" | "ghost";
type InputSize = "sm" | "md" | "lg";

interface TextInputProps extends Omit<RNTextInputProps, "style"> {
    label?: string;
    error?: string;
    variant?: InputVariant;
    size?: InputSize;
    disabled?: boolean;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
}

export const TextInput: React.FC<TextInputProps> = ({
    label,
    error,
    variant = "default",
    size = "md",
    containerStyle,
    inputStyle,
    disabled = false,
    ...props
}) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    const sizeStyles: Record<
        InputSize,
        {
            height: number;
            fontSize: number;
            padding: Number;
        }
    > = {
        sm: { height: 36, fontSize: 14, padding: 12 },
        md: { height: 44, fontSize: 16, padding: 14 },
        lg: { height: 55, fontSize: 18, padding: 20 }
    }

    const getVariantStyle = () => {
        const baseStyle: ViewStyle = {
            borderRadius: 12,
            backgroundColor: isDark ? zincColors[900] : "rgba(229,229, 234)"
        }

        switch(variant) {
            case "filled": 
                return {
                    ...baseStyle,
                    backgroundColor: isDark ? zincColors[700] : zincColors[100]
                }
            case "ghost": 
                return {
                    ...baseStyle,
                    backgroundColor: "transparent"
                }
            case "outline": 
                return {
                    ...baseStyle,
                    borderWidth: 1,
                    borderColor: isDark ? zincColors[600] : zincColors[200]
                }
            default: 
                return baseStyle;
        }
    }

    const getTextColor = () => {
        if (disabled) {
            return isDark ? zincColors[500] : zincColors[400]
        }

        return isDark ? zincColors[50] : zincColors[900];
    }

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <ThemedText style={styles.label}>{label}</ThemedText>}
            <View style={[getVariantStyle(), disabled && styles.disabled]}>
                <RNTextInput 
                    style={[
                        {
                            height: sizeStyles[size].height,
                            fontSize: sizeStyles[size].fontSize,
                            padding: sizeStyles[size].padding as number,
                            color: getTextColor()
                        },
                        inputStyle
                    ]}
                    placeholderTextColor={isDark ? zincColors[500] : zincColors[400]}
                    editable={!disabled}
                    {...props}
                />
                {error && <ThemedText style={styles.error}>{error}</ThemedText>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16
    },
    label: {
        marginBottom: 4
    },
    disabled: {
        opacity: 0.5
    },
    error: {
        color: appleRed,
        marginTop: 4
    }
})

export default TextInput;
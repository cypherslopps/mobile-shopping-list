import React from "react";

type FormReturnData = {
    formData: any,
    setFormData: (data: any) => void;
    isLoading: boolean;
    handleInput: any;
    setIsLoading: (state: boolean) => void;
    isValid: boolean
}

const useForm = (propsData: any) => {
    const [formData, setFormData] = React.useState(propsData);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const isValid = Object.values(formData).every(val => val !== "");

    // Handle Input's 
    const handleInput = (formName: string) => {
        return (value: any) => {
            if (formName === "email") {
                // Set Email Value
                setFormData((prev: any) => ({
                    ...prev,
                    email: value
                }));
            } else if (formName === "password") {
                // Set Password Value
                setFormData((prev: any) => ({
                    ...prev,
                    password: value
                }));
            }
        }
    }

    return {
        formData, 
        setFormData, 
        handleInput, 
        isLoading: isLoading as boolean, 
        setIsLoading,
        isValid
    } as FormReturnData;
}

export default useForm;
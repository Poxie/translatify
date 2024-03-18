import FontSizes from "@/constants/FontSizes";
import Spacing from "@/constants/Spacing";
import { StyleProp, StyleSheet, TextInput, TextStyle } from "react-native";

export default function Input({
    defaultValue,
    placeholder,
    onTextChange,
    style,
    isPassword,
    inputMode,
    multiline=true,
}: {
    placeholder: string;
    onTextChange: (text: string) => void;
    style?: StyleProp<TextStyle>;
    defaultValue?: string;
    multiline?: boolean;
    isPassword?: boolean;
    inputMode?: "text" | "email";
}) {
    return(
        <TextInput 
            placeholder={placeholder}
            style={[styles.container, style]}
            onChangeText={onTextChange}
            multiline={multiline}
            inputMode={inputMode}
            secureTextEntry={isPassword}
            defaultValue={defaultValue}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Spacing.primary,
        paddingBottom: Spacing.primary,
        paddingHorizontal: Spacing.primary,
        fontSize: FontSizes.default,
    }
})
import FontSizes from "@/constants/FontSizes";
import Spacing from "@/constants/Spacing";
import { StyleProp, StyleSheet, TextInput, TextStyle } from "react-native";

export default function Input({
    placeholder,
    onTextChange,
    style,
    multiline=true,
}: {
    placeholder: string;
    onTextChange: (text: string) => void;
    style?: StyleProp<TextStyle>;
    multiline?: boolean;
}) {
    return(
        <TextInput 
            placeholder={placeholder}
            style={[styles.container, style]}
            onChangeText={onTextChange}
            multiline={multiline}
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
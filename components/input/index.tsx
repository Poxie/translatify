import FontSizes from "@/constants/FontSizes";
import Spacing from "@/constants/Spacing";
import { StyleProp, StyleSheet, TextInput, TextStyle, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import useColors from "@/hooks/useColors";

const ICON_SIZE = 26;
export default function Input({
    defaultValue,
    placeholder,
    onTextChange,
    onBlur,
    onFocus,
    style,
    isPassword,
    inputMode,
    icon,
    multiline=true,
}: {
    placeholder: string;
    onTextChange: (text: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    style?: StyleProp<TextStyle>;
    defaultValue?: string;
    multiline?: boolean;
    isPassword?: boolean;
    inputMode?: "text" | "email";
    icon?: string;
}) {
    const colors = useColors();
    return(
        <View style={styles.container}>
            {icon && (
                <MaterialIcons 
                    name={icon as any} 
                    size={ICON_SIZE} 
                    color={colors.muted}
                    style={styles.icon}
                />
            )}
            <TextInput 
                placeholder={placeholder}
                onFocus={onFocus}
                onBlur={onBlur}
                style={[
                    styles.input, 
                    style,
                    { paddingLeft: icon ? Spacing.primary + ICON_SIZE : Spacing.primary }
                ]}
                onChangeText={onTextChange}
                multiline={multiline}
                inputMode={inputMode}
                secureTextEntry={isPassword}
                defaultValue={defaultValue}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    icon: {
        opacity: .5,
        position: 'absolute',
        left: Spacing.secondary,
    },
    input: {
        flex: 1,
        paddingTop: Spacing.primary,
        paddingBottom: Spacing.primary,
        paddingHorizontal: Spacing.primary,
        fontSize: FontSizes.default,
    }
})
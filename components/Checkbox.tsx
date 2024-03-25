import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import Spacing from "@/constants/Spacing";
import useColors from "@/hooks/useColors";
import BorderRadius from "@/constants/BorderRadius";

export default function Checkbox({ onChange, style, active, size=24 }: {
    onChange?: (value: boolean) => void;
    style?: StyleProp<ViewStyle>;
    size?: number;
    active: boolean;
}) {
    const colors = useColors();

    return(
        <Pressable
            onPress={() => {
                if(onChange) onChange(!active)
            }}
            style={[
                styles.container,
                { 
                    backgroundColor: colors.background,
                    borderColor: colors.backgroundTertiary,
                    width: size,
                    height: size,
                },
            ]}
        >
            {active ? <MaterialIcons name="check" size={18} color="red" /> : ''}
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 2,
    }
})
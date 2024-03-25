import { Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import Spacing from "@/constants/Spacing";
import useColors from "@/hooks/useColors";
import BorderRadius from "@/constants/BorderRadius";

export default function Checkbox({ onChange, active }: {
    onChange?: (value: boolean) => void;
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
                },
            ]}
        >
            {active ? <MaterialIcons name="check" size={20} color="red" /> : ''}
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 2,
    }
})
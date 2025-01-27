import BorderRadius from "@/constants/BorderRadius";
import useColors from "@/hooks/useColors";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";

export default function Section({ children, style }: {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}) {
    const colors = useColors();
    return(
        <View style={[
            { backgroundColor: colors.backgroundSecondary },
            styles.container,
            style,
        ]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: BorderRadius.primary,
    }
})
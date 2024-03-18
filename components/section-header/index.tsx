import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import { Text } from "../Themed";
import FontSizes from "@/constants/FontSizes";
import useColors from "@/hooks/useColors";

export default function SectionHeader({ children, subHeader, style }: {
    children: string;
    subHeader?: string;
    style?: StyleProp<TextStyle>;
}) {
    const colors = useColors();

    return(
        <View style={styles.container}>
            <Text style={[styles.header, style]}>
                {children.toUpperCase()}
            </Text>
            {subHeader && (
                <Text style={[
                    styles.subHeader,
                    { color: colors.muted }
                ]}>
                    {subHeader}
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header: {
        fontSize: FontSizes.small,
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: FontSizes.small,
    },
})
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { Text } from "../Themed";
import FontSizes from "@/constants/FontSizes";

export default function SectionHeader({ children, style }: {
    children: string;
    style?: StyleProp<TextStyle>;
}) {
    return(
        <Text style={[styles.text, style]}>
            {children.toUpperCase()}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: FontSizes.small,
        fontWeight: 'bold',
    }
})
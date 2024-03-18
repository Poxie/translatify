import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../Themed";
import { Word } from "@/types";
import FontSizes from "@/constants/FontSizes";
import useColors from "@/hooks/useColors";
import Spacing from "@/constants/Spacing";

export default function ListItem({ term, definition }: Word) {
    const colors = useColors();

    return(
        <TouchableOpacity 
            style={styles.container}
        >
            <Text style={styles.term}>
                {term}
            </Text>
            <Text 
                numberOfLines={2}
                style={[
                    styles.definition,
                    { color: colors.muted },
                ]}
            >
                {definition}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: Spacing.quaternary
    },
    term: {
        fontSize: FontSizes.default,
        fontWeight: '600',
    },
    definition: {
        fontSize: FontSizes.default,
    }
})
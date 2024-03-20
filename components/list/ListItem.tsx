import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "../Themed";
import { Word } from "@/types";
import FontSizes from "@/constants/FontSizes";
import useColors from "@/hooks/useColors";
import Spacing from "@/constants/Spacing";
import { useNavigation } from "@react-navigation/native";
import { useDatabase } from "@/contexts/database";

export default function ListItem({ id, term, definition, wordClassId }: Word) {
    const { getWordClassById } = useDatabase();
    const colors = useColors();
    const navigation = useNavigation();

    const viewWord = () => {
        navigation.navigate('Modal', {
            screen: 'Create',
            params: {
                prevId: id,
            }
        })
    }

    const wordClass = getWordClassById(wordClassId);
    return(
        <TouchableOpacity 
            style={styles.container}
            onPress={viewWord}
        >
            <View style={styles.header}>
                <Text style={styles.term}>
                    {term}
                </Text>
                {wordClass && (
                    <Text style={{ color: colors.muted }}>
                        {wordClass.name}
                    </Text>
                )}
            </View>
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
        gap: Spacing.quaternary,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 4,
    },
    term: {
        fontSize: FontSizes.default,
        fontWeight: '600',
    },
    definition: {
        fontSize: FontSizes.small,
    }
})
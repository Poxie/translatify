import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "../Themed";
import { useDatabase } from "@/contexts/database";
import FontSizes from "@/constants/FontSizes";
import Spacing from "@/constants/Spacing";
import Checkbox from "../Checkbox";
import { useSelectWord } from "@/app/selectWord";
import { useNavigation } from "@react-navigation/native";

export default function SelectWordItem({ wordId }: {
    wordId: string;
}) {
    const navigation = useNavigation();
    const { getWordById, getWordClassById } = useDatabase();
    const { isSelected, toggleSelected, isExcluded } = useSelectWord();

    const word = getWordById(wordId);
    
    if(!word || isExcluded(word.id)) return null;

    const editWord = () => {
        // @ts-ignore
        navigation.push('Modal', {
            screen: 'Create',
            params: {
                prevId: wordId,
            }
        })
    }

    const selected = isSelected(word.id);
    const wordClass = getWordClassById(word.wordClassId);
    return(
        <TouchableOpacity 
            style={styles.container}
            onPress={() => toggleSelected(word.id)}
            onLongPress={editWord}
        >
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.term}>
                        {word.term}
                    </Text>
                    {wordClass && (
                        <Text>
                            {wordClass.name}
                        </Text>
                    )}
                </View>
                <Text>
                    {word.definition}
                </Text>
            </View>
            <Checkbox 
                active={selected}
                onChange={() => toggleSelected(word.id)}
            />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        gap: Spacing.primary,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    content: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        gap: Spacing.tertiary,
        alignItems: 'center',
        marginBottom: Spacing.quaternary,
    },
    term: {
        fontWeight: '600',
        fontSize: FontSizes.default,
    }
})
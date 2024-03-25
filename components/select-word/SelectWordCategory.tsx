import { useDatabase } from "@/contexts/database";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import SelectWordItem from "./SelectWordItem";
import SectionHeader from "../section-header";
import Spacing from "@/constants/Spacing";
import useColors from "@/hooks/useColors";
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";
import Checkbox from "../Checkbox";
import { useSelectWord } from "@/app/selectWord";

export default function SelectWordCategory({ categoryId }: {
    categoryId: string;
}) {
    const colors = useColors();
    const { words, categories, getCategoryById } = useDatabase();

    const { isSelected, isExcluded, bulkSelectWords, bulkDeselectWords } = useSelectWord();

    const [expanded, setExpanded] = useState(true);

    const category = getCategoryById(categoryId);
    const categoryWords = words.filter(word => word.categoryId === categoryId);

    const allWordsSelected = categoryWords.filter(word => !isExcluded(word.id)).every(word => isSelected(word.id));
    const empty = !categoryWords.length;

    const handleBulkSelect = (checked: boolean) => {
        const wordIds = categoryWords.map(word => word.id);

        if(checked) {
            bulkSelectWords(wordIds);
            return
        }
        bulkDeselectWords(wordIds);
    }

    if(!category || empty) return null;
    return(
        <View style={styles.container}>
            <TouchableOpacity 
                style={[
                    styles.header,
                    { borderColor: colors.backgroundTertiary },
                ]}
                onPress={() => setExpanded(!expanded)}
            >
                <View style={styles.headerContent}>
                    <MaterialIcons 
                        name="arrow-forward-ios" 
                        size={12}
                        style={{
                            transform: [
                                { rotate: expanded ? '90deg' : '0deg' },
                            ],
                        }}
                    />
                    <SectionHeader>
                        {category.name}
                    </SectionHeader>
                </View>
                <Checkbox 
                    onChange={handleBulkSelect}
                    active={allWordsSelected}
                />
            </TouchableOpacity>
            {expanded && categoryWords.map(word => (
                <SelectWordItem
                    wordId={word.id}
                    key={word.id}
                />
            ))}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        gap: Spacing.secondary,
    },
    header: {
        paddingVertical: Spacing.secondary,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.tertiary,
    }
})
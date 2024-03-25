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

export default function SelectWordCategory({ categoryId, isLast, isFirst }: {
    categoryId: string;
    isLast: boolean;
    isFirst: boolean;
}) {
    const colors = useColors();
    const { words, categories, getCategoryById } = useDatabase();

    const { isSelected, isExcluded, bulkSelectWords, bulkDeselectWords } = useSelectWord();

    const [expanded, setExpanded] = useState(true);

    const category = getCategoryById(categoryId);
    const categoryWords = words.filter(word => word.categoryId === categoryId && !isExcluded(word.id));

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
        <View>
            <TouchableOpacity 
                style={[
                    styles.header,
                    { 
                        borderColor: colors.backgroundTertiary,
                        borderBottomWidth: !expanded ? 0 : 1,
                        borderTopWidth: isFirst ? 0 : 1,
                    },
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
            {expanded && (
                <View style={styles.content}>
                    {categoryWords.map(word => (
                        <SelectWordItem
                            wordId={word.id}
                            key={word.id}
                        />
                    ))}
                </View>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.primary,
        paddingVertical: Spacing.primary,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.tertiary,
    },
    content: {
        marginVertical: Spacing.primary,
        paddingHorizontal: Spacing.primary,
        gap: Spacing.secondary,
    }
})
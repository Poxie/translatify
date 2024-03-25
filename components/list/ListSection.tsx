import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Section from "../section";
import ListCategory from "./ListCategory";
import Spacing from "@/constants/Spacing";
import { useDatabase } from "@/contexts/database";
import { Text } from "../Themed";
import ListItem from "./ListItem";

export default function ListSection({ categoryId, style }: {
    categoryId: string;
    style?: StyleProp<ViewStyle>;
}) {
    const { getCategoryById, words, categories } = useDatabase();

    const category = getCategoryById(categoryId);
    const categoryWords = words.filter(word => word.categoryId === category?.id);
    const categoryCategories = categories.filter(c => c.parentId === category?.id);
    const empty = !categoryWords.length && !categoryCategories.length;
    
    return(
        <View style={[
            styles.container,
            style,
        ]}>
            {(categoryWords.length !== 0 || empty) && (
                <Section style={styles.section}>
                    {categoryWords.map(word => (
                        <ListItem 
                            {...word}
                            key={word.id}
                        />
                    ))}
                    {empty && (
                        <Text style={styles.empty}>
                            This category is empty.
                        </Text>
                    )}
                </Section>
            )}
            {categoryCategories.map(category => (
                <Section
                    key={category.id}
                >
                    <ListCategory 
                        categoryId={category.id}
                    />
                </Section>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: Spacing.quaternary * 2,
    },
    section: {
        padding: Spacing.primary,
        gap: Spacing.secondary,
    },
    empty: {
        textAlign: 'center',
    }
})
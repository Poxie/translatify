import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Section from "../section";
import ListCategory from "./ListCategory";
import Spacing from "@/constants/Spacing";
import { useDatabase } from "@/contexts/database";
import { Text } from "../Themed";
import ListItem from "./ListItem";
import Divider from "../divider";
import React from "react";

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
        <Section style={style}>
            {categoryWords.length !== 0 && (
                <View style={[
                    styles.words,
                ]}>
                    {categoryWords.map(word => (
                        <ListItem 
                            {...word}
                            key={word.id}
                        />
                    ))}
                </View>
            )}
            {categoryWords.length !== 0 && categoryCategories.length !== 0 && (
                <Divider />
            )}
            {categoryCategories.map((category, index) => (
                <React.Fragment key={category.id}>
                    {index !== 0 && (
                        <Divider />
                    )}
                    <View style={styles.categories}>
                        <ListCategory 
                            categoryId={category.id}
                            key={category.id}
                        />
                    </View>
                </React.Fragment>
            ))}
            {empty && (
                <Text style={styles.empty}>
                    This category is empty.
                </Text>
            )}
        </Section>
    )
}

const styles = StyleSheet.create({
    words: {
        padding: Spacing.primary,
        gap: Spacing.secondary,
    },
    categories: {
        paddingVertical: Spacing.secondary,
    },
    section: {
        padding: Spacing.primary,
        gap: Spacing.secondary,
    },
    empty: {
        textAlign: 'center',
        paddingVertical: Spacing.primary,
    }
})
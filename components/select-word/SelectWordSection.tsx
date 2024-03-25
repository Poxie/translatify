import { useDatabase } from "@/contexts/database";
import { StyleSheet, View } from "react-native";
import SelectWordItem from "./SelectWordItem";
import Section from "../section";
import Spacing from "@/constants/Spacing";
import SectionHeader from "../section-header";
import SelectWordCategory from "./SelectWordCategory";
import { Category } from "@/types";
import useColors from "@/hooks/useColors";

export default function SelectWordSection({ categoryId }: {
    categoryId: string | null;
}) {
    const colors = useColors();
    const { words, categories, getCategoryById } = useDatabase();

    const category = getCategoryById(categoryId);
    const categoryWords = words.filter(word => word.categoryId === categoryId);

    const getNestedCategories = (categoryId: string | null) => {
        if(!categoryId) return [];
        
        const nestedCategories: Category[] = [];

        const getChildCategories = (categoryId: string) => {
            const childCategories = categories.filter(category => category.parentId === categoryId);
            nestedCategories.push(...childCategories);

            childCategories.forEach(category => {
                getChildCategories(category.id);
            })
        }
        getChildCategories(categoryId);

        return nestedCategories;
    }
    const nestedCategories = getNestedCategories(categoryId);

    return(
        <>
        <SectionHeader style={styles.header}>
            {category?.name || 'Uncategorized'}
        </SectionHeader>
        <Section style={styles.section}>
            {categoryWords.length !== 0 && (
                <View style={[
                    styles.uncategorized,
                    {
                        borderBottomWidth: nestedCategories.length ? 1 : 0,
                        borderColor: colors.backgroundTertiary,
                    }
                ]}>
                    {categoryWords.map(word => (
                        <SelectWordItem 
                            wordId={word.id}
                            key={word.id}
                        />
                    ))}
                </View>
            )}
            {nestedCategories.map((category, index) => (
                <SelectWordCategory 
                    categoryId={category.id}
                    isFirst={index === 0}
                    isLast={index === nestedCategories.length - 1}
                    key={category.id}
                />
            ))}
        </Section>
        </>
    )
}
const styles = StyleSheet.create({
    header: {
        marginBottom: Spacing.tertiary,
    },
    uncategorized: {
        padding: Spacing.primary,
    },
    section: {
        marginBottom: Spacing.primary,
    }
})
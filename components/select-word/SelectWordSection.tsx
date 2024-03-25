import { useDatabase } from "@/contexts/database";
import { StyleSheet, View } from "react-native";
import SelectWordItem from "./SelectWordItem";
import Section from "../section";
import Spacing from "@/constants/Spacing";
import SectionHeader from "../section-header";
import SelectWordCategory from "./SelectWordCategory";
import { Category } from "@/types";

export default function SelectWordSection({ categoryId }: {
    categoryId: string;
}) {
    const { words, categories, getCategoryById } = useDatabase();

    const category = getCategoryById(categoryId);
    const categoryWords = words.filter(word => word.categoryId === categoryId);

    const getNestedCategories = (categoryId: string) => {
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
            {categoryWords.map(word => (
                <SelectWordItem 
                    wordId={word.id}
                    key={word.id}
                />
            ))}
            {nestedCategories.map(category => (
                <SelectWordCategory 
                    categoryId={category.id}
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
    section: {
        padding: Spacing.primary,
        marginBottom: Spacing.primary,
        gap: Spacing.secondary,
    }
})
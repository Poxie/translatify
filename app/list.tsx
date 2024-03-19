import { Text } from "@/components/Themed";
import ListItem from "@/components/list/ListItem";
import Section from "@/components/section";
import SectionHeader from "@/components/section-header";
import Spacing from "@/constants/Spacing";
import { useDatabase } from "@/contexts/database";
import { Category, Word } from "@/types";
import { useMemo } from "react";
import { StyleSheet, SafeAreaView, View, ScrollView } from "react-native";

export default function ListScreen() {
    const { words, categories } = useDatabase();

    const getWordsByCategoryId = (categoryId: string | null) => (
        words.filter(word => word.categoryId === categoryId)
    )
    const sortCategories = (categories: Category[]) => (
        categories.sort((a,b) => a.name[0].localeCompare(b.name[0]))
    ) 

    let allCategories: { id: string | null, name: string }[] = sortCategories(categories);
    if(words.find(word => !word.categoryId)) {
        allCategories = [{ id: null, name: 'Uncategorized' }, ...sortCategories(categories)];
    }

    return(
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {allCategories.map(category => {
                    const words = getWordsByCategoryId(category.id);

                    return(
                        <View 
                            style={styles.sectionContainer} 
                            key={category.id}
                        >
                            <SectionHeader 
                                subHeader={`${words.length} words`}
                                style={styles.sectionHeader}
                            >
                                {category.name}
                            </SectionHeader>
                            <Section style={styles.section}>
                                {words.map(word => (
                                    <ListItem 
                                        {...word}
                                        key={word.id}
                                    />
                                ))}
                                {words.length === 0 && (
                                    <Text style={styles.empty}>
                                        This category is empty.
                                    </Text>
                                )}
                            </Section>
                        </View>
                    )
                })}
                {words.length === 0 && (
                    <Section style={styles.section}>
                        <Text style={styles.empty}>
                            No words to display.
                        </Text>
                    </Section>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Spacing.primary,
        paddingTop: 0,
    },
    sectionContainer: {
        marginBottom: Spacing.primary,
    },
    sectionHeader: {
        marginBottom: Spacing.tertiary
    },
    section: {
        padding: Spacing.primary,
        gap: Spacing.secondary
    },
    empty: {
        textAlign: 'center',
    }
})
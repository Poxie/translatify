import Link from "@/components/Link";
import { Text } from "@/components/Themed";
import ListCategory from "@/components/list/ListCategory";
import ListItem from "@/components/list/ListItem";
import ListSection from "@/components/list/ListSection";
import Section from "@/components/section";
import SectionHeader from "@/components/section-header";
import Spacing from "@/constants/Spacing";
import { useDatabase } from "@/contexts/database";
import useHeaderOptions from "@/hooks/useHeaderOptions";
import { Category, Word } from "@/types";
import { useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import { StyleSheet, SafeAreaView, View, ScrollView } from "react-native";

export default function ListScreen() {
    const navigation = useNavigation();
    const { words, categories } = useDatabase();

    const createWord = () => {
        navigation.navigate('Modal', {
            screen: 'Create',
        })
    }
    useHeaderOptions({
        onHeaderRightPress: createWord,
        headerRightText: 'Create',
        headerText: 'Word list'
    })

    const sortCategories = (categories: Category[]) => (
        categories.sort((a,b) => a.name[0].localeCompare(b.name[0]))
    ) 

    const uncategorizedWords = words.filter(word => !word.categoryId);
    const rootCategories = sortCategories(categories.filter(category => !category.parentId));
    return(
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                {uncategorizedWords.length !== 0 && (
                    <>
                    <SectionHeader style={styles.sectionHeader}>
                        Uncategorized
                    </SectionHeader>
                    <Section style={styles.section}>
                        {uncategorizedWords.map(word => (
                            <ListItem 
                                {...word}
                                key={word.id}
                            />
                        ))}
                    </Section>
                    </>
                )}
                {rootCategories.map(category => {
                    return(
                        <View 
                            style={{ marginBottom: Spacing.primary }}
                            key={category.id}
                        >
                            <Link
                                href="Modal"
                                screen="CreateCategory"
                                params={{ 
                                    prevId: category.id,
                                    canClose: true,
                                }}
                            >
                                <SectionHeader style={styles.sectionHeader}>
                                    {category.name}
                                </SectionHeader>
                            </Link>
                            <ListSection 
                                categoryId={category.id}
                                key={category.id}
                            />
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
        flex: 1,
    },
    sectionHeader: {
        marginBottom: Spacing.tertiary,
    },
    section: {
        padding: Spacing.primary,
        marginBottom: Spacing.primary,
        gap: Spacing.secondary,
    },
    empty: {
        textAlign: 'center',
    }
})
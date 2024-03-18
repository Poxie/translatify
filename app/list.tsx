import { Text } from "@/components/Themed";
import ListItem from "@/components/list/ListItem";
import Section from "@/components/section";
import SectionHeader from "@/components/section-header";
import Spacing from "@/constants/Spacing";
import { useDatabase } from "@/contexts/database";
import { StyleSheet, SafeAreaView } from "react-native";

export default function ListScreen() {
    const { words } = useDatabase();

    return(
        <SafeAreaView style={styles.container}>
            <SectionHeader style={styles.sectionHeader}>
                Uncategorized
            </SectionHeader>
            <Section style={styles.section}>
                {words.map(word => (
                    <ListItem 
                        {...word}
                        key={word.id}
                    />
                ))}
            </Section>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: Spacing.primary,
    },
    sectionHeader: {
        marginBottom: Spacing.tertiary
    },
    section: {
        padding: Spacing.primary,
        gap: Spacing.secondary
    }
})
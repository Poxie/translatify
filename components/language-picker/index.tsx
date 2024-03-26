import { useDatabase } from "@/contexts/database";
import useColors from "@/hooks/useColors";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "../Themed";
import Spacing from "@/constants/Spacing";
import FontSizes from "@/constants/FontSizes";
import BorderRadius from "@/constants/BorderRadius";

export default function LanguagePicker({ activeLanguageId, onSelect }: {
    activeLanguageId: string;
    onSelect: (languageId: string) => void;
}) {
    const colors = useColors();

    const { languages } = useDatabase();

    return(
        <ScrollView 
            style={styles.container}
            directionalLockEnabled
            horizontal
        >
            {languages.map(language => {
                const isActive = language.id === activeLanguageId;
                return(
                    <Pressable 
                        onPress={() => onSelect(language.id)}
                        style={[
                            styles.item,
                            {
                                backgroundColor: isActive ? colors.backgroundSecondary : colors.background,
                            }
                        ]}
                        key={language.id}
                    >
                        <Text style={styles.text}>
                            {language.name}
                        </Text>
                    </Pressable>
                )
            })}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: Spacing.secondary,
    },
    item: {
        padding: Spacing.secondary,
        borderTopLeftRadius: BorderRadius.primary,
        borderTopRightRadius: BorderRadius.primary,
    },
    text: {
        fontSize: FontSizes.default,
        fontWeight: '500'
    },
})
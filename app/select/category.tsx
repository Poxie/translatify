import { Text } from "@/components/Themed";
import Section from "@/components/section";
import FontSizes from "@/constants/FontSizes";
import Spacing from "@/constants/Spacing";
import { useDatabase } from "@/contexts/database";
import useColors from "@/hooks/useColors";
import useHeaderOptions from "@/hooks/useHeaderOptions";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ModalStackParamList } from "..";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Divider from "@/components/divider";
import React from "react";

export default function SelectCategoryScreen({ route: {
    params
} }: NativeStackScreenProps<ModalStackParamList, 'SelectCategory'>) {
    const { categories } = useDatabase();

    const colors = useColors();
    const navigation = useNavigation();

    const selectCategory = (categoryId: string) => {
        navigation.navigate({
            name: 'Modal',
            params: {
                screen: 'Create',
                params: {
                    ...params,
                    categoryId,
                },
            },
        })
    }

    const createCategory = () => {
        navigation.navigate('Modal', {
            screen: 'CreateCategory',
        })
    }

    useHeaderOptions({ 
        headerText: 'Select Category',
        headerRightText: 'Create',
        onHeaderRightPress: createCategory,
    });

    return(
        <View style={styles.container}>
            <Section style={styles.section}>
                {categories.map((category, index) => (
                    <React.Fragment key={category.id}>
                        <TouchableOpacity 
                            onPress={() => selectCategory(category.id)}
                        >
                            <Text style={styles.itemText}>
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                        {index !== categories.length - 1 && (
                            <Divider style={{ marginHorizontal: 0 }} />
                        )}
                    </React.Fragment>
                ))}
                {categories.length === 0 && (
                    <Text style={[
                        styles.empty,
                        { color: colors.muted },
                    ]}>
                        You have no categories yet.
                    </Text>
                )}
            </Section>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Spacing.primary,
        paddingVertical: Spacing.secondary,
    },
    section: {
        paddingHorizontal: Spacing.primary,
        paddingVertical: Spacing.primary - Spacing.secondary * 1.5,
    },
    itemText: {
        fontSize: FontSizes.default,
        fontWeight: '500',
        paddingVertical: Spacing.secondary * 1.5,
    },
    empty: {
        textAlign: 'center',
        padding: Spacing.primary,
        fontWeight: '600'
    },
})
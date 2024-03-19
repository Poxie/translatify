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
import { Ionicons } from "@expo/vector-icons";
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
                    categoryId: categoryId === params.currentActive ? null : categoryId,
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
            <Section>
                {categories.map((category, index) => (
                    <React.Fragment key={category.id}>
                        <TouchableOpacity 
                            onPress={() => selectCategory(category.id)}
                            style={styles.item}
                        >
                            <Text style={styles.itemText}>
                                {category.name}
                            </Text>
                            {category.id === params.currentActive && (
                                <Ionicons name="checkmark-outline" size={20} />
                            )}
                        </TouchableOpacity>
                        {index !== categories.length - 1 && (
                            <Divider />
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
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.secondary * 1.5,
    }, 
    itemText: {
        fontSize: FontSizes.default,
        fontWeight: '500',
    },
    empty: {
        textAlign: 'center',
        padding: Spacing.primary,
        fontWeight: '600'
    },
})
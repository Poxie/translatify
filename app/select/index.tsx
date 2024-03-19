import { Text } from "@/components/Themed";
import Divider from "@/components/divider";
import Section from "@/components/section";
import useColors from "@/hooks/useColors";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Ionicons }  from '@expo/vector-icons';
import Spacing from "@/constants/Spacing";
import FontSizes from "@/constants/FontSizes";

export type SelectItem = {
    id: string;
    name: string;
}
export default function Select({ items, currentActive, onSelect, emptyLabel }: {
    items: SelectItem[];
    currentActive: string;
    onSelect: (id: string) => void;
    emptyLabel?: string;
}) {
    const colors = useColors();

    return(
        <View style={styles.container}>
            <Section>
                {items.map((category, index) => (
                    <React.Fragment key={category.id}>
                        <TouchableOpacity 
                            onPress={() => onSelect(category.id)}
                            style={styles.item}
                        >
                            <Text style={styles.itemText}>
                                {category.name}
                            </Text>
                            {category.id === currentActive && (
                                <Ionicons name="checkmark-outline" size={20} />
                            )}
                        </TouchableOpacity>
                        {index !== items.length - 1 && (
                            <Divider />
                        )}
                    </React.Fragment>
                ))}
                {items.length === 0 && (
                    <Text style={[
                        styles.empty,
                        { color: colors.muted },
                    ]}>
                        You have no items yet.
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
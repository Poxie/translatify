import { Text } from "@/components/Themed";
import Divider from "@/components/divider";
import Section from "@/components/section";
import useColors from "@/hooks/useColors";
import React from "react";
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { Ionicons }  from '@expo/vector-icons';
import Spacing from "@/constants/Spacing";
import FontSizes from "@/constants/FontSizes";

export type SelectItem = {
    id: string;
    name: string;
}
export default function Select({ items, currentActive, onSelect, onLongPress, style, emptyLabel='You have no items yet.' }: {
    items: SelectItem[];
    currentActive: string;
    onSelect: (id: string) => void;
    onLongPress?: (id: string) => void;
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}) {
    const colors = useColors();

    return(
        <View style={[
            styles.container,
            style,
        ]}>
            <Section>
                {items.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <TouchableOpacity 
                            onLongPress={() => {
                                if(!onLongPress) return;
                                onLongPress(item.id);
                            }}
                            onPress={() => onSelect(item.id)}
                            style={styles.item}
                        >
                            <Text style={styles.itemText}>
                                {item.name}
                            </Text>
                            {item.id === currentActive && (
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
                        {emptyLabel}
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
import { Text } from "@/components/Themed";
import useHeaderOptions from "@/hooks/useHeaderOptions";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet } from "react-native";
import { ModalStackParamList } from ".";
import { useDatabase } from "@/contexts/database";
import SelectWordSection from "@/components/select-word/SelectWordSection";
import Spacing from "@/constants/Spacing";
import { createContext, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const SelectWordContext = createContext<null | {
    isExcluded: (id: string) => boolean;
    isSelected: (id: string) => boolean;
    toggleSelected: (id: string) => void;
    bulkSelectWords: (ids: string[]) => void;
    bulkDeselectWords: (ids: string[]) => void;
}>(null);

export const useSelectWord = () => {
    const context = useContext(SelectWordContext);
    if(!context) {
        throw new Error('useSelectWord must be used within a SelectWordProvider');
    }
    return context;
}

export default function SelectWordScreen({ route: {
    params
} }: NativeStackScreenProps<ModalStackParamList, 'SelectWord'>) {
    const navigation = useNavigation();
    const { words, categories } = useDatabase();
    
    const [selectedIds, setSelectedIds] = useState<string[]>(params.selectedIds || []);

    const bulkSelectWords = (ids: string[]) => {
        setSelectedIds(prev => prev.concat(ids.filter(id => !isExcluded(id))));
    }
    const bulkDeselectWords = (ids: string[]) => {
        setSelectedIds(prev => prev.filter(id => !ids.includes(id)));
    }
    const toggleSelected = (id: string) => {
        setSelectedIds(prev => {
            if(prev.includes(id)) {
                return prev.filter(i => i !== id);
            }
            return prev.concat(id);
        })
    }
    const isSelected = (id: string) => selectedIds.includes(id);
    const isExcluded = (id: string) => params.excludedIds?.includes(id) || false;

    const disabled = !selectedIds.length && params.required;
    const handleSelect = () => {
        if(disabled) return;

        navigation.navigate('Modal', {
            screen: params.screen,
            params: {
                ...params,
                [params.returnProp || 'selectedIds']: selectedIds,
            }
        })
    }

    useHeaderOptions({
        headerText: params?.headerText || 'Select Words',
        headerRightText: 'Done',
        headerRightDisabled: disabled,
        onHeaderRightPress: handleSelect,
    })

    const rootWords = words.filter(w => !w.categoryId);
    const rootCategories = categories.filter(c => !c.parentId);

    const value = {
        isExcluded,
        isSelected,
        toggleSelected,
        bulkSelectWords,
        bulkDeselectWords,
    }
    return(
        <SelectWordContext.Provider value={value}>
            <ScrollView style={styles.container}>
                {rootWords.length !== 0 && (
                    <SelectWordSection 
                        categoryId={null}
                        key="uncategorized"
                    />
                )}
                {rootCategories.map(category => (
                    <SelectWordSection 
                        categoryId={category.id}
                        key={category.id}
                    />
                ))}
            </ScrollView>
        </SelectWordContext.Provider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Spacing.secondary,
        paddingHorizontal: Spacing.primary,
    }
})
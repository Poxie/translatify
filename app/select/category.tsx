import { useDatabase } from "@/contexts/database";
import useHeaderOptions from "@/hooks/useHeaderOptions";
import { useNavigation } from "@react-navigation/native";
import { ModalStackParamList } from "..";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import Select from ".";

export default function SelectCategoryScreen({ route: {
    params
} }: NativeStackScreenProps<ModalStackParamList, 'SelectCategory'>) {
    const { categories } = useDatabase();

    const navigation = useNavigation();

    const selectCategory = (categoryId: string) => {
        navigation.navigate({
            name: 'Modal',
            params: {
                screen: 'Create',
                params: {
                    ...params,
                    categoryId: categoryId === params?.currentActive ? null : categoryId,
                },
            },
        })
    }

    const createCategory = () => {
        navigation.navigate('Modal', {
            screen: 'CreateCategory',
        })
    }
    const editCategory = (id: string) => {
        navigation.navigate('Modal', {
            screen: 'CreateCategory',
            params: {
                prevId: id,
            },
        })
    }

    useHeaderOptions({ 
        headerText: 'Select Category',
        headerRightText: 'Create',
        onHeaderRightPress: createCategory,
    });

    return(
        <Select 
            currentActive={params?.currentActive}
            items={categories}
            onSelect={selectCategory}
            onLongPress={editCategory}
            emptyLabel="You have no categories yet."
        />
    )
}
import { useDatabase } from "@/contexts/database";
import useHeaderOptions from "@/hooks/useHeaderOptions";
import { useNavigation } from "@react-navigation/native";
import { ModalStackParamList } from "..";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import Select from ".";

export default function SelectLanguageScreen({ route: {
    params
} }: NativeStackScreenProps<ModalStackParamList, 'SelectLanguage'>) {
    const { languages } = useDatabase();

    const navigation = useNavigation();

    const selectLanguage = (languageId: string) => {
        navigation.navigate({
            name: 'Modal',
            params: {
                screen: 'Create',
                params: {
                    ...params,
                    languageId: languageId === params.currentActive ? null : languageId,
                },
            },
        })
    }

    const createLanguage = () => {
        navigation.navigate('Modal', {
            screen: 'CreateLanguage',
        })
    }

    useHeaderOptions({ 
        headerText: 'Select Language',
        headerRightText: 'Create',
        onHeaderRightPress: createLanguage,
    });

    return(
        <Select 
            currentActive={params.currentActive}
            items={languages}
            onSelect={selectLanguage}
            emptyLabel="You have no languages yet."
        />
    )
}
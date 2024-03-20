import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Select from ".";
import { ModalStackParamList } from "..";
import { useDatabase } from "@/contexts/database";
import { useNavigation } from "@react-navigation/native";
import useHeaderOptions from "@/hooks/useHeaderOptions";

export default function SelectWordClassScreen({ route: {
    params
} }: NativeStackScreenProps<ModalStackParamList, 'SelectWordClass'>) {
    const { wordClasses } = useDatabase();

    const navigation = useNavigation();

    const selectWordClass = (id: string) => {
        navigation.navigate({
            name: 'Modal',
            params: {
                screen: 'Create',
                params: {
                    ...params,
                    wordClassId: id === params.currentActive ? null : id,
                },
            },
        })
    }

    const createWordClass = () => {
        navigation.navigate('Modal', {
            screen: 'CreateWordClass',
        })
    }
    const editWordClass = (id: string) => {
        navigation.navigate({
            name: 'Modal',
            params: {
                screen: 'CreateWordClass',
                params: {
                    prevId: id,
                },
            },
        })
    }

    useHeaderOptions({
        headerText: 'Select Class',
        headerRightText: 'Create',
        onHeaderRightPress: createWordClass,
    })

    return(
        <Select 
            currentActive={params.currentActive}
            items={wordClasses}
            onSelect={selectWordClass}
            onLongPress={editWordClass}
            emptyLabel="You have no word classes yet."
        />
    )
}
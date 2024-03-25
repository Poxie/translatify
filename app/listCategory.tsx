import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView, StyleSheet } from "react-native"
import { RootStackParamList } from "."
import { useDatabase } from "@/contexts/database"
import useHeaderOptions from "@/hooks/useHeaderOptions";
import Spacing from "@/constants/Spacing";
import ListSection from "@/components/list/ListSection";
import { useNavigation } from "@react-navigation/native";

export default function ListCategoryScreen({ route: {
    params
} }: NativeStackScreenProps<RootStackParamList, 'ListCategory'>) {
    const navigation = useNavigation();
    const { getCategoryById } = useDatabase();

    const category = getCategoryById(params?.categoryId);

    const createWord = () => {
        navigation.navigate('Modal', {
            screen: 'Create',
            params: {
                categoryId: params.categoryId,
            }
        })
    }
    useHeaderOptions({
        headerText: category?.name || 'Unknown Category',
        onHeaderRightPress: createWord,
        headerRightText: 'Create',
    })
    return(
        <SafeAreaView style={{ marginHorizontal: Spacing.primary }}>
            <ListSection 
                categoryId={params.categoryId}
            />
        </SafeAreaView>
    )
}
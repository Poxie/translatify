import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView, StyleSheet } from "react-native"
import { RootStackParamList } from "."
import { useDatabase } from "@/contexts/database"
import useHeaderOptions from "@/hooks/useHeaderOptions";
import Spacing from "@/constants/Spacing";
import ListSection from "@/components/list/ListSection";

export default function ListCategoryScreen({ route: {
    params
} }: NativeStackScreenProps<RootStackParamList, 'ListCategory'>) {
    const { getCategoryById } = useDatabase();

    const category = getCategoryById(params?.categoryId);

    useHeaderOptions({
        headerText: category?.name || 'Unknown Category',
    })
    return(
        <SafeAreaView style={{ marginHorizontal: Spacing.primary }}>
            <ListSection 
                categoryId={params.categoryId}
            />
        </SafeAreaView>
    )
}
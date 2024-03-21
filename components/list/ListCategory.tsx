import { useDatabase } from "@/contexts/database";
import { StyleSheet, View } from "react-native";
import { Text } from "../Themed";
import FontSizes from "@/constants/FontSizes";
import { MaterialIcons } from "@expo/vector-icons";
import useColors from "@/hooks/useColors";
import Spacing from "@/constants/Spacing";
import Link from "../Link";
import { useNavigation } from "@react-navigation/native";

export default function ListCategory({ categoryId }: {
    categoryId: string;
}) {
    const colors = useColors();
    const navigation = useNavigation();
    const { getCategoryById, getCategoryWordCount } = useDatabase();

    const editCategory = () => {
        navigation.navigate('Modal', {
            screen: 'CreateCategory',
            params: {
                prevId: categoryId,
                canClose: true,
            },
        })
    }

    const wordCount = getCategoryWordCount(categoryId);
    const category = getCategoryById(categoryId);
    if(!category) return null;
    return(
        <Link 
            style={styles.container}
            href="ListCategory"
            params={{ categoryId }}
            onLongPress={editCategory}
            push
        >
            <View style={styles.headerContainer}>
                <Text style={styles.header}>
                    {category.name}
                </Text>
                <Text>
                    ({wordCount} words)
                </Text>
            </View>
            <MaterialIcons 
                name="arrow-forward-ios" 
                color={colors.muted}
                size={16}
            />
        </Link>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.primary,
    },
    headerContainer: {
        flexDirection: 'row',
        gap: Spacing.tertiary,
        alignItems: 'center',
    },
    header: {
        fontSize: FontSizes.default,
        fontWeight: '600',
    },
})
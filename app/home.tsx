import { FontAwesome6 } from "@expo/vector-icons";
import { Text, View } from "@/components/Themed";
import { View as DefaultView, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import Spacing from "@/constants/Spacing";
import useColors from "@/hooks/useColors";
import BorderRadius from "@/constants/BorderRadius";
import Colors from "@/constants/Colors";
import CreateMenu from "@/components/create-menu";
import Link from "@/components/Link";

const TABS = [
    { text: 'Search', icon: <FontAwesome6 name="magnifying-glass" size={30} />, path: 'Search' },
    { text: 'Word list', icon: <FontAwesome6 name="rectangle-list" size={30} />, path: 'List' },
    { text: 'Favorites', icon: <FontAwesome6 name="heart" size={30} />, path: 'Favorites' },
    { text: 'Quiz', icon: <FontAwesome6 name="graduation-cap" size={30} />, path: 'Quiz' },
    { text: 'Import', icon: <FontAwesome6 name="download" size={30} />, path: 'Import' },
    { text: 'Export', icon: <FontAwesome6 name="upload" size={30} />, path: 'Export' },
] as const;
export default function HomeScreen() {
    const { backgroundSecondary } = useColors();

    return(
        <SafeAreaView style={styles.tabContainer}>
            <FlatList 
                scrollEnabled={false}
                data={TABS}
                numColumns={2}
                renderItem={({ item, index }) => (
                    <Link
                        href={item.path}
                        style={{
                            backgroundColor: backgroundSecondary,
                            ...styles.tab,
                        }}
                    >
                        {item.icon}
                        <Text style={{ fontSize: 18 }}>
                            {item.text}
                        </Text>
                    </Link>
                )}
                style={styles.tabContainer}
                contentContainerStyle={{ gap: Spacing.tertiary }}
                columnWrapperStyle={{ gap: Spacing.tertiary }}
            />
            <CreateMenu />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    tabContainer: {
        gap: Spacing.secondary,
        paddingHorizontal: Spacing.primary,
        flex: 1,
    },
    tab: {
        borderRadius: BorderRadius.primary,
        padding: Spacing.primary * 2,
        gap: Spacing.secondary,
        alignItems: 'center',
        flex: 1,
    }
})
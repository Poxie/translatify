import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "../Themed";
import Spacing from "@/constants/Spacing";
import FontSizes from "@/constants/FontSizes";
import { MaterialIcons } from "@expo/vector-icons";
import useColors from "@/hooks/useColors";
import Link from "../Link";
import { ModalStackParamList } from "@/app/index";

export default function Selector({
    activeText,
    selectorText,
    screen,
    params,
    push,
}: {
    activeText?: string;
    selectorText: string;
    screen: keyof ModalStackParamList;
    params?: Record<string, any>;
    push?: boolean;
}) {
    const colors = useColors();

    return(
        <Link 
            href={'Modal'} 
            screen={screen}
            params={params}
            push={push}
            style={styles.container}
        >
            <Text style={styles.text}>
                {selectorText}
            </Text>
            <View style={styles.right}>
                <Text style={[
                    styles.text,
                    { color: colors.muted },
                ]}>
                    {activeText || 'Not selected'}
                </Text>
                <MaterialIcons 
                    name="arrow-forward-ios" 
                    size={16}
                    color={colors.muted}
                />
            </View>
        </Link>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Spacing.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: FontSizes.default,
    },
    right: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: Spacing.tertiary,
    }
})
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "../Themed";
import Spacing from "@/constants/Spacing";
import FontSizes from "@/constants/FontSizes";
import { MaterialIcons } from "@expo/vector-icons";
import useColors from "@/hooks/useColors";
import Link from "../Link";
import { ModalStackParamList } from "@/App";

export default function Selector({
    selectorText,
    screen,
}: {
    selectorText: string;
    screen: keyof ModalStackParamList;
}) {
    const colors = useColors();

    return(
        <Link 
            href={'Modal'} 
            screen={screen}
            style={styles.container}
        >
            <Text style={styles.text}>
                {selectorText}
            </Text>
            <MaterialIcons 
                name="arrow-forward-ios" 
                size={16}
                color={colors.muted}
            />
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
})
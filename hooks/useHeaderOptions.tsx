import FontSizes from "@/constants/FontSizes";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import useColors from "./useColors";
import { useNavigation } from "@react-navigation/native";

export default function useHeaderOptions({
    headerText,
    headerLeftText, 
    headerRightText,
    onHeaderLeftPress,
    onHeaderRightPress,
    headerRightDisabled,
    headerLeftDisabled,
}: {
    headerText?: string;
    headerLeftText?: string;
    headerRightText?: string;
    onHeaderLeftPress?: () => void;
    onHeaderRightPress?: () => void;
    headerRightDisabled?: boolean;
    headerLeftDisabled?: boolean;
}) {
    const colors = useColors();
    const navigation = useNavigation();;

    const dependencies = [headerText, headerLeftText, headerRightText, onHeaderLeftPress, onHeaderRightPress];
    useEffect(() => {
        navigation.setOptions({
            title: headerText,
            headerLeft: headerLeftText ? () => (
                <TouchableOpacity 
                    onPress={onHeaderLeftPress}
                    disabled={headerLeftDisabled}
                >
                    <Text style={{
                        ...styles.headerButton,
                        color: headerLeftDisabled ? colors.muted : colors.text,
                    }}>
                        {headerLeftText}
                    </Text>
                </TouchableOpacity>
            ) : null,
            headerRight: headerRightText ? () => (
                <TouchableOpacity 
                    onPress={onHeaderRightPress}
                    disabled={headerRightDisabled}
                >
                    <Text style={{
                        ...styles.headerButton,
                        color: headerRightDisabled ? colors.muted : colors.text,
                    }}>
                        {headerRightText}
                    </Text>
                </TouchableOpacity>
            ) : null,
        })
    }, dependencies);
}

const styles = StyleSheet.create({
    headerButton: {
        fontSize: FontSizes.default,
    }
})
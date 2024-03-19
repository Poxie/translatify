import Spacing from "@/constants/Spacing";
import useColors from "@/hooks/useColors";
import { StyleProp, View, ViewStyle } from "react-native";

export default function Divider({ style }: {
    style?: StyleProp<ViewStyle>;
}) {
    const colors = useColors();
    return(
        <View 
            style={[
                {
                    height: 1,
                    backgroundColor: colors.backgroundTertiary,
                    marginHorizontal: Spacing.primary
                },
                style,
            ]}
        />
    )
}
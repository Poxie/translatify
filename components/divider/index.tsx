import Spacing from "@/constants/Spacing";
import useColors from "@/hooks/useColors";
import { View } from "react-native";

export default function Divider() {
    const colors = useColors();
    return(
        <View 
            style={{
                height: 1,
                backgroundColor: colors.backgroundTertiary,
                marginHorizontal: Spacing.primary
            }}
        />
    )
}
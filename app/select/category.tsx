import { Text } from "@/components/Themed";
import useColors from "@/hooks/useColors";
import useHeaderOptions from "@/hooks/useHeaderOptions";
import { View } from "react-native";

export default function SelectCategoryScreen() {
    const colors = useColors();

    useHeaderOptions({ headerText: 'Select Category' });

    return(
        <View>
            <Text>
                Test
            </Text>
        </View>
    )
}
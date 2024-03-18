import { Text } from "@/components/Themed";
import { useDatabase } from "@/contexts/database";
import { View } from "react-native";

export default function ListScreen() {
    const { words } = useDatabase();

    return(
        <View>
            {words?.map(word => (
                <Text>
                    {word.term}
                </Text>
            ))}
        </View>
    )
}
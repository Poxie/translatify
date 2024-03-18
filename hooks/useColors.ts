import Colors from "@/constants/Colors";
import { useColorScheme } from "react-native";

export default function useColors() {
    const colorScheme = useColorScheme();
    return Colors[colorScheme as 'dark' | 'light'];
}
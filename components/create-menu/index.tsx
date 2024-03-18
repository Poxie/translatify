import useColors from "@/hooks/useColors";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Link from "../Link";

export default function CreateMenu() {
    const navigation = useNavigation();
    const { backgroundSecondary } = useColors();
    
    return(
        <Link
            href={'Modal'}
            screen="Create"
            style={{
                ...styles.container,
                backgroundColor: backgroundSecondary,
            }}
        >
            <FontAwesome6 name="plus" size={28} color="black" />
        </Link>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        height: 65,
        position: 'absolute',
        bottom: 20,
        right: 20,
        padding: 20,
        borderRadius: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,  
        elevation: 5,
    }
})
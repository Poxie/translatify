import { ModalStackParamList, RootStackParamList } from "@/app/index";
import { useNavigation } from "@react-navigation/native";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

export default function Link({ children, href, style, screen }: {
    children: React.ReactNode;
    href: keyof RootStackParamList;
    style?: StyleProp<ViewStyle>;
    screen?: keyof ModalStackParamList;
}) {
    const navigation = useNavigation();

    const onPress = () => {
        if(href !== 'Modal') {
            navigation.navigate(href);
            return;
        }

        if(!screen) {
            throw new Error('screen prop is required when href is Modal');
        }
        navigation.navigate('Modal', { screen });
    }

    return(
        <TouchableOpacity 
            onPress={onPress}
            style={style}
        >
            {children}
        </TouchableOpacity>
    );
}
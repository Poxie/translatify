import { ModalStackParamList, RootStackParamList } from "@/app/index";
import { useNavigation } from "@react-navigation/native";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

export default function Link({ children, href, onLongPress, style, screen, params, push }: {
    children: React.ReactNode;
    href: keyof RootStackParamList;
    onLongPress?: () => void;
    style?: StyleProp<ViewStyle>;
    screen?: keyof ModalStackParamList;
    params?: Record<string, any>;
    push?: boolean;
}) {
    const navigation = useNavigation();

    const onPress = () => {
        // @ts-ignore
        const navigate = push ? navigation.push: navigation.navigate;
        if(href !== 'Modal') {
            navigate(href, params);
            return;
        }

        if(!screen) {
            throw new Error('screen prop is required when href is Modal');
        }
        navigate('Modal', { screen, params });
    }

    return(
        <TouchableOpacity 
            onLongPress={onLongPress}
            onPress={onPress}
            style={style}
        >
            {children}
        </TouchableOpacity>
    );
}
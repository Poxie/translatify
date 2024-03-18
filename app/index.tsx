import useColors from "@/hooks/useColors";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./home";
import SearchScreen from "./search";
import ListScreen from "./list";
import FavoritesScreen from "./favorites";
import QuizScreen from "./quiz";
import ImportScreen from "./import";
import ExportScreen from "./export";
import CreateScreen from "./create";
import SelectCategoryScreen from "./select/category";

export type RootStackParamList = {
    Home: undefined;
    Search: undefined;
    List: undefined;
    Favorites: undefined;
    Quiz: undefined;
    Import: undefined;
    Export: undefined;
    Modal: {
        screen: keyof ModalStackParamList
    };
}
const Stack = createNativeStackNavigator<RootStackParamList>();
  
export type ModalStackParamList = {
    Create: undefined;
    SelectCategory: undefined;
}
    const ModalStack = createNativeStackNavigator<ModalStackParamList>();
    const ModalStackScreen = () => {
    const colors = useColors();
  
    return(
        <ModalStack.Navigator screenOptions={{
            headerStyle: { backgroundColor: colors.background },
            headerShadowVisible: false,
        }}>
            <ModalStack.Screen 
                name="Create"
                component={CreateScreen}
            />
            <ModalStack.Screen 
                name="SelectCategory"
                component={SelectCategoryScreen}
            />
        </ModalStack.Navigator>
    )
}

export default function Navigation() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerLargeTitle: true,
                        headerTitle: 'Dashboard',
                        headerStyle: { backgroundColor: 'transparent' }
                    }}
                />
                <Stack.Screen 
                    name="Search"
                    component={SearchScreen}
                />
                <Stack.Screen 
                    name="List"
                    component={ListScreen}
                />
                <Stack.Screen 
                    name="Favorites"
                    component={FavoritesScreen}
                />
                <Stack.Screen 
                    name="Quiz"
                    component={QuizScreen}
                />
                <Stack.Screen 
                    name="Import"
                    component={ImportScreen}
                />
                <Stack.Screen 
                    name="Export"
                    component={ExportScreen}
                />
                <Stack.Screen 
                    name="Modal"
                    component={ModalStackScreen}
                    options={{ 
                        presentation: 'modal',
                        headerShown: false,
                        gestureEnabled: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

// Global types for react-navigation paths
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
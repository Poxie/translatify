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
import CreateCategoryScreen from "./create/category";
import CreateLanguageScreen from "./create/language";
import SelectLanguageScreen from "./select/language";
import SelectWordClassScreen from "./select/wordClass";
import CreateWordClassScreen from "./create/wordClass";
import ListCategoryScreen from "./listCategory";
import SelectWordScreen from "./selectWord";

export type RootStackParamList = {
    Home: undefined;
    Search: undefined;
    List: undefined;
    ListCategory: {
        categoryId: string;
    };
    Favorites: undefined;
    Quiz: undefined;
    Import: undefined;
    Export: undefined;
    Modal: {
        screen: keyof ModalStackParamList;
        params?: any;
    };
}
const Stack = createNativeStackNavigator<RootStackParamList>();
  
export type ModalStackParamList = {
    Create: {
        prevId: string;
        categoryId?: string;
        languageId?: string;
        translationIds?: string[];
    };
    SelectCategory: {
        params: Record<string, any>;
        currentActive: string;
    };
    SelectWordClass: {
        params: Record<string, any>;
        currentActive: string;
    };
    SelectLanguage: {
        params: Record<string, any>;
        currentActive: string;
    };
    CreateCategory?: {
        prevId: string;
        canClose?: boolean;
    };
    CreateLanguage?: {
        prevId: string;
    };
    CreateWordClass?: {
        prevId: string;
    };
    SelectWord: {
        screen: keyof ModalStackParamList;
        headerText?: string;
        returnProp?: string;
        selectedIds?: string[];
        excludedIds?: string[];
        required?: boolean;
    }
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
                initialParams={{ prevId: '' }}
            />
            <ModalStack.Screen 
                name="SelectCategory"
                component={SelectCategoryScreen}
            />
            <ModalStack.Screen 
                name="CreateCategory"
                component={CreateCategoryScreen}
                options={{ headerLargeTitle: true }}
            />
            <ModalStack.Screen 
                name="SelectLanguage"
                component={SelectLanguageScreen}
            />
            <ModalStack.Screen 
                name="CreateLanguage"
                component={CreateLanguageScreen}
                options={{ headerLargeTitle: true }}
            />
            <ModalStack.Screen 
                name="SelectWordClass"
                component={SelectWordClassScreen}
            />
            <ModalStack.Screen 
                name="CreateWordClass"
                component={CreateWordClassScreen}
                options={{ headerLargeTitle: true }}
            />
            <ModalStack.Screen 
                name="SelectWord"
                component={SelectWordScreen}
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
                    options={{ 
                        title: 'Word list',
                        headerLargeTitle: true, 
                        headerStyle: { backgroundColor: 'transparent'}
                    }}
                />
                <Stack.Screen 
                    name="ListCategory"
                    component={ListCategoryScreen}
                    options={{ 
                        title: 'Word list',
                        headerLargeTitle: true, 
                        headerStyle: { backgroundColor: 'transparent'}
                    }}
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
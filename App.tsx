import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/home';
import { NavigationContainer, StaticParamList, createStaticNavigation } from '@react-navigation/native';
import SearchScreen from './app/search';
import ListScreen from './app/list';
import FavoritesScreen from './app/favorites';
import QuizScreen from './app/quiz';
import ImportScreen from './app/import';
import ExportScreen from './app/export';
import CreateScreen from './app/create';
import SelectCategoryScreen from './app/select/category';
import { Text } from './components/Themed';
import useColors from './hooks/useColors';

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

export default function App() {
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
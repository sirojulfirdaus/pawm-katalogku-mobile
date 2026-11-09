import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritScreen from '../screens/FavoritScreen';
import ProfilScreen from '../screens/ProfilScreen';
import CartScreen from '../screens/CartScreen';
import AboutScreen from '../screens/AboutScreen';
import { COLORS } from '../theme/colors';
import { useFavorites } from '../context/FavoritesContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/** @param {any} props */
function BerandaRoute({ navigation }) {
  return (
    <HomeScreen
      onProductPress={(product) => navigation.navigate('Detail', { product })}
    />
  );
}

/** @param {any} props */
function DetailRoute({ navigation, route }) {
  const candidate = route.params?.product;
  const product =
    candidate &&
    typeof candidate.id === 'string' &&
    candidate.id.length > 0 &&
    typeof candidate.title === 'string' &&
    typeof candidate.price === 'number' &&
    Number.isFinite(candidate.price) &&
    typeof candidate.category === 'string' &&
    typeof candidate.description === 'string' &&
    (candidate.thumbnail == null || typeof candidate.thumbnail === 'string') &&
    (candidate.rating == null || typeof candidate.rating === 'number')
      ? candidate
      : null;

  return <DetailScreen product={product} onBack={() => navigation.goBack()} />;
}

function MainTabs() {
  const { favorites } = useFavorites();
  return (
    <Tab.Navigator
      initialRouteName="Beranda"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primaryDark,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
        },
        tabBarLabelStyle: { fontFamily: 'Roboto-Medium', fontSize: 11 },
        tabBarIcon: ({ color, size, focused }) => {
          /** @type {Record<string, keyof typeof Ionicons.glyphMap>} */
          const icons = {
            Beranda: focused ? 'home' : 'home-outline',
            Favorit: focused ? 'heart' : 'heart-outline',
            Profil: focused ? 'person' : 'person-outline',
            Keranjang: focused ? 'cart' : 'cart-outline',
          };
          return (
            <Ionicons name={icons[route.name]} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Beranda" component={BerandaRoute} />
      <Tab.Screen
        name="Favorit"
        component={FavoritScreen}
        options={{ tabBarBadge: favorites.length || undefined }}
      />
      <Tab.Screen name="Profil" component={ProfilScreen} />
      <Tab.Screen name="Keranjang" component={CartScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Detail" component={DetailRoute} />
        <Stack.Screen name="Tentang" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

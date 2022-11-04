import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';
import { PlusCircle, SoccerBall } from 'phosphor-react-native';
import { Platform } from 'react-native';
import { Find } from '../screens/Find';

import { New } from '../screens/New';
import { Pools } from '../screens/Pools';
import { Details } from '../screens/Details';

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
  const { colors, sizes } = useTheme();

  const size = sizes[6];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: 'absolute',
          height: 87,
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
        },
        tabBarItemStyle: {
          position: 'relative',
          top: Platform.OS === 'android' ? -10 : 0,
        },
      }}
    >
      <Tab.Screen
        name="new"
        component={New}
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={size} />,
          tabBarLabel: 'Novo bolão',
        }}
      />
      <Tab.Screen
        name="pools"
        component={Pools}
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />,
          tabBarLabel: 'Meus bolões',
        }}
      />
      <Tab.Screen
        name="find"
        component={Find}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="details"
        component={Details}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}

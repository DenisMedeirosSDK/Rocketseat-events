import React from 'react'
import { Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import Favorites from '../pages/Favorites'
import TeacherList from '../pages/TeacherList'

const { Navigator, Screen }  = createBottomTabNavigator()

const StudyTabs: React.FC = () => {
  return (
    <Navigator tabBarOptions={{ 
      style: {
        elevation: 0,
        shadowOpacity: 0,
        height: Platform.OS === 'ios' ? 84 : 64
      },
      tabStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      iconStyle: {
        flex: 0,
        width: 20,
        height: Platform.OS === 'ios' ? 84 : 64,
      },
      labelStyle: {
        fontFamily: 'Archivo_700Bold',
        fontSize: 13,
        marginLeft: 16
      },
      inactiveTintColor: '#fafafc',
      activeBackgroundColor: '#ebebf5',
      inactiveBackgroundColor: '#c1bccc',
      activeTintColor: '#32264d'
      }}>
      <Screen 
        name="TeacherList" 
        component={TeacherList}
        options={{
          tabBarLabel: 'Proffy',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons name="ios-easel" size={size} color={focused ? '#8257e5' : color} />
            )
          }
        }}
      />
      <Screen 
        name="Favorites" 
        component={Favorites} 
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons name="ios-heart" size={size} color={focused ? '#8257e5' : color} />
            )
          }
        }}
      />
    </Navigator>
  )
}

export default StudyTabs
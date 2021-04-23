import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Welcome } from '../pages/Welcome'
import { Confirmations } from '../pages/Confirmations'
import { UserIdentification } from '../pages/UserIdentification'
import { PlantSave } from '../pages/PlantSave'
import { MyPlants } from '../pages/MyPlants'
import AuthRoutes from './tab.routes'

import colors from '../styles/colors'

const stackRoutes = createStackNavigator()

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator headerMode="none" screenOptions={{
    cardStyle: {
      backgroundColor: colors.white
    }
  }}>
    <stackRoutes.Screen name="Welcome" component={Welcome} />
    <stackRoutes.Screen name="UserIdentification" component={UserIdentification} />
    <stackRoutes.Screen name="Confirmations" component={Confirmations} />
    <stackRoutes.Screen name="PlantSelect" component={AuthRoutes} />
    <stackRoutes.Screen name="PlantSave" component={PlantSave} />
    <stackRoutes.Screen name="MyPlants" component={AuthRoutes} />

  </stackRoutes.Navigator>
)

export default AppRoutes
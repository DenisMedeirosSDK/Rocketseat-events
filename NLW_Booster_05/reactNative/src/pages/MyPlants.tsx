import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, FlatList, Alert } from 'react-native'
import ptBR from 'date-fns/locale/pt-BR'
import { formatDistance } from 'date-fns'

import { Header } from '../components/Header'
import { loadPlant, PlantProps, removePlant } from '../libs/storage'
import { PlantCardSecondary } from '../components/PlantCardSecondary'
import { Load } from '../components/Load'

import waterDropImg from '../assets/waterdrop.png'

import fonts from '../styles/fonts'
import colors from '../styles/colors'

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([])
  const [loading, setLoading] = useState(true)
  const [nextWatered, setNextWatered] = useState<string>()

  function handleRemove(plant: PlantProps) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            await removePlant(plant.id)

            setMyPlants(oldData => (
              oldData.filter(item => item.id !== plant.id)
            ))
          } catch (error) {
            Alert.alert('Mão foi possível remover!')
          }
        }
      }
    ])
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantsStorage = await loadPlant()

      const nexTime = formatDistance(
        new Date(plantsStorage[0].dateTimeNotification).getTime(),
        new Date().getTime(), {
        locale: ptBR
      })

      setNextWatered(`Não esqueça de regar a ${plantsStorage[0].name} á ${nexTime} horas}`)


      setMyPlants(plantsStorage)
      setLoading(false)
    }

    loadStorageData()
  }, [])

  if (loading)
    return <Load />

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spotLight}>
        <Image source={waterDropImg} style={styles.spotLightImage} />
        <Text style={styles.spotLightText} >{nextWatered}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsText}>Próximas regadas</Text>
        <FlatList
          keyExtractor={(item) => String(item.id)}
          data={myPlants}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
          renderItem={(item) => (
            <PlantCardSecondary data={item} handleRemove={() => handleRemove(item)} />
          )}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background
  },
  spotLight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  spotLightImage: {
    width: 60,
    height: 60
  },
  spotLightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: '100%'
  },
  plantsText: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
  }
})
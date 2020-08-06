import React, { useEffect, useState } from 'react'
import { BorderlessButton } from 'react-native-gesture-handler'
import { View, Image, Text } from 'react-native'

import backIcon from '../../assets/images/icons/back.png'
import logo from '../../assets/images/logo.png'

import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

interface IPageHeaderProps {
  title: string;
}

const PageHeader: React.FC<IPageHeaderProps> = ({ title, children }) => {
  const { navigate } = useNavigation()
  

  function handleGoback() {
    navigate('Landing')
  }

  return (
    <View style={styles.container} >
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoback} >
          <Image source={backIcon} resizeMode='contain' />
        </BorderlessButton>

        <Image  source={logo} resizeMode='contain' />
      </View>

      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default PageHeader
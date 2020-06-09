import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, Image, ImageBackground, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [uf, setUf]= useState('');
  const [city, setCity]= useState('');

  function handleNavigateToPoints(){
    navigation.navigate('Points', {
      uf,
      city
    })
  }

  return(
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'android' ? 'padding' : undefined}>
      <ImageBackground 
        source={require('../../assets/home-background.png')} 
        style={styled.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <Image source={require('../../assets/logo.png')} />
        <View style={styled.main}>
            <Text style={styled.title} >Seu Marketplace de coleta de resíduos</Text>
            <Text style={styled.description} >Ajudamos pessoas a encontrarem pontos de coleta eficiente</Text>
        </View>

        <View style={styled.footer}>
          <TextInput 
            style={styled.input}
            placeholder="Digite a UF"
            maxLength={2}
            autoCapitalize="characters"
            autoCorrect={false}
            returnKeyType="next"
            value={uf}
            onChangeText={setUf}
          />
          <TextInput 
            style={styled.input} 
            placeholder="Digite a Cidade" 
            autoCorrect={false}
            value={city}
            onChangeText={setCity}
          />

          <RectButton style={styled.button} onPress={handleNavigateToPoints} >
            <View style={styled.buttonIcon}>
              <Text>
              <Feather name="arrow-right" size={24} color="#FFF" />
              </Text>
            </View>
              <Text style={styled.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const styled = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});


export default Home;
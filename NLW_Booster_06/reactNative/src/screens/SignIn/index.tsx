import React from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text } from "react-native";

import IllustrationImg from "../../assets/illustration.png";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Background } from "../../components/Background";

import { styles } from "./styles";

export function SignIn() {
  const navigation = useNavigation();

  function handleSignIn() {
    navigation.navigate("Home");
  }
  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={IllustrationImg}
          style={styles.image}
          resizeMethod="auto"
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se e organize suas {"\n"} jogatinas
          </Text>
          <Text style={styles.subTitle}>
            Crie grupos para jogar seus games {"\n"}
            favoritos com seus amigos
          </Text>
          <ButtonIcon onPress={handleSignIn} title="Entrar com discord" />
        </View>
      </View>
    </Background>
  );
}

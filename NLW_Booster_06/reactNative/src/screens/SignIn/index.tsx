import React from "react";
import { View, Image, Text, Alert, ActivityIndicator } from "react-native";

import { useAuth } from "../../hooks/auth";

import IllustrationImg from "../../assets/illustration.png";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Background } from "../../components/Background";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

export function SignIn() {
  const { loading, signIn } = useAuth();

  async function handleSignIn() {
    try {
      await signIn();
    } catch (error) {
      Alert.alert(error);
    }
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

          {loading ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <ButtonIcon onPress={handleSignIn} title="Entrar com discord" />
          )}
        </View>
      </View>
    </Background>
  );
}

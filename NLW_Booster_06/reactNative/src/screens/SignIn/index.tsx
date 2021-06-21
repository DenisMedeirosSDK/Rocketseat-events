import React from "react";
import { useState } from "react";
import { View, Image, Text } from "react-native";
import { styles } from "./styles";

import IllustrationImg from "../../assets/illustration.png";
import { ButtonIcon } from "../../components/ButtonIcon";

export function SignIn() {
  const [text, setText] = useState("");
  return (
    <View style={styles.container}>
      <Image
        source={IllustrationImg}
        style={styles.image}
        resizeMethod="auto"
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          Organize suas jogatinas {"\n"} facilmente
        </Text>
        <Text style={styles.subTitle}>
          Crie grupos para jogar seus games {"\n"}
          favoritos com seus amigos
        </Text>
        <ButtonIcon title="Entrar com discord" activeOpacity={0.7} />
      </View>
    </View>
  );
}

import React from "react";
import { View, ImageBackground, Text, FlatList } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";

import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { theme } from "../../global/styles/theme";

import BannerImg from "../../assets/banner.png";
import { styles } from "./styles";
import { ListHeader } from "../../components/ListHeader";
import { Member } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";

export function AppointmentDetails() {
  const member = [
    {
      id: "1",
      username: "Denis",
      avatar_url: "https://github.com/DenisMedeirosSDK.png",
      status: "online",
    },
    {
      id: "2",
      username: "ZEZE",
      avatar_url: "https://github.com/DenisMedeirosSDK.png",
      status: "offline",
    },
  ];
  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          <BorderlessButton>
            <Fontisto name="share" size={24} color={theme.colors.primary} />
          </BorderlessButton>
        }
      />

      <ImageBackground source={BannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>Lendários</Text>
          <Text style={styles.subtitle}>
            É hoje que vamos chegar ao challenger sem perder uma partida da md10
          </Text>
        </View>
      </ImageBackground>
      <ListHeader title="Jogadores" subtitle="Total 3" />
      <FlatList
        data={member}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Member data={item} />}
        ItemSeparatorComponent={() => <ListDivider />}
        style={styles.members}
      />

      <View style={styles.footer}>
        <ButtonIcon title="Entrar na partida" />
      </View>
    </Background>
  );
}

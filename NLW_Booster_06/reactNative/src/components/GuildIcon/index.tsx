import React from "react";
import { View, Image } from "react-native";

import DiscordImg from "../../assets/discord.svg";
import { styles } from "./styles";

type Props = {
  guildId: string;
  iconId: string | null;
};

const { CDN_IMAGE } = process.env;

export function GuildIcon({ guildId, iconId }: Props) {
  const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;
  return (
    <View style={styles.container}>
      {iconId ? (
        <Image source={{ uri }} style={styles.image} resizeMode="cover" />
      ) : (
        <DiscordImg width={40} height={40} />
      )}
    </View>
  );
}

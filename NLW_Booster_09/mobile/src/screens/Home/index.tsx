import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { GameCard } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import { GAMES } from '../../utils/games';

import { styles } from './styles';
//172.23.67.121

export interface GameProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: { Ads: number };
}

export function Home() {
  const [games, setGames] = useState<GameProps[]>([]);

  const navigation = useNavigation();
  function handleOpenGame({ id, bannerUrl, title }: GameProps) {
    navigation.navigate('game', {
      id,
      title,
      bannerUrl,
    });
  }

  useEffect(() => {
    fetch('http://192.168.18.2:3333/games')
      .then(response => response.json())
      .then(game => setGames(game.data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />
        <FlatList
          data={GAMES}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}

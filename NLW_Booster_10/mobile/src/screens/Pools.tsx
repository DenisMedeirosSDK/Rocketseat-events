import { useCallback, useEffect, useState } from 'react';
import { Icon, useToast, VStack, FlatList } from 'native-base';
import { Button } from '../components/Button';
import { Header } from '../components/Header';

import { Octicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { PoolCardProps, PoolCard } from '../components/PoolCard';
import { EmptyPoolList } from '../components/EmptyPoolList';

export function Pools() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [pools, setPools] = useState<PoolCardProps[]>([]);

  const toast = useToast();

  async function fetchPools() {
    try {
      setIsLoading(true);
      const response = await api.get('/pools');

      setPools(response.data.pools);
    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Não foi possivel carregar os bolões',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPools();
    }, [])
  );

  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Meus bolões" />
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
      >
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          onPress={() => navigation.navigate('find')}
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
        />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <PoolCard
              data={item}
              onPress={() => navigation.navigate('details', { id: item.id })}
            />
          )}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={() => <EmptyPoolList />}
        />
      )}
    </VStack>
  );
}

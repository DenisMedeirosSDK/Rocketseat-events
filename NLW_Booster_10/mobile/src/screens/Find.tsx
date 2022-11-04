import { Heading, useToast, VStack } from 'native-base';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useState } from 'react';
import { api } from '../services/api';
import { useNavigation } from '@react-navigation/native';

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');
  const navigation = useNavigation();
  const toast = useToast();

  async function handleJoinPool() {
    try {
      setIsLoading(true);
      if (!code.trim()) {
        toast.show({
          title: 'Informe o código',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      await api.post('/pools/join', { code });

      navigation.navigate('pools');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      if (error.response?.data?.message === 'Pool not found') {
        toast.show({
          title: 'Não foi possivel encontrar o bolão',
          placement: 'top',
          bgColor: 'red.500',
        });
      }
      if (error.response?.data?.message === 'You already joined this pool.') {
        toast.show({
          title: 'Você ja esta neste bolão.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }
      toast.show({
        title: 'Não foi possivel encontrar o bolão',
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de seu código único
        </Heading>
        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          value={code}
          onChangeText={setCode}
        />
        <Button
          title="Buscar bolão"
          onPress={handleJoinPool}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  );
}

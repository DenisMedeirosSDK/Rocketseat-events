import { useState } from 'react';
import { Heading, Text, VStack, useToast } from 'native-base';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import LogoSvg from '../assets/logo.svg';
import { useAuth } from '../hooks/userAuth';
import { api } from '../services/api';

export function New() {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  async function handlePoolCreate() {
    if (!title.trim()) {
      return toast.show({
        title: 'Informa um nome para o seu bolão',
        placement: 'top',
        bgColor: 'red.500',
      });
    }
    try {
      setIsLoading(true);
      const response = await api.post('/pools', { title });

      toast.show({
        title: 'Bolão criado com sucesso',
        placement: 'top',
        bgColor: 'green.500',
      });

      setTitle('');
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Não foi possivel criar o bolão',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <LogoSvg />

        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </Heading>
        <Input
          mb={2}
          placeholder="Qual nome do seu bolão?"
          value={title}
          onChangeText={setTitle}
        />
        <Button
          title="Criar meu bolão"
          onPress={handlePoolCreate}
          isLoading={isLoading}
        />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}

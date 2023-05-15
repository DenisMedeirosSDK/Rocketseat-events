import { Center, Text, Icon } from 'native-base';
import LogoSvg from '../assets/logo.svg';
import { Button } from '../components/Button';
import { Fontisto } from '@expo/vector-icons';
import { useAuth } from '../hooks/userAuth';

export function SignIn() {
  const { signIn, isUserLoading, user } = useAuth();
  return (
    <Center flex={1} bgColor="gray.900" alignItems="center" p={7}>
      <LogoSvg width={212} height={40} />
      <Button
        title="Entrar com Google"
        type="SECONDARY"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        mt={12}
        onPress={signIn}
        isLoading={isUserLoading}
        _loading={{
          _spinner: { color: 'white' },
        }}
      />
      <Text color="white" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação
        de sua conta. {user.name}
      </Text>
    </Center>
  );
}

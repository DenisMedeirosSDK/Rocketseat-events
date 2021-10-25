import React, { createContext, useContext, useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../services/api';

const CLIENT_ID = '48e8e5904f42d3f1a0d2';
const SCOPE = 'read:user';
const USER_STORAGE = '@nlwheat:user';
const TOKEN_STORAGE = '@nlwheat:token';

type User = {
  id: string;
  name: string;
  github_id: number;
  avatar_url: string;
  login: string;
};

type AuthResponse = {
  token: string;
  user: User;
};

type AuthorizationResponse = {
  params: { code?: string; error?: string };
  type?: string;
};

type AuthContextData = {
  user: User | null;
  isSigningIng: boolean;
  signIn: () => void;
  signOut: () => void;
};

type AuthProviderProps = { children: React.ReactNode };

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider(props: AuthProviderProps) {
  const [isSigningIng, setIsSigningIng] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  async function signIn() {
    try {
      setIsSigningIng(true);
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
      const authSessionResponse = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (
        authSessionResponse.type === 'success' &&
        authSessionResponse.params.error !== 'access_denied'
      ) {
        const authResposne = await api.post('/authenticate', {
          code: authSessionResponse.params.code,
        });
        const { token, user } = authResposne.data as AuthResponse;

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
        await AsyncStorage.setItem(TOKEN_STORAGE, token);

        setUser(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSigningIng(false);
    }
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem(USER_STORAGE);
    await AsyncStorage.removeItem(TOKEN_STORAGE);
  }

  useEffect(() => {
    async function loadUserStorageDAte() {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE);
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

      if (userStorage && tokenStorage) {
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`;
        setUser(JSON.parse(userStorage));
      }

      setIsSigningIng(false);
    }
    loadUserStorageDAte();
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isSigningIng }}>
      {props.children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };

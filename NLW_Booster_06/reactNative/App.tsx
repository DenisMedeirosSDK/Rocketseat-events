import React from "react";
import { StatusBar } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import {
  Rajdhani_500Medium,
  Rajdhani_700Bold,
} from "@expo-google-fonts/rajdhani";

import { Routes } from "./src/routes";
import { Background } from "./src/components/Background";
import { AuthProvider } from "./src/hooks/auth";
// import { COLLECTION_APPOINTMENTS } from "./src/config/database";

// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  // AsyncStorage.removeItem(COLLECTION_APPOINTMENTS);
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Background>
  );
}

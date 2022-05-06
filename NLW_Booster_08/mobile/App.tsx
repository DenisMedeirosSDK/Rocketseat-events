// import {
//   Inter_400Regular,
//   Inter_500Medium,
//   useFonts,
// } from '@expo-google-fonts/inter';
// import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import Widget from './src/components/Widget';
import { theme } from './src/theme';

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   Inter_400Regular,
  //   Inter_500Medium,
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="transparent" />
      <Widget />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

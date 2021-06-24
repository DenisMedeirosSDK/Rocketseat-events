import React from "react";
import { useState } from "react";
import { View, FlatList, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Appointments } from "../../components/Appointments";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { ListDivider } from "../../components/ListDivider";
import { Background } from "../../components/Background";
import { Profile } from "../../components/Profile";

import { styles } from "./styles";

export function Home() {
  const navigation = useNavigation();
  const [category, setCategory] = useState("");

  const appointments = [
    {
      id: "1",
      guild: {
        id: "1",
        name: "Lendarios",
        icon: null,
        owner: true,
      },
      category: "1",
      date: "22/06 às 20:00h",
      description:
        "É hoje que vamos chegar ao challenger sem perder uma partida da md10",
    },
    {
      id: "2",
      guild: {
        id: "1",
        name: "Lendarios",
        icon: null,
        owner: true,
      },
      category: "1",
      date: "22/06 às 20:00h",
      description:
        "É hoje que vamos chegar ao challenger sem perder uma partida da md10",
    },
  ];

  function handleAppointmentDetails() {
    navigation.navigate("AppointmentDetails");
  }
  function handleAppointmentCreate() {
    navigation.navigate("AppointmentCreate");
  }

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory("") : setCategory(categoryId);
  }

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>

      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
        hasCheckBox={true}
      />

      <View style={styles.content}>
        <ListHeader title="Partidas agendadas" subtitle="Total 6" />

        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Appointments onPress={handleAppointmentDetails} data={item} />
          )}
          ItemSeparatorComponent={() => <ListDivider />}
          style={styles.matches}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Background>
  );
}

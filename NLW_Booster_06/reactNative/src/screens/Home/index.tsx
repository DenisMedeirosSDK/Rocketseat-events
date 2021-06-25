import React, { useCallback } from "react";
import { useState } from "react";
import { View, FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Appointments, AppointmentsProps } from "../../components/Appointments";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { ListDivider } from "../../components/ListDivider";
import { Background } from "../../components/Background";
import { Profile } from "../../components/Profile";

import { styles } from "./styles";
import { COLLECTION_APPOINTMENTS } from "../../config/database";
import { Load } from "../../components/Load";

export function Home() {
  const navigation = useNavigation();
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const [appointments, setAppointments] = useState<AppointmentsProps[]>([]);

  function handleAppointmentDetails(guildSelected: AppointmentsProps) {
    navigation.navigate("AppointmentDetails", { guildSelected });
  }
  function handleAppointmentCreate() {
    navigation.navigate("AppointmentCreate");
  }

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory("") : setCategory(categoryId);
  }

  async function loadAppointments() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentsProps[] = response ? JSON.parse(response) : [];

    if (category) {
      setAppointments(storage.filter((item) => item.category === category));
    } else {
      setAppointments(storage);
    }

    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [category])
  );

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>

      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
        hasCheckBox={false}
      />

      {loading ? (
        <Load />
      ) : (
        <>
          <ListHeader
            title="Partidas agendadas"
            subtitle={`Total ${appointments.length}`}
          />
          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Appointments
                onPress={() => handleAppointmentDetails(item)}
                data={item}
              />
            )}
            ItemSeparatorComponent={() => <ListDivider />}
            style={styles.matches}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 69 }}
          />
        </>
      )}
    </Background>
  );
}

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

import mapMarker from "../images/map-marker.png";

export default function OrphanagesMap() {
  const navigation = useNavigation();
  const [initialRegion, setInitialRegion] = useState<[number, number]>([0, 0]);

  function handleNavigatToOrphanageDetail() {
    navigation.navigate("OrphanagesDetails");
  }

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Precisamos de sua permição para obter a localização");
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;

      setInitialRegion([latitude, longitude]);
    }
    loadPosition();
  }, []);

  return (
    <View style={styles.container}>
      {initialRegion[0] !== 0 && (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: initialRegion[0],
            longitude: initialRegion[1],
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
        >
          <Marker
            icon={mapMarker}
            calloutAnchor={{
              x: 2.7,
              y: 0.8,
            }}
            coordinate={{
              latitude: -23.4456786,
              longitude: -47.4881942,
            }}
          >
            <Callout tooltip={true} onPress={handleNavigatToOrphanageDetail}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>Lar das meninas</Text>
              </View>
            </Callout>
          </Marker>
        </MapView>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>2 orfanatos encontrados</Text>
        <TouchableOpacity
          style={styles.createOrphanageButton}
          onPress={() => {}}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 16,
    justifyContent: "center",
  },
  calloutText: {
    color: "#0089a5",
    fontSize: 14,
    fontFamily: "Nunito_700Bold",
  },
  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: "#FFF",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 3,
  },

  footerText: {
    color: "#8fa7b3",
    fontFamily: "Nunito_700Bold",
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: "#15e3d6",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
  },
});

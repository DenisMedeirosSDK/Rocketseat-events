import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import mapMarker from '../images/map-marker.png';
import api from '../services/api';

interface IOrphanage {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  const navigation = useNavigation();
  const [initialRegion, setInitialRegion] = useState<[number, number]>([0, 0]);
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);

  function handleNavigateToOrphanageDetail(id: string) {
    navigation.navigate('OrphanagesDetails', { id });
  }
  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
  });

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Precisamos de sua permição para obter a localização');
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;

      setInitialRegion([latitude, longitude]);
    }
    loadPosition();
  }, [initialRegion]);

  return (
    <View style={styles.container}>
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
        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            >
              <Callout
                tooltip={true}
                onPress={() => handleNavigateToOrphanageDetail(orphanage.id)}
              >
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} orfanatos encontrados
        </Text>
        <TouchableOpacity
          style={styles.createOrphanageButton}
          onPress={handleNavigateToCreateOrphanage}
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 16,
    justifyContent: 'center',
  },
  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },

  footerText: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_700Bold',
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15e3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SAMPLE_LOCATIONS } from '../data/locations';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗺️ E-Waste Collection Centers</Text>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: SAMPLE_LOCATIONS[0]?.latitude ?? 37.77926,
            longitude: SAMPLE_LOCATIONS[0]?.longitude ?? -122.4192,
            latitudeDelta: 0.06,
            longitudeDelta: 0.06,
          }}
        >
          {SAMPLE_LOCATIONS.map((location) => (
            <Marker
              key={location.id}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={location.name}
              description={`${location.address} • ${location.services}`}
            />
          ))}
        </MapView>
      </View>

      <ScrollView style={styles.scrollView}>
        {SAMPLE_LOCATIONS.map((location) => (
          <View key={location.id} style={styles.locationCard}>
            <Text style={styles.locationName}>{location.name}</Text>
            <Text style={styles.locationAddress}>{location.address}</Text>
            <Text style={styles.locationServices}>Services: {location.services}</Text>
            <Text style={styles.locationDistance}>{location.distance}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginVertical: 20,
  },
  mapContainer: {
    height: 260,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  map: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  locationCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  locationServices: {
    fontSize: 14,
    color: '#2E7D32',
    marginBottom: 4,
  },
  locationDistance: {
    fontSize: 12,
    color: '#999',
  },
});



import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SAMPLE_LOCATIONS } from '../data/locations';

export default function MapScreen() {
  const primaryLocation = SAMPLE_LOCATIONS[0];
  const locationsJson = JSON.stringify(SAMPLE_LOCATIONS);

  const leafletHtml = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossorigin=""
      />
      <style>
        html, body, #map {
          height: 100%;
          margin: 0;
          padding: 0;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin=""
      ></script>
      <script>
        const locations = ${locationsJson};
        const centerLat = locations[0]?.latitude ?? 37.77926;
        const centerLng = locations[0]?.longitude ?? -122.4192;

        const map = L.map('map').setView([centerLat, centerLng], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        locations.forEach((loc) => {
          const marker = L.marker([loc.latitude, loc.longitude]).addTo(map);
          marker.bindPopup(\`<strong>\${loc.name}</strong><br />\${loc.address}<br />\${loc.services}\`);
        });
      </script>
    </body>
  </html>`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗺️ E-Waste Collection Centers</Text>

      <View style={styles.mapContainer}>
        <iframe
          title="E-waste collection centers map"
          srcDoc={leafletHtml}
          style={{ border: 0, width: '100%', height: '100%' }}
          loading="lazy"
        />
      </View>

      <View style={styles.webNotice}>
        <Text style={styles.webNoticeTitle}>Tip</Text>
        <Text style={styles.webNoticeText}>
          The map above shows all sample e‑waste centers as markers. Click any marker to see the
          center name, address, and services. You can pan and zoom it like a normal online map.
        </Text>
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
  mapContainer: {
    height: 260,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginVertical: 20,
  },
  webNotice: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#E8F5E8',
  },
  webNoticeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  webNoticeText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  locationNameInline: {
    fontWeight: 'bold',
    color: '#2E7D32',
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



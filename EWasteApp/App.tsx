import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';

const Tab = createBottomTabNavigator();

// Simple Map Screen
function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗺️ E-Waste Collection Centers</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.locationCard}>
          <Text style={styles.locationName}>GreenTech Recycling Center</Text>
          <Text style={styles.locationAddress}>1234 Environmental Ave, San Francisco, CA</Text>
          <Text style={styles.locationServices}>Services: Recycling, Donation, Buy Back</Text>
          <Text style={styles.locationDistance}>2.3 km away</Text>
        </View>
        
        <View style={styles.locationCard}>
          <Text style={styles.locationName}>EcoDrop Mobile Collection</Text>
          <Text style={styles.locationAddress}>5678 Green Street, San Francisco, CA</Text>
          <Text style={styles.locationServices}>Services: Pickup, Drop-off</Text>
          <Text style={styles.locationDistance}>1.8 km away</Text>
        </View>
        
        <View style={styles.locationCard}>
          <Text style={styles.locationName}>TechRepair Plus</Text>
          <Text style={styles.locationAddress}>9012 Tech Boulevard, San Francisco, CA</Text>
          <Text style={styles.locationServices}>Services: Repair, Recycling, Buy Back</Text>
          <Text style={styles.locationDistance}>3.1 km away</Text>
        </View>
      </ScrollView>
    </View>
  );
}

// Simple Search Screen
function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Search & Filter</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.filterCard}>
          <Text style={styles.sectionTitle}>Service Types</Text>
          <View style={styles.chipContainer}>
            <TouchableOpacity style={styles.chip}>
              <Text style={styles.chipText}>Recycling</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chip}>
              <Text style={styles.chipText}>Donation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chip}>
              <Text style={styles.chipText}>Repair</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chip}>
              <Text style={styles.chipText}>Buy Back</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.filterCard}>
          <Text style={styles.sectionTitle}>Accepted Items</Text>
          <View style={styles.chipContainer}>
            <TouchableOpacity style={styles.chip}>
              <Text style={styles.chipText}>Mobile Phones</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chip}>
              <Text style={styles.chipText}>Laptops</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chip}>
              <Text style={styles.chipText}>Batteries</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chip}>
              <Text style={styles.chipText}>Monitors</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Simple Scanner Screen
function ScannerScreen() {
  const handleScan = () => {
    Alert.alert('QR Scanner', 'Camera permission required. This would open the camera to scan QR codes and barcodes for e-waste disposal information.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 QR Code Scanner</Text>
      <View style={styles.scannerContainer}>
        <View style={styles.scannerBox}>
          <Text style={styles.scannerText}>📷</Text>
          <Text style={styles.scannerLabel}>Point camera at QR code or barcode</Text>
        </View>
        <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
          <Text style={styles.scanButtonText}>Start Scanning</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.scannerInfo}>
        <Text style={styles.infoTitle}>How it works:</Text>
        <Text style={styles.infoText}>• Scan product QR codes or barcodes</Text>
        <Text style={styles.infoText}>• Get disposal instructions</Text>
        <Text style={styles.infoText}>• Find nearest recycling centers</Text>
      </View>
    </View>
  );
}

// Simple Awareness Screen
function AwarenessScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 E-Waste Awareness</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>🌱 Why E-Waste is Dangerous</Text>
          <Text style={styles.tipText}>Electronic waste contains toxic materials like lead, mercury, and cadmium that can contaminate soil and water.</Text>
        </View>
        
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>🔒 Data Security First</Text>
          <Text style={styles.tipText}>Always wipe your personal data from devices before recycling. Use factory reset or professional data destruction services.</Text>
        </View>
        
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>🔋 Battery Disposal</Text>
          <Text style={styles.tipText}>Never throw batteries in regular trash. They can cause fires in garbage trucks and landfills.</Text>
        </View>
        
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>🌍 Global E-Waste Crisis</Text>
          <Text style={styles.tipText}>The world generates 50 million tons of e-waste annually, but only 20% is properly recycled.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

// Simple Profile Screen
function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Profile</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileCard}>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@example.com</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1,250</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Contributions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Badges</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.settingsCard}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>🔔 Push Notifications</Text>
            <Text style={styles.settingValue}>ON</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>📍 Location Sharing</Text>
            <Text style={styles.settingValue}>ON</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>❓ Help & Support</Text>
            <Text style={styles.settingValue}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#2E7D32" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Scanner') {
              iconName = focused ? 'qr-code' : 'qr-code-outline';
            } else if (route.name === 'Awareness') {
              iconName = focused ? 'leaf' : 'leaf-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else {
              iconName = 'help-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2E7D32',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
          },
          headerStyle: {
            backgroundColor: '#2E7D32',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Scanner" component={ScannerScreen} />
        <Tab.Screen name="Awareness" component={AwarenessScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
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
  filterCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  chipText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '500',
  },
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scannerBox: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#2E7D32',
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  scannerText: {
    fontSize: 48,
    marginBottom: 8,
  },
  scannerLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scannerInfo: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  tipCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  settingsCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  settingValue: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '500',
  },
});
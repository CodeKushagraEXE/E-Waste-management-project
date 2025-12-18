import React, { useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, TextInput, Switch } from 'react-native';
import MapScreen from './screens/MapScreen';
import { SAMPLE_LOCATIONS, EwasteLocation } from './data/locations';
import * as Location from 'expo-location';

const Tab = createBottomTabNavigator();

// Search & filter screen powered by sample location data
function SearchScreen() {
  const SERVICE_FILTERS = ['Recycling', 'Donation', 'Repair', 'Buy Back', 'Pickup', 'Drop-off'];
  const ITEM_FILTERS = ['Mobile Phones', 'Laptops', 'Batteries', 'Monitors'];

  const [searchText, setSearchText] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices((current) =>
      current.includes(service) ? current.filter((s) => s !== service) : [...current, service],
    );
  };

  const toggleItem = (item: string) => {
    setSelectedItems((current) =>
      current.includes(item) ? current.filter((s) => s !== item) : [...current, item],
    );
  };

  const filteredLocations = useMemo<EwasteLocation[]>(() => {
    return SAMPLE_LOCATIONS.filter((location) => {
      const text = searchText.trim().toLowerCase();

      if (text) {
        const haystack =
          `${location.name} ${location.address} ${location.services} ${location.acceptedItems.join(' ')}`.toLowerCase();
        if (!haystack.includes(text)) {
          return false;
        }
      }

      if (selectedServices.length > 0) {
        const servicesLower = location.services.toLowerCase();
        const matchesService = selectedServices.some((service) =>
          servicesLower.includes(service.toLowerCase()),
        );
        if (!matchesService) return false;
      }

      if (selectedItems.length > 0) {
        const itemsLower = location.acceptedItems.map((i) => i.toLowerCase());
        const matchesItem = selectedItems.some((item) =>
          itemsLower.includes(item.toLowerCase()),
        );
        if (!matchesItem) return false;
      }

      return true;
    });
  }, [searchText, selectedServices, selectedItems]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Search & Filter</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.searchBarContainer}>
          <TextInput
            placeholder="Search by center name, address, or service..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.filterCard}>
          <Text style={styles.sectionTitle}>Service Types</Text>
          <View style={styles.chipContainer}>
            {SERVICE_FILTERS.map((service) => {
              const active = selectedServices.includes(service);
              return (
                <TouchableOpacity
                  key={service}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => toggleService(service)}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{service}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        
        <View style={styles.filterCard}>
          <Text style={styles.sectionTitle}>Accepted Items</Text>
          <View style={styles.chipContainer}>
            {ITEM_FILTERS.map((item) => {
              const active = selectedItems.includes(item);
              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => toggleItem(item)}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <Text style={styles.resultsSummary}>
          Showing {filteredLocations.length} center{filteredLocations.length === 1 ? '' : 's'}
        </Text>

        {filteredLocations.map((location) => (
          <View key={location.id} style={styles.locationCard}>
            <Text style={styles.locationName}>{location.name}</Text>
            <Text style={styles.locationAddress}>{location.address}</Text>
            <Text style={styles.locationServices}>Services: {location.services}</Text>
            <Text style={styles.locationDistance}>{location.distance}</Text>
            <Text style={styles.acceptedItemsLabel}>Accepted items:</Text>
            <View style={styles.acceptedItemsRow}>
              {location.acceptedItems.map((item) => (
                <View key={item} style={styles.acceptedItemChip}>
                  <Text style={styles.acceptedItemText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
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

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>✅ How to Prepare Devices for Recycling</Text>
          <Text style={styles.tipText}>1. Back up important data from phones and laptops.</Text>
          <Text style={styles.tipText}>2. Sign out of accounts (Google, Apple ID, social media).</Text>
          <Text style={styles.tipText}>3. Perform a factory reset or secure wipe.</Text>
          <Text style={styles.tipText}>4. Remove SIM cards and memory cards before drop‑off.</Text>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>♻️ What Can Be Recycled</Text>
          <Text style={styles.tipText}>Most centers accept: mobile phones, laptops, chargers, headphones, small appliances, printers, and monitors.</Text>
          <Text style={styles.tipText}>Many also take: batteries, cables, routers, set‑top boxes, and old game consoles.</Text>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>🚫 Never Throw These in the Trash</Text>
          <Text style={styles.tipText}>• Loose batteries (phone, laptop, power‑tool, vape).</Text>
          <Text style={styles.tipText}>• Broken screens and CRT TVs.</Text>
          <Text style={styles.tipText}>• Devices that smell burnt, swollen, or leaking.</Text>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>👥 Community Actions</Text>
          <Text style={styles.tipText}>• Organize a collection drive at your school, office, or society.</Text>
          <Text style={styles.tipText}>• Help older family members safely dispose of their devices.</Text>
          <Text style={styles.tipText}>• Share verified e‑waste facts instead of myths on social media.</Text>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>📊 Quick Facts</Text>
          <Text style={styles.tipText}>• Up to 90% of a smartphone’s materials can be recovered if recycled properly.</Text>
          <Text style={styles.tipText}>• Recycling 1 million laptops saves enough energy to power thousands of homes for a year.</Text>
          <Text style={styles.tipText}>• Proper e‑waste recycling creates green jobs and reduces mining for new metals.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationSharingEnabled, setLocationSharingEnabled] = useState(true);

  const handleToggleNotifications = (nextValue: boolean) => {
    setNotificationsEnabled(nextValue);
    Alert.alert(
      'Notifications',
      nextValue
        ? 'Push notifications are now ON. We will keep you updated about nearby drives and pickups.'
        : 'Push notifications are now OFF. You can turn them back on anytime from here.',
    );
  };

  const handleToggleLocation = async (nextValue: boolean) => {
    if (nextValue) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Location',
          'Location permission was not granted. Location sharing will stay OFF.',
        );
        return;
      }
      setLocationSharingEnabled(true);
      Alert.alert(
        'Location',
        'Location sharing is ON. We will use your location to suggest the nearest collection centers.',
      );
    } else {
      setLocationSharingEnabled(false);
      Alert.alert(
        'Location',
        'Location sharing is now OFF. We will stop using your location for suggestions.',
      );
    }
  };

  const handleHelpPress = () => {
    Alert.alert(
      'Help & Support',
      'Have questions about safe e‑waste disposal or pickups?\n\nEmail: support@ewasteapp.com\nHelpline: +1 (800) 555‑EWST',
    );
  };

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

        <View style={styles.impactCard}>
          <Text style={styles.sectionTitle}>Your Impact</Text>
          <View style={styles.impactRow}>
            <View style={styles.impactStat}>
              <Text style={styles.impactNumber}>24 kg</Text>
              <Text style={styles.impactLabel}>E‑waste recycled</Text>
            </View>
            <View style={styles.impactStat}>
              <Text style={styles.impactNumber}>18 kg</Text>
              <Text style={styles.impactLabel}>CO₂ saved</Text>
            </View>
          </View>
          <Text style={styles.impactFootnote}>
            Based on your 8 contributions logged in the last 12 months.
          </Text>
        </View>

        <View style={styles.badgesCard}>
          <Text style={styles.sectionTitle}>Badges</Text>
          <View style={styles.badgeRow}>
            <View style={styles.badgeChip}>
              <Text style={styles.badgeEmoji}>🌱</Text>
              <Text style={styles.badgeLabel}>First Drop‑off</Text>
            </View>
            <View style={styles.badgeChip}>
              <Text style={styles.badgeEmoji}>♻️</Text>
              <Text style={styles.badgeLabel}>Battery Saver</Text>
            </View>
            <View style={styles.badgeChip}>
              <Text style={styles.badgeEmoji}>🏅</Text>
              <Text style={styles.badgeLabel}>Community Hero</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.settingsCard}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>🔔 Push Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleToggleNotifications}
              thumbColor={notificationsEnabled ? '#2E7D32' : '#f4f3f4'}
              trackColor={{ false: '#ccc', true: '#A5D6A7' }}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>📍 Location Sharing</Text>
            <Switch
              value={locationSharingEnabled}
              onValueChange={handleToggleLocation}
              thumbColor={locationSharingEnabled ? '#2E7D32' : '#f4f3f4'}
              trackColor={{ false: '#ccc', true: '#A5D6A7' }}
            />
          </View>
          <TouchableOpacity style={styles.settingItem} onPress={handleHelpPress}>
            <Text style={styles.settingText}>❓ Help & Support</Text>
            <Text style={styles.settingValue}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activityCard}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityItem}>
            <Text style={styles.activityBullet}>•</Text>
            <View style={styles.activityTextContainer}>
              <Text style={styles.activityTitle}>
                Dropped 2 laptops at GreenTech Recycling Center
              </Text>
              <Text style={styles.activityMeta}>3 days ago · +250 pts</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityBullet}>•</Text>
            <View style={styles.activityTextContainer}>
              <Text style={styles.activityTitle}>Recycled 6 batteries at EcoDrop Mobile</Text>
              <Text style={styles.activityMeta}>1 week ago · +120 pts</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityBullet}>•</Text>
            <View style={styles.activityTextContainer}>
              <Text style={styles.activityTitle}>Shared awareness article with 5 friends</Text>
              <Text style={styles.activityMeta}>2 weeks ago · +80 pts</Text>
            </View>
          </View>
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
  searchBarContainer: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
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
  acceptedItemsLabel: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '500',
    color: '#555',
  },
  acceptedItemsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
    gap: 6,
  },
  acceptedItemChip: {
    backgroundColor: '#F1F8E9',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  acceptedItemText: {
    fontSize: 11,
    color: '#33691E',
  },
  resultsSummary: {
    marginHorizontal: 16,
    marginBottom: 8,
    fontSize: 12,
    color: '#666',
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
  chipActive: {
    backgroundColor: '#2E7D32',
  },
  chipTextActive: {
    color: '#fff',
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
  impactCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  impactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  impactStat: {
    flex: 1,
  },
  impactNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  impactLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  impactFootnote: {
    marginTop: 8,
    fontSize: 11,
    color: '#999',
  },
  badgesCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badgeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F8E9',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeEmoji: {
    marginRight: 6,
    fontSize: 16,
  },
  badgeLabel: {
    fontSize: 12,
    color: '#33691E',
    fontWeight: '500',
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
  activityCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 24,
    borderRadius: 8,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  activityBullet: {
    fontSize: 16,
    color: '#2E7D32',
    marginRight: 8,
  },
  activityTextContainer: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    color: '#333',
  },
  activityMeta: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
});
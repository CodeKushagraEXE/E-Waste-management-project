# 🌱 E-Waste Management App

A cross-platform mobile and web application built with React Native and Expo to help users find nearby e-waste collection centers, learn about proper e-waste disposal, and contribute to environmental sustainability.

## ✨ Features

- 🗺️ **Interactive Maps** - View e-waste collection centers on Google Maps with markers (iOS/Android) and Leaflet maps (Web)
- 🔍 **Search & Filter** - Search centers by name, address, or filter by service types and accepted items
- 📱 **QR Code Scanner** - Scan product QR codes for disposal instructions (UI ready)
- 📚 **Awareness Hub** - Educational content about e-waste, recycling tips, and environmental impact
- 👤 **User Profile** - Track contributions, points, badges, and manage app settings

## 🛠️ Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Navigation**: React Navigation (Bottom Tabs)
- **Maps**: 
  - `react-native-maps` (iOS/Android)
  - `@teovilla/react-native-web-maps` + Leaflet (Web)
- **Language**: TypeScript
- **UI**: React Native Components with custom styling

## 📋 Prerequisites

- Node.js (v20.19.4 or higher recommended)
- npm or yarn
- Expo Go app (for mobile testing) - [iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
- For iOS development: Xcode (macOS only)
- For Android development: Android Studio

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd E-Waste-management-project/EWasteApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

### Running the App

After starting the server, you'll see a QR code in the terminal. Choose your platform:

- **Web**: Press `w` to open in your browser
- **iOS Simulator**: Press `i` (requires Xcode on macOS)
- **Android Emulator**: Press `a` (requires Android Studio setup)
- **Physical Device**: 
  - Install Expo Go from App Store/Play Store
  - Scan the QR code with your camera (iOS) or Expo Go app (Android)

### Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Start on Android emulator/device
npm run ios        # Start on iOS simulator/device
npm run web        # Start web version
```

## 📁 Project Structure

```
EWasteApp/
├── App.tsx                 # Main app component with navigation
├── screens/                # Screen components
│   ├── MapScreen.tsx       # Map screen (platform selector)
│   ├── MapScreen.native.tsx # Native map implementation
│   └── MapScreen.web.tsx   # Web map implementation
├── data/
│   └── locations.ts        # Sample e-waste center data
├── config/
│   └── maps.ts            # Maps configuration
├── assets/                 # Images and icons
└── package.json           # Dependencies and scripts
```

## 🔑 Configuration

### Google Maps API Key (Optional for Web)

To enable full Google Maps functionality on web, add your API key to `config/maps.ts`:

```typescript
export const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY_HERE';
```

Get your API key from [Google Cloud Console](https://console.cloud.google.com/).

## 📱 Platform Support

- ✅ iOS (via Expo Go or development build)
- ✅ Android (via Expo Go or development build)
- ✅ Web (browser)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Kushagra Singh**

---

Made with ❤️ for a sustainable future 🌍


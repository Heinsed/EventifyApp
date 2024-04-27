import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigator from "./src/navigation/TabNavigator";




export default function App() {
  const [fontLoaded] = useFonts({
    MontserratRegular: require('./assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
  });



  return (
    <SafeAreaProvider>
      <TabNavigator />
    </SafeAreaProvider>
  );
}



import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import {useEffect, useState} from "react";
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigator from "./src/navigation/TabNavigator";
import Auth from './src/screens/Auth/Auth';
import auth from "@react-native-firebase/auth";
import PreAuth from "./src/screens/PreAuth/PreAuth";



export default function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [fontLoaded] = useFonts({
    MontserratRegular: require('./assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
    MontserratMedium: require('./assets/fonts/Montserrat-Medium.ttf'),
    MontserratSemiBold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
  });

  const [loggedStatus, setLoggedStatus] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  function onAuthStateChanged(user) {
    if (user) {
      setUser(user);
      setLoggedStatus(true);
      console.log("User is signed in: ", user);
    } else {
      setUser(null);
      setLoggedStatus(false);
      console.log("User is signed out");
    }
  }

  const signOut = async () => {
    try {
      await auth().signOut();
      setUser(null);
      setLoggedStatus(false);
      console.log('User signed out successfully!');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!fontLoaded) {
    return null;
  }

  return (
      <SafeAreaProvider>
        {loggedStatus ? (
            <>
              <TabNavigator/>
              <Button title="Sign Out" onPress={signOut}/>
            </>
        ) : (
            <>
              {!showAuth ? (
                  <PreAuth onButtonPress={() => setShowAuth(true)}/>
              ) : (
                  <Auth/>
              )}
            </>
        )}
      </SafeAreaProvider>
  );
}

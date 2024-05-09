import { ScrollView, StyleSheet, Text, View, Image, StatusBar, Platform, Button, TextInput} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import React, {useEffect, useState} from "react";
import styled from "styled-components/native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/Login";
import Register from "./components/Register";


const Stack = createStackNavigator();



const Auth = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login"
                              component={Login}
                              options={{
                                  headerShown: false,
                              }}
                />
                <Stack.Screen name="Registration"
                              component={Register}
                              options={{
                                  headerShown: false,
                              }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};



export default Auth;
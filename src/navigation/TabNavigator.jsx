import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from "../screens/Home/Home";

import Tabs from "./BottomTabs/Tabs";
import Profile from "../screens/Profile/Profile";
import EventsStackNavigator from "./EventsStackNavigator";


const Tab = createBottomTabNavigator();


function TabNavigator() {

    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Map" tabBar={Tabs}   >
                <Tab.Screen name="EventsStackNavigator" component={EventsStackNavigator} options={{icon: 'calendar', headerShown: false, tabBarHideOnKeyboard: true}}/>
                <Tab.Screen name="Map" component={Home} options={{headerShown: false, icon: 'map'}}/>
                <Tab.Screen name="Profile" component={Profile} options={{icon: 'user'}} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default TabNavigator;
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from "../screens/Home/Home";

import Tabs from "./BottomTabs/Tabs";
import EventsStackNavigator from "./EventsStackNavigator";
import ProfileScreen from "../screens/Profile/Profile";


const Tab = createBottomTabNavigator();

function CustomTabBar(props) {
    return <Tabs {...props} />;
}

function TabNavigator() {

    return (
        <NavigationContainer >
            <Tab.Navigator initialRouteName="Map" tabBar={CustomTabBar}   >
                <Tab.Screen name="EventsStackNavigator" component={EventsStackNavigator} options={{icon: 'calendar', headerShown: false, tabBarHideOnKeyboard: true}}/>
                <Tab.Screen name="Map" component={Home} options={{headerShown: false, icon: 'map'}}/>
                <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false, icon: 'user'}} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default TabNavigator;
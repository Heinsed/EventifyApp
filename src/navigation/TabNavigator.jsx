import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from "../screens/Home/Home";
import Events from "../screens/Events/Events";
import Tabs from "./BottomTabs/Tabs";
import Profile from "../screens/Profile/Profile";

const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Map" tabBar={props => <Tabs {...props} />}>
                <Tab.Screen name="Events" component={Events} options={{icon: 'calendar'}}/>
                <Tab.Screen name="Map" component={Home} options={{headerShown: false, icon: 'map'}}/>
                <Tab.Screen name="Profile" component={Profile} options={{icon: 'user'}}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default TabNavigator;
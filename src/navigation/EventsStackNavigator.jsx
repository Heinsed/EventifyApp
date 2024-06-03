import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventDetails from "../screens/EventDetails/EventDetails";
import Events from "../screens/Events/Events";



const Stack = createNativeStackNavigator();

function EventsStackNavigator() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Events" component={Events} options={{headerShown:false}}  />
            <Stack.Screen name="EventDetails" component={EventDetails} options={{headerShown:false, tabBarStyle: { display: 'none' }  }} />
        </Stack.Navigator>
    );
}

export default EventsStackNavigator;
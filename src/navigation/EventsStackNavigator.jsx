import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventDetails from "../screens/EventDetails/EventDetails";



const Stack = createNativeStackNavigator();

function EventsStackNavigator() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Деталі івенту" component={EventDetails} options={{headerShown:false}} />
        </Stack.Navigator>
    );
}

export default EventsStackNavigator;
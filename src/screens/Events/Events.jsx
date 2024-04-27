import { ScrollView, StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventsStackNavigator from "../../navigation/EventsStackNavigator";


const Events = () => {


    return(
        <SafeAreaView>
            <EventsStackNavigator />
        </SafeAreaView>
    )
}




export default Events;
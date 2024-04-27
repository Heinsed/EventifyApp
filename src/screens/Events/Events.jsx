import {
    FlatList,
    Keyboard, Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventsStackNavigator from "../../navigation/EventsStackNavigator";
import SearchInput from "../../components/SearchInput";
import Container from '../../components/Container';
import styled from "styled-components/native";
import {UIStyles} from "../../styles/UI";
import FilterEvents from "../../components/Filter";


const Events = () => {


    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <EventsSreen >
            <StatusBar barStyle={Platform.OS === 'ios' ? "dark-content" : 'dark-content'} backgroundColor={'white'}/>
            <SafeAreaView>

                    <Container>
                        <SearchInput/>
                        <FilterEvents />
                    </Container>

                <EventsStackNavigator />

            </SafeAreaView>
        </EventsSreen>
        </TouchableWithoutFeedback>
    )
}

const EventsSreen = styled.View( () => ({
    background: UIStyles.colors.white,
    flex: 1
}));


export default Events;
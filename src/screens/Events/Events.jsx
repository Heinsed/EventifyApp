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
import styled from "styled-components/native";
import {UIStyles} from "../../styles/UI";
import FilterEvents from "../../components/Filter/Filter";
import EventCard from "./components/EventCard";
import {useState, useEffect} from "react";
import {fetchEvents} from "../../utils/getEvents";
import moment from "moment";


const Events = () => {
    const [events, setEvents] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSearch, setSelectedSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchEvents();

                setEvents(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);



    const handleCategoryChange = (categories) => {
        console.log(categories);
        setSelectedCategories(categories);
    };

    const handleSearchChange = (search) => {
        setSelectedSearch(search);
    };

    let filteredEvents = [];
    switch(true) {
        case selectedCategories.length > 0 && selectedSearch !== '':
            filteredEvents = events.filter(event => {
                const titleMatch = event.title.toLowerCase().includes(selectedSearch.toLowerCase());
                const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(event.category);
                return titleMatch && categoryMatch;
            });
            break;
        case selectedCategories.length > 0:
            filteredEvents = events.filter(event => selectedCategories.includes(event.category));
            break;
        case selectedSearch !== '':
            filteredEvents = events.filter(event => event.title.toLowerCase().includes(selectedSearch.toLowerCase()));
            break;
        default:
            filteredEvents = events;
    }


    return(

        <EventsScreen >
            <StatusBar barStyle={Platform.OS === 'ios' ? "dark-content" : 'dark-content'} backgroundColor={'white'}/>

                    <SearchInput onSearchChange={handleSearchChange} onFilterChange={handleCategoryChange} title={'Івенти'} />
                    <FilterEvents onFilterChange={handleCategoryChange}/>
                    <EventsList
                        data={filteredEvents}
                        renderItem={({item}) => <EventCard itemID={item.id} title={item.title} image={item.image} date={item.date} location={item.location} />}
                        keyExtractor={item => item.id}
                        keyboardShouldPersistTaps='handled'
                        keyboardDismissMode="on-drag"

                    />

                    {/*TODO: Fix bottom padding when scrolling*/}

                {/*<EventsStackNavigator />*/}


        </EventsScreen>

    )
}

const EventsScreen = styled(SafeAreaView)( () => ({
    background: UIStyles.colors.white,
    flex: 1,

}));

const EventsList = styled.FlatList( () => ({
    borderTopWidth: 1,
    borderTopColor: UIStyles.colors.grey,
    marginTop: 20,
    paddingLeft: 24,
    paddingRight: 24,
}));


export default Events;
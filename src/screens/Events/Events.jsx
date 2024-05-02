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
import FilterEvents from "../../components/Filter/Filter";
import EventCard from "./components/EventCard";
import {fetchEventData} from "../../api/getEvents";
import {useState, useEffect} from "react";


const Events = () => {
    const [events, setEvents] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSearch, setSelectedSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchEventData();
                setEvents(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);



    const handleCategoryChange = (categories) => {
        setSelectedCategories(categories);
        setSelectedSearch('');
    };

    const handleSearchChange = (search) => {
        setSelectedSearch(search);
    };

    let filteredEvents = [];
    switch(true) {
        case selectedCategories.length > 0 && selectedSearch !== '':
            filteredEvents = events.filter(event => {
                const titleMatch = event.Title.toLowerCase().includes(selectedSearch.toLowerCase());
                const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(event.Category);
                return titleMatch && categoryMatch;
            });
            break;
        case selectedCategories.length > 0:
            filteredEvents = events.filter(event => selectedCategories.includes(event.Category));
            break;
        case selectedSearch !== '':
            filteredEvents = events.filter(event => event.Title.toLowerCase().includes(selectedSearch.toLowerCase()));
            break;
        default:
            filteredEvents = events;
    }


    return(

        <EventsScreen >
            <StatusBar barStyle={Platform.OS === 'ios' ? "dark-content" : 'dark-content'} backgroundColor={'white'}/>
            <SafeAreaView >
                    <SearchInput onSearchChange={handleSearchChange} onFilterChange={handleCategoryChange} title={'Івенти'} />
                    <FilterEvents onFilterChange={handleCategoryChange}/>
                    <EventsList
                        data={filteredEvents}
                        renderItem={({item}) => <EventCard itemID={item.id} title={item.Title} image={item.Image} date={item.Date} year={item.Year} time={item.Time} location={item.Location} />}
                        keyExtractor={item => item.id}
                        keyboardShouldPersistTaps='handled'
                        keyboardDismissMode="on-drag"

                    />

                    {/*TODO: Fix bottom padding when scrolling*/}

                <EventsStackNavigator />

            </SafeAreaView>
        </EventsScreen>

    )
}

const EventsScreen = styled.View( () => ({
    background: UIStyles.colors.white,
    flex: 1,
    gap: 0,
}));

const EventsList = styled.FlatList( () => ({
    borderTopWidth: 1,
    borderTopColor: UIStyles.colors.grey,
    marginTop: 20,
    paddingLeft: 24,
    paddingRight: 24,
}));


export default Events;
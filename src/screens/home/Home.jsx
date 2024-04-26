import { ScrollView, StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useEffect, useState} from "react";
import {fetchEventData} from "../../api/getEvents";
import styled from 'styled-components/native';
import EventCard from "../../components/EventCard/EventCard";

const Home = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchEventData();
                setEvents(data._embedded.events);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

    return(
        <SafeAreaView>
            <ScrollView>
                <EventList>
                    {events.map(event => (
                        <EventCard key={event.id} eventID={event.id} eventTitle={event.name} image={event.images[0].url} date={event.sales.public.endDateTime}/>
                    ))}
                </EventList>
            </ScrollView>
        </SafeAreaView>
    )
}


const EventList = styled.View`
    gap: 16px;
`;

export default Home;
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useEffect, useState} from "react";
import {fetchEventData} from "../../api/getEvents";
import styled from 'styled-components/native';
import EventCard from "../Events/components/EventCard";

const EventDetails = () => {


    return(
        <SafeAreaView>
            <Text>Event details</Text>
        </SafeAreaView>
    )
}




export default EventDetails;
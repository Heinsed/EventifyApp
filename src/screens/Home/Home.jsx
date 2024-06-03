import { StyleSheet, StatusBar, Platform, Text } from 'react-native';
import React, { useEffect, useLayoutEffect, useState, useCallback, useRef } from "react";
import styled from 'styled-components/native';
import MapView from 'react-native-map-clustering';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import UIStyles from "../../styles/UI";
import mainStore from "../../stores/MainStore";
import {lightMapStyle, darkMapStyle} from "../../styles/MapStyles";
import {observer} from "mobx-react-lite";
import EventDetails from './components/EventDetails';



const initialRegion = {
    latitude: 1,
    longitude: 1,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
};

const Home = observer(() => {
    const { themeStore, eventsStore } = mainStore;
    const currentTheme = themeStore.theme;

    const mapRef = useRef();
    const [location, setLocation] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const eventDetails = useRef();

    const {
        events,
        fetchData,
    } = eventsStore;

    useLayoutEffect(() => {
        eventsStore.fetchData(false);
    }, [fetchData]);



    useLayoutEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocation(null);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);

            let region = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            };

            mapRef.current.animateToRegion(region, 2000);
        })();
    }, []);

    const handleMarkerPress = useCallback((event) => {
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: event.geo.latitude - 0.002,
                longitude: event.geo.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
        }
        setSelectedEvent(event);
        eventDetails.current.show()
    }, []);

    return (
        <>
            <StatusBar
                barStyle={currentTheme === 'dark' ? "light-content" : "dark-content"}
                backgroundColor={currentTheme === 'dark' ? UIStyles.dark.background : UIStyles.light.background}
            />
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                initialRegion={initialRegion}
                clusterColor={currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green}
                customMapStyle={currentTheme === 'dark' ? darkMapStyle : lightMapStyle}
            >
                {events.length > 0 &&
                    events.map((event, id) => (
                        <Marker
                            key={id}
                            coordinate={{
                                latitude: event.geo.latitude,
                                longitude: event.geo.longitude,
                            }}
                            onPress={() => handleMarkerPress(event)}
                        >
                            <MarkerCircle currentTheme={currentTheme}>
                                <MarkerImage
                                    source={{
                                        uri: event.image,
                                    }}
                                />
                            </MarkerCircle>
                            <MarkerDot />
                        </Marker>
                    ))
                }
            </MapView>
            <EventDetails eventDetails={eventDetails} setSelectedEvent={setSelectedEvent} selectedEvent={selectedEvent} />
        </>
    );
});

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});

const MarkerCircle = styled.View(({currentTheme})=> ({
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green,
}));

const MarkerImage = styled.Image({
    width: 40,
    height: 40,
    borderRadius: 50,
});

const MarkerDot = styled.View(({currentTheme})=> ({
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green,
    alignSelf: 'center',
    marginTop: -5
}));

export default Home;

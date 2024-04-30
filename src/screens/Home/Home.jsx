import { ScrollView, StyleSheet, Text, View, Image, StatusBar, Platform} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, {useEffect, useState} from "react";
import {fetchEventData} from "../../api/getEvents";
import styled from 'styled-components/native';
import MapView from 'react-native-map-clustering';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import {UIStyles} from "../../styles/UI";

const initialRegion = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
};

const Home = () => {
    const [location, setLocation] = useState(null);
    const mapRef = React.useRef();
    const [events, setEvents] = useState([]);


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

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                let location = null;
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
            let region = {
                latitude:  location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
            };

            mapRef.current.animateToRegion(region, 2000);
        })();
    }, []);








    const handleMarkerPress = (event) => {
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: event.Latitude,
                longitude: event.Longitude,
                latitudeDelta: 0.0002,
                longitudeDelta: 0.0002,
            });
        }

    };





    return (
        <>
            <StatusBar barStyle={Platform.OS === 'ios' ? "dark-content" : 'light-content'}/>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                initialRegion={initialRegion}
                clusterColor={UIStyles.colors.green}


            >
                {events.map((event, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: event.Latitude,
                            longitude: event.Longitude,
                        }}
                        onPress={() => handleMarkerPress(event)}
                    >
                        <MarkerCircle>
                            <MarkerImage
                                source={{
                                uri: event.Image,
                                }}
                            />
                        </MarkerCircle>
                        <MarkerDot />
                    </Marker>
                ))}

            </MapView>
        </>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },

});




const MarkerCircle = styled.View({
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: true,
    borderWidth: 5,
    borderColor: UIStyles.colors.green,
});


const MarkerImage = styled.Image({
    width: 40,
    height: 40,
    borderRadius: 50,
});

const MarkerDot = styled.Image({
    width: 10,
    height: 10,
    borderRadius: 10,
    background: UIStyles.colors.green,
    margin: '0 auto',
    marginTop: -5

});





export default Home;
import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import styled from 'styled-components/native';

const EventDetails = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { itemID, image, title, date, location, permalink } = route.params;

    return (
        <Container>
            <EventImage source={{ uri: image }} />
            <Content>
                <Title>{title}</Title>
                <Date>{moment(date).format('MMMM Do YYYY, h:mm a')}</Date>
                <Location>{location}</Location>
                <Permalink>{permalink}</Permalink>
                <Button title="Close" onPress={() => navigation.goBack()} />
            </Content>
        </Container>
    );
};

const Container = styled.ScrollView`
    flex: 1;
    background-color: white;
`;

const EventImage = styled.Image`
    width: 100%;
    height: 300px;
`;

const Content = styled.View`
    padding: 16px;
`;

const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
`;

const Date = styled.Text`
    color: grey;
    margin-bottom: 8px;
`;

const Location = styled.Text`
    font-size: 16px;
    margin-bottom: 16px;
`;

const Permalink = styled.Text`
    font-size: 16px;
    color: blue;
    margin-bottom: 16px;
`;

export default EventDetails;
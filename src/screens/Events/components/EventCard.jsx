import React, { useCallback } from 'react';
import { Image, View, Text, TouchableOpacity, Share } from 'react-native';
import styled from "styled-components/native";
import UIStyles from "../../../styles/UI";
import Icon from "../../../components/Icon";
import AddToWishlist from "../../../components/Wishlist/components/AddToWishlist";
import EventCardDate from "./EventCardDate";
import { useNavigation } from "@react-navigation/native";
import CustomPressable from "../../../components/CustomPressable";
import mainStore from "../../../stores/MainStore";



const EventCard = ({ event }) => {
    const navigation = useNavigation();

    const { themeStore } = mainStore;
    const currentTheme = themeStore.theme;

    const showDetails = useCallback(() => {
        navigation.navigate('EventDetails', {event});
    }, [navigation, event]);

    const onShare = useCallback(async () => {
        try {
            await Share.share({
                message: `Доєднуйся до івенту ${event.title} за адресою: ${event.location} о ${event.date}`
            });
        } catch (error) {
            console.log('Помилка:', error.message);
        }
    }, [event.title, event.location, event.date]);

    return (
        <EventCardContainer onPress={showDetails} currentTheme={currentTheme}>
            <EventCardImageWrapper currentTheme={currentTheme}>
                <EventCardImage
                    source={{
                        uri: event.image,
                    }}
                />
            </EventCardImageWrapper>
            <EventCardTitleWrapper>
                <EventCardTitle numberOfLines={1} currentTheme={currentTheme}>{event.title}</EventCardTitle>
                <AddToWishlist event={event} />
                <ShareButton targetFunction={onShare}>
                    <Icon iconType={'share'} color={currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green} size={24} />
                </ShareButton>
            </EventCardTitleWrapper>
            <EventCardInformation>
                <EventCardDateWrapper>
                    <Icon iconType={'time'} color={currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green} size={24} />
                    <EventCardDate date={event.date} />
                </EventCardDateWrapper>
                <EventCardLocationWrapper>
                    <Icon iconType={'location'} color={currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green} size={24} />
                    <EventCardLocationText currentTheme={currentTheme}>
                        {event.location}
                    </EventCardLocationText>
                </EventCardLocationWrapper>
            </EventCardInformation>
        </EventCardContainer>
    )
}

const EventCardContainer = styled.TouchableOpacity(({currentTheme}) => ({
    borderBottomWidth: 1,
    borderBottomColor: currentTheme === 'dark' ? UIStyles.dark.lightGrey : UIStyles.light.grey,
    marginTop: 20,
    paddingBottom: 20,
}));

const EventCardImageWrapper = styled.View(({currentTheme}) => ({
    marginBottom: 12,
    background: currentTheme === 'dark' ? UIStyles.dark.lightGrey : UIStyles.light.grey,
    borderRadius: 10,
}));

const EventCardImage = styled.Image(() => ({
    width: '100%',
    height: 140,
    borderRadius: 10,
}));

const EventCardTitleWrapper = styled.View(() => ({
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    alignItems: 'center',
}));

const EventCardTitle = styled.Text(({currentTheme}) => ({
    fontSize: 18,
    textTransform: 'uppercase',
    fontFamily: 'MontserratSemiBold',
    color: currentTheme === 'dark' ? UIStyles.dark.black : UIStyles.light.black,
    textAlign: 'left',
    margin: '0 auto',
    marginLeft: 0,
    maxWidth: '80%',
}));

const EventCardInformation = styled.View(() => ({}));

const EventCardDateWrapper = styled.View(() => ({
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 15,
}));

const EventCardLocationWrapper = styled.View(() => ({
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',

}));

const EventCardLocationText = styled.Text(({currentTheme}) => ({
    fontSize: 13,
    color: currentTheme === 'dark' ? UIStyles.dark.black : UIStyles.light.black,
    fontFamily: 'MontserratMedium',
    flexWrap: 'wrap',
    flex: 1,
}));

const ShareButton = styled(CustomPressable)(() => ({}));

export default EventCard;

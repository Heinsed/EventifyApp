import React from 'react';
import {View, Text, Button, Image, Share, StatusBar} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import styled from 'styled-components/native';
import mainStore from "../../stores/MainStore";
import AddToWishlist from "../../components/Wishlist/components/AddToWishlist";
import Icon from "../../components/Icon";
import UIStyles from "../../styles/UI";
import {useCallback} from "react";
import EventCardDate from "../Events/components/EventCardDate";
import CustomPressable from "../../components/CustomPressable";
import {SafeAreaView} from "react-native-safe-area-context";





const EventDetails = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { event } = route.params;
    const { themeStore } = mainStore;
    const currentTheme = themeStore.theme;
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
       <>
           <StatusBar
               barStyle={currentTheme === 'dark' ? "light-content" : "light-content"}
               backgroundColor={currentTheme === 'dark' ? UIStyles.dark.background : UIStyles.light.background}
           />
           <EventDetailsHeader currentTheme={currentTheme}>
               <EventDetailsHeaderBackButton targetFunction={() => navigation.goBack()}>
                   <Icon iconType={'arrow-left'} color={currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green} size={32} />
               </EventDetailsHeaderBackButton>

               <EventDetailsImage
                   source={{
                       uri: event.image,
                   }}
               />

           </EventDetailsHeader>
           <EventDetailsContainer currentTheme={currentTheme}>
               <EventCardTitleWrapper>
                   <EventCardTitle numberOfLines={1} currentTheme={currentTheme}>{event.title}</EventCardTitle>
                   <AddToWishlist event={event} />
                   <ShareButton targetFunction={onShare}>
                       <Icon iconType={'share'} color={currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green} size={24} />
                   </ShareButton>
               </EventCardTitleWrapper>
               <EventCardDateWrapper>
                   <Icon iconType={'time'} color={currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green} size={24} />
                   <EventCardDate date={event.date} />
               </EventCardDateWrapper>
               <EventCardLocationWrapper currentTheme={currentTheme}>
                   <Icon iconType={'location'} color={currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green} size={24} />
                   <EventCardLocationText currentTheme={currentTheme}>
                       {event.location}
                   </EventCardLocationText>
               </EventCardLocationWrapper>
               <EventCardDescriptionContainer currentTheme={currentTheme}>
                   <EventCardDescriptionTitle currentTheme={currentTheme}>
                       ОПИС
                   </EventCardDescriptionTitle>
                   <EventCardDescriptionText currentTheme={currentTheme}>
                       {event.description}
                   </EventCardDescriptionText>
               </EventCardDescriptionContainer>
               {/*TODO : Add navigation button to event*/}
           </EventDetailsContainer>
       </>
    );
};


const EventDetailsHeader = styled.View(({currentTheme})=> ({
    width: '100%',
    height: 300,
    backgroundColor: currentTheme === 'dark' ? UIStyles.dark.lightGrey : UIStyles.light.lightGrey,
}));

const EventDetailsHeaderBackButton = styled(CustomPressable)(({currentTheme})=> ({
    width: 50,
    position: 'absolute',
    left: 24,
    top: 24,
    zIndex: 2,
    marginTop: 24,
    height: 50,
}));

const EventDetailsImage = styled.Image(({currentTheme})=> ({
    width: '100%',
    height: '100%',
}));

const EventDetailsContainer = styled.ScrollView(({currentTheme})=> ({
    paddingLeft: 24,
    paddingRight: 24,
    background: currentTheme === 'dark' ? UIStyles.dark.white : UIStyles.light.white,
}));

const EventCardTitleWrapper = styled.View(() => ({
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    alignItems: 'center',
    marginTop: 15,
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

const ShareButton = styled(CustomPressable)(() => ({}));

const EventCardDateWrapper = styled.View(({currentTheme})=> ({
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 15,

}));

const EventCardLocationWrapper = styled.View(({currentTheme}) => ({
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 15,
    borderBottomColor: currentTheme === 'dark' ? UIStyles.dark.lightGrey : UIStyles.light.grey,
}));

const EventCardLocationText = styled.Text(({currentTheme}) => ({
    fontSize: 13,
    color: currentTheme === 'dark' ? UIStyles.dark.black : UIStyles.light.black,
    fontFamily: 'MontserratMedium',
    flexWrap: 'wrap',

}));


const EventCardDescriptionContainer = styled.View(({currentTheme}) => ({

}));

const EventCardDescriptionTitle = styled.Text(({currentTheme}) => ({
    fontSize: 18,
    marginTop: 15,
    marginBottom: 15,
    textTransform: 'uppercase',
    fontFamily: 'MontserratSemiBold',
    color: currentTheme === 'dark' ? UIStyles.dark.black : UIStyles.light.black,
    textAlign: 'left',
    marginLeft: 0,
    maxWidth: '80%',
}));

const EventCardDescriptionText = styled.Text(({currentTheme}) => ({
    fontSize: 13,
    color: currentTheme === 'dark' ? UIStyles.dark.black : UIStyles.light.black,
    fontFamily: 'MontserratMedium',
    flexWrap: 'wrap',
    flex: 1,
}));

export default EventDetails;
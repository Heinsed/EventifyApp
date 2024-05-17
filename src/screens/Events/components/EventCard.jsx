import {Image, View, Text, TouchableOpacity} from 'react-native';
import {useState} from "react";
import styled from "styled-components/native";
import {UI, UIStyles} from "../../../styles/UI";
import Icon from "../../../components/Icon";
import AddToWishlist from "../../../components/Wishlist/components/AddToWishlist";
import EventCardDate from "./EventCardDate";


const EventCard = ({itemID, image, title, date, location, permalink}) => {
    return (
        <EventCardContainer>
            <EventCardImageWrapper>
                <EventCardImage
                    source={{
                    uri: image,
                    }}
                />
            </EventCardImageWrapper>
            <EventCardTitleWrapper>
                <EventCardTitle numberOfLines={1}>{title}</EventCardTitle>
                <AddToWishlist itemID={itemID} />
            </EventCardTitleWrapper>
            <EventCardInformation>
                <EventCardDateWrapper>
                    <Icon iconType={'time'} color={UIStyles.colors.green} size={24}/>
                    <EventCardDate date={date} />
                </EventCardDateWrapper>
                <EventCardLocationWrapper>
                    <Icon iconType={'location'} color={UIStyles.colors.green} size={24}/>
                    <EventCardLocationText>
                        {location}
                    </EventCardLocationText>
                </EventCardLocationWrapper>
            </EventCardInformation>
        </EventCardContainer>
    )
}


const EventCardContainer = styled.View(() =>({
    borderBottomWidth: 1,
    borderBottomColor: UIStyles.colors.grey,
    marginTop: 20,
    paddingBottom: 20,
}));

const EventCardImageWrapper = styled.View(() =>({
    marginBottom: 12,
    background: UIStyles.colors.grey,
    borderRadius: 10,
}));

const EventCardImage = styled.Image(() =>({
    width: '100%',
    height: 140,
    borderRadius: 10,
}));

const EventCardTitleWrapper = styled.View(() =>({
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center',
}));

const EventCardTitle = styled.Text(() =>({
    fontSize: 18,
    textTransform: 'uppercase',
    fontFamily: 'MontserratSemiBold',
    maxWidth: '90%',
}));

const EventCardInformation = styled.View(() =>({

}));

const EventCardDateWrapper = styled.View(() =>({
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 15,
}));




const EventCardLocationWrapper = styled.View(() =>({
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
}));

const EventCardLocationText = styled.Text(() =>({
    fontSize: 13,
    fontFamily: 'MontserratMedium',
    flexWrap: 'wrap',
    flex: 1,
}));


export default EventCard;
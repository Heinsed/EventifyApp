import {Image, View, Text, TouchableOpacity, Share} from 'react-native';
import {useState} from "react";
import styled from "styled-components/native";
import UIStyles from "../../../styles/UI";
import Icon from "../../../components/Icon";
import AddToWishlist from "../../../components/Wishlist/components/AddToWishlist";
import EventCardDate from "./EventCardDate";
import CustomPressable from "../../../components/CustomPressable";


const EventCard = ({itemID, image, title, date, location, permalink}) => {
    const onShare = async () => {
        try {
            await Share.share({
                message: `Доєднуйся до івенту ${title} за адресою: ${location} о ${date}`
            });
        } catch (error) {
            console.log('Помилка:', error.message);
        }
    };


    return (
        <EventCardContainer onPress={}>
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
                <ShareButton targetFunction={() => onShare()}>
                    <Icon iconType={'share'} color={UIStyles.colors.green} size={24} />
                </ShareButton>
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
    justifyContent: 'flex-end',
    gap: 10,
    alignItems: 'center',
}));

const EventCardTitle = styled.Text(() =>({
    fontSize: 18,
    textTransform: 'uppercase',
    fontFamily: 'MontserratSemiBold',
    textAlign: 'left',
    margin: '0 auto',
    marginLeft: 0,
    maxWidth: '80%',
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

const ShareButton = styled(CustomPressable)(() =>({

}));


export default EventCard;
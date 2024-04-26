import {Image, View, Text, TouchableOpacity} from 'react-native';
import {useState} from "react";
import styled from "styled-components/native";
import {stylesVars} from "../../styles/vars";
import CalendarIcon from '@iconscout/react-native-unicons/icons/uil-calendar-alt';
import CartIcon from '@iconscout/react-native-unicons/icons/uil-shopping-cart';
import WishIcon from '@iconscout/react-native-unicons/icons/uil-heart';

const EventCard = (props) => {

    const date = new Date(props.date);


    const hours = date.getHours();
    const minutes = date.getMinutes();

    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();


    const [wishColor, setWishColor] = useState(stylesVars.colors.green);


    const toggleWishItem = () => {
        if (wishColor === stylesVars.colors.green) {
            setWishColor('#EC1B5A');
            console.log(`${props.eventID} added to wishlist`);
        } else {
            setWishColor(stylesVars.colors.green);
            console.log(`${props.eventID} removed from wishlist`);
        }
    };

    return (
        <WrapperCard>
            <WrapperImage>
                <CardImage source={{ uri: props.image }} />
            </WrapperImage>
            <TextContainer>

                <WrapperTitle numberOfLines={2}>
                    {props.eventTitle}
                </WrapperTitle>
                {!isNaN(date) && (
                    <WrapperDate>
                        <CalendarIcon color={stylesVars.colors.dark} size="18"/>
                        <WrapperDateText>{day}.{month}.{year} {hours}:{minutes}</WrapperDateText>
                    </WrapperDate>
                )}
                <WrapperLinks>
                    <WishButton onPress={() => toggleWishItem()}>
                        <WishIcon color={wishColor} size="24"/>
                    </WishButton>
                    <BuyTicket onPress={() => console.log(`buy ticket pressed ${props.eventID}`)}>
                        <CartIcon color={stylesVars.colors.white} size="18"/>
                        <BuyTicketText>Buy Ticket</BuyTicketText>
                    </BuyTicket>
                </WrapperLinks>
            </TextContainer>
        </WrapperCard>
    )
}

const WrapperCard = styled.View`
    flex: 1;
    width: 90%;
    margin: 0 auto;
    flex-direction: row;
    gap: 20px;
    background: ${stylesVars.colors.grey};
    padding: 8px;
    border-radius: 16px;
    align-items: center;
    shadow-color: #000;
    shadow-offset: 0 2px;
    shadow-opacity: 0.20;
    shadow-radius: 5px;
    elevation: 2;
`;

const WrapperImage = styled.View`
   
`;

const CardImage = styled.Image`
    width: 120px;
    border-radius: 8px;
    height: 100%;
`;

const TextContainer = styled.View`
    flex: 8; 
    width: calc(100% - 140px);
   
`;

const WrapperTitle = styled.Text`
    font-size: 14px;
    font-weight: 600;
    font-family: 'MontserratBold';
    margin-bottom: 10px;
`;

const WrapperDate = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

const WrapperDateText = styled.Text`
    font-family: 'MontserratRegular';
    font-size: 12px;
    
`;

const WrapperLinks = styled.View`
    justify-content: space-between;
    flex-direction: row;
    margin-top: 16px;
    min-width: 100%;
    gap: 20px;
    align-items: center;
 
`;

const BuyTicket = styled.TouchableOpacity`
    background: ${stylesVars.colors.green};
    flex-direction: row;
    padding: 10px 20px;
    border-radius: 8px;
    gap: 8px;
    align-items: center;
    flex: 1;
    justify-content: center;
`;

const BuyTicketText = styled.Text`
    color: ${stylesVars.colors.white};
    font-family: 'MontserratBold';
`;




const WishButton = styled.TouchableOpacity`
    width: 24px;
`;

export default EventCard;
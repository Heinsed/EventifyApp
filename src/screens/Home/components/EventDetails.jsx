import BottomSheet from "react-native-gesture-bottom-sheet";
import {Share, Text} from "react-native";
import styled from "styled-components/native";
import UIStyles from "../../../styles/UI";
import mainStore from "../../../stores/MainStore";
import EventCardDate from "../../Events/components/EventCardDate";
import Icon from "../../../components/Icon";
import {getCategoryForEvent} from "../../../utils/getCategories";
import {useEffect, useLayoutEffect, useCallback} from "react";
import AddToWishlist from "../../../components/Wishlist/components/AddToWishlist";
import CustomPressable from "../../../components/CustomPressable";


const EventDetails = ({eventDetails, setSelectedEvent, selectedEvent}) => {
    const {themeStore} = mainStore;
    const currentTheme = themeStore.theme;

    const onShare = useCallback(async () => {
        try {
            await Share.share({
                message: `Доєднуйся до івенту ${selectedEvent?.title} за адресою: ${selectedEvent?.location} о ${selectedEvent?.date}`
            });
        } catch (error) {
            console.log('Помилка:', error.message);
        }
    }, [selectedEvent?.title, selectedEvent?.location, selectedEvent?.date]);

    return (
        <BottomSheet
            ref={eventDetails}
            height={600}
            backgroundColor={'transparent'}
            onRequestClose={() => {
                eventDetails.current.close();
                setSelectedEvent(null);
            }}
            sheetBackgroundColor={currentTheme === 'dark' ? UIStyles.dark.white : UIStyles.light.white}
        >
            <EventDetailsHeader currentTheme={currentTheme}>
                <EventDetailsHeaderMarker />
                <EventDetailsImage
                    source={{
                        uri: selectedEvent?.image,
                    }}
                />
            </EventDetailsHeader>
            <EventDetailsContainer>
                <EventCardTitleWrapper>
                    <EventCardTitle numberOfLines={1} currentTheme={currentTheme}>{selectedEvent?.title}</EventCardTitle>
                    <AddToWishlist event={selectedEvent} />
                    <ShareButton targetFunction={onShare}>
                        <Icon iconType={'share'} color={currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green} size={24} />
                    </ShareButton>
                </EventCardTitleWrapper>
                <EventCardDateWrapper>
                    <Icon iconType={'time'} color={currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green} size={24} />
                    <EventCardDate date={selectedEvent?.date} />
                </EventCardDateWrapper>
                <EventCardLocationWrapper currentTheme={currentTheme}>
                    <Icon iconType={'location'} color={currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green} size={24} />
                    <EventCardLocationText currentTheme={currentTheme}>
                        {selectedEvent?.location}
                    </EventCardLocationText>
                </EventCardLocationWrapper>
                <EventCardDescriptionContainer currentTheme={currentTheme}>
                    <EventCardDescriptionTitle currentTheme={currentTheme}>
                        ОПИС
                    </EventCardDescriptionTitle>
                    <EventCardDescriptionText numberOfLines={9} currentTheme={currentTheme}>
                        {selectedEvent?.description}
                    </EventCardDescriptionText>
                </EventCardDescriptionContainer>
                {/*TODO : Add navigation button to event*/}
            </EventDetailsContainer>
        </BottomSheet>
    )
}

const EventDetailsHeader = styled.View(({currentTheme})=> ({
    width: '100%',
    height: 200,
    alignItems: 'center',
    backgroundColor: currentTheme === 'dark' ? UIStyles.dark.lightGrey : UIStyles.light.lightGrey,
}));

const EventDetailsHeaderMarker = styled.View(({currentTheme})=> ({
    width: 40,
    height: 5,
    position: 'absolute',
    top: 10,
    opacity: 0.3,
    borderRadius: 3,
    zIndex: 2,
    backgroundColor: currentTheme === 'dark' ? UIStyles.dark.dark : UIStyles.light.lightGrey,
}));

const EventDetailsImage = styled.Image(({currentTheme})=> ({
    width: '100%',
    height: '100%',
}));

const EventDetailsContainer = styled.ScrollView(({currentTheme})=> ({
    paddingLeft: 24,
    paddingRight: 24,
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
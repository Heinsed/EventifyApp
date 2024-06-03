import styled from "styled-components/native";
import { observer } from "mobx-react-lite";
import mainStore from "../../../stores/MainStore";
import {RefreshControl, Text} from 'react-native';
import UIStyles from "../../../styles/UI";
import Icon from "../../Icon";
import EventCardDate from "../../../screens/Events/components/EventCardDate";
import {PanResponder} from "react-native";
import {useRef} from "react";


const WishlistModal = observer(() => {
    const { wishlistStore, themeStore } = mainStore;
    const { currentTheme } = themeStore.theme;
    const { wishlist } = wishlistStore;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        })
    ).current;

    const EventItem = ({item}) => {
    console.log(item);
        return (
            <EventItemContainer {...panResponder.panHandlers}>
                <EventImageWrapper>
                    <EventImage
                        source={{
                            uri: item.image,
                        }}
                    />
                </EventImageWrapper>
                <EventText>
                    <EventTitle currentTheme={currentTheme}>
                        {item.title}
                    </EventTitle>
                    <EventCardLocationWrapper>
                        <Icon iconType={'location'} color={currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green} size={24} />
                        <EventCardLocationText currentTheme={currentTheme}>
                            {item.location}
                        </EventCardLocationText>
                    </EventCardLocationWrapper>
                </EventText>
            </EventItemContainer>
        )
    }

    return (
        <WishlistModalContainer currentTheme={currentTheme}>
            <WishlistHeaderMarker />
            <WishlistModalTitle currentTheme={currentTheme}>
                Уподобання
            </WishlistModalTitle>
            <WishlistList
                data={wishlist}
                renderItem={EventItem}
                keyExtractor={item => item.id}
                keyboardShouldPersistTaps='handled'
                keyboardDismissMode="on-drag"
            />
        </WishlistModalContainer>
    );
});

const WishlistModalContainer = styled.View(({currentTheme})=> ({
    paddingTop: 32,
    paddingLeft: 24,
    paddingRight: 24,
    alignItems: 'center',
    paddingBottom: 50,
}));

const WishlistHeaderMarker = styled.View(({currentTheme})=> ({
    width: 40,
    height: 5,
    position: 'absolute',
    top: 10,
    opacity: 0.3,
    borderRadius: 3,
    zIndex: 2,
    backgroundColor: currentTheme === 'dark' ? UIStyles.dark.dark : UIStyles.light.dark,
}));

const WishlistModalTitle = styled.Text(() => ({
    fontSize: 18,
    fontFamily: 'MontserratBold',
    textTransform: 'uppercase',
    marginBottom: 15,
    textAlign: 'left',
    width: '100%',
}));

const WishlistList = styled.FlatList(() => ({
    width: '100%',

}));

const EventItemContainer = styled.View(() => ({
    flexDirection: 'row',
    gap: 15,
    minWidth: '100%',
    alignItems: 'center',
    marginBottom: 20,
}));

const EventImageWrapper = styled.View(() => ({
    width: 70,
    height: 70,
}));

const EventImage = styled.Image(() => ({
    width: 70,
    height: 70,
    borderRadius: 8,
}));

const EventText = styled.View(() => ({
    width: '80%',
    gap: 10,
}));

const EventTitle = styled.Text(({currentTheme}) => ({
    fontSize: 18,
    textTransform: 'uppercase',
    fontFamily: 'MontserratSemiBold',
    color: currentTheme === 'dark' ? UIStyles.dark.black : UIStyles.light.black,
    textAlign: 'left',
    margin: '0 auto',
    marginLeft: 0,

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

export default WishlistModal;

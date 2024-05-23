import styled from "styled-components/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {FlatList, View, Text} from "react-native";
import {Dimensions} from "react-native";
import {useState, useRef, useEffect} from "react";
import CustomPressable from "../../components/CustomPressable";
import Auth from '../Auth/Auth';
import Slide from "./components/Slide";
import UIStyles from "../../styles/UI";

const data = [
    {
        id: 'slide1',
        title: 'Івенти та круті плейси твого міста прямо в телефоні',
        image: require('./assets/slide1.png'),
    },
    {
        id: 'slide2',
        title: 'Фільтруй івенти та обирай потрібні за інтересами',
        image: require('./assets/slide2.png'),
    },
    {
        id: 'slide3',
        title: 'Наш розумний "фільтр" буде рекомендувати тобі івенти базуючись на твоїх інтересах',
        image: require('./assets/slide3.png'),

    },
    {
        id: 'slide4',
        title: 'Використовуючи мапу дивись івенти по всьму світу, та обирай цікаві',
        image: require('./assets/slide4.png'),

    }

];
console.log(UIStyles);
const PreAuth = ({ onButtonPress }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);
    const [showButton, setShowButton] = useState(false);
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [autoScrollPaused, setAutoScrollPaused] = useState(false);


    useEffect(() => {
        if (currentIndex === data.length - 1) {
            setShowButton(true);
            setScrollEnabled(false);
        } else {
            setShowButton(false);
            setScrollEnabled(true);
        }
    }, [currentIndex]);

    useEffect(() => {
        if (currentIndex === data.length - 1 || autoScrollPaused ) {
            return;
        }
        const timer = setInterval(() => {
            if (flatListRef.current) {
                flatListRef.current.scrollToIndex({
                    animated: true,
                    index: (currentIndex + 1) % data.length,
                });
                setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
            }
        }, 2000);

        return () => clearInterval(timer);
    }, [currentIndex, autoScrollPaused]);

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffsetX / Dimensions.get('window').width);
        setCurrentIndex(index);
    };


    const handleEndReached = () => {
        setShowButton(true);
    };

    const handleScrollBeginDrag = () => {
        setAutoScrollPaused(true);
    };

    const handleScrollEndDrag = () => {
        setAutoScrollPaused(false);
    };


    const renderDots = () => {
        return (
            <DotsContainer>
                {data.map((_, index) => (
                    <DotsItem
                        key={index}
                        style={[
                            { opacity: index === currentIndex ? 1 : 0.5 },
                        ]}
                    />
                ))}
            </DotsContainer>
        );
    };

    const renderItem = ({ item }) => {
        return <Slide itemID={item.id} title={item.title} image={item.image} />;
    };

    return (
        <PreAuthScreen>
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                onScroll={handleScroll}
                onEndReached={handleEndReached}
                scrollEnabled={scrollEnabled}
                onScrollBeginDrag={handleScrollBeginDrag}
                onScrollEndDrag={handleScrollEndDrag}
            />
            <BottomContainer>
            {renderDots()}
            {showButton && (
                <ContinueButton targetFunction={() =>  onButtonPress()}>
                    <ContinueButtonText >Продовжити</ContinueButtonText>
                </ContinueButton>
            )}
            </BottomContainer>
        </PreAuthScreen>
    )
}

const PreAuthScreen = styled(SafeAreaView)({
    flex: 1,
    background: UIStyles.colors.green
});

const BottomContainer = styled.View({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingLeft: 36,
    paddingRight: 36,
    height: 36,
});

const ContinueButton = styled(CustomPressable)({
    background: UIStyles.colors.darkGreen,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    alignSelf: 'flex-end',
    borderRadius: 4,

});

const ContinueButtonText = styled.Text({
    color: UIStyles.colors.white,
    fontSize: 16,
    fontFamily: 'MontserratSemiBold'
});

const DotsContainer = styled.View({
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',


});

const DotsItem = styled.View({
    width: 8,
    height: 8,
    borderRadius: 8,
    background: UIStyles.colors.white
});




export default PreAuth;
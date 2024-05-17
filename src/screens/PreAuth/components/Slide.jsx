import styled from "styled-components/native";
import {Dimensions, View, Image} from "react-native";
import { SvgCssUri } from 'react-native-svg/css';
import {UIStyles} from "../../../styles/UI";
import {SafeAreaView} from "react-native-safe-area-context";

const Slide = ({ title, image }) => {

    return (
        <SlideContainer>
            <ContentContainer>
                <WrapperImage>
                    <ImageItem
                        source={image}

                    />
                </WrapperImage>
                <WrapperTitle>
                    {title}
                </WrapperTitle>
            </ContentContainer>

        </SlideContainer>
    );
};


const SlideContainer = styled(SafeAreaView)({
    width: Dimensions.get('window').width,


});

const ContentContainer = styled.View({
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 70,

});

const WrapperTitle = styled.Text({
    textAlign: 'center',
    marginTop: 50,
    color: UIStyles.colors.white,
    fontSize: 22,
    fontFamily: 'MontserratBold'
})

const WrapperImage = styled.View({

});

const ImageItem = styled.Image({
    alignSelf: 'center',
    width: '100%',
    height: 300,
    objectFit: 'contain'
});

export default Slide;
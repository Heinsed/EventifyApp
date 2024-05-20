import {Marker} from "react-native-maps";
import styled from "styled-components/native";
import UIStyles from "../../../styles/UI";




const MapMarker = ({image}) => {
    console.log(UIStyles)
    return(
        <>
            <MarkerCircle>
                <MarkerImage
                    source={{
                        uri: image,
                    }}
                />

            </MarkerCircle>
            <MarkerDot />
        </>
    )
}

const MarkerCircle = styled.View({
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: true,
    borderWidth: 5,
    borderColor: UIStyles.colors.green,
   
});


const MarkerImage = styled.Image({
    width: 40,
    height: 40,
    borderRadius: 50,

});

const MarkerDot = styled.Image({
    width: 10,
    height: 10,
    borderRadius: 10,
    background: UIStyles.colors.green,
    margin: '0 auto',
    marginTop: -5

});

export default MapMarker;
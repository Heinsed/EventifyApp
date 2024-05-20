import styled from "styled-components/native";
import {useEffect, useState} from "react";
import {Text} from "react-native";
import UIStyles from "../../../styles/UI";


const WishlistModal = () => {

    return (
        <WishlistModalContainer>
            <WishlistModalTitle>
                Here will be favourites events, when Redux will be learned.
            </WishlistModalTitle>
        </WishlistModalContainer>
    )
}

const WishlistModalContainer = styled.View( () => ({
    height: '50%',
    background: UIStyles.colors.white,
    paddingLeft: 24,
    paddingRight: 24,
    justifyContent: 'center',
}));

const WishlistModalTitle = styled.Text( () => ({
    fontSize: 18,
    fontFamily: 'MontserratMedium',
    textAlign: 'center',
}));

export default WishlistModal;
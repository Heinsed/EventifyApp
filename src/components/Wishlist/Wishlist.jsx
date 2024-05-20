import styled from "styled-components/native";
import {useEffect, useState} from "react";
import CustomPressable from "../CustomPressable";
import UIStyles from "../../styles/UI";
import Icon from "../Icon";
import WishlistModal from "./components/WishlistModal";



const Wishlist = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            <WishlistModalToggler targetFunction={() => setModalVisible(true)}>
                <Icon iconType={'wishlist'} color={ UIStyles.colors.white } size={24} />
            </WishlistModalToggler>
            <WishlistModalBox
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <CloseModal targetFunction={() => setModalVisible(false)} />
                <WishlistModal />
            </WishlistModalBox>
        </>
    )
}

const WishlistModalToggler = styled(CustomPressable)( () => ({
    background: UIStyles.colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    height:42,
    borderRadius: 42,
    width: 42,
    fontSize: 15,
}));

const CloseModal = styled(CustomPressable)( () => ({
    flex: 1,
    background: UIStyles.colors.black,
    opacity: 0.55,
}));

const WishlistModalBox = styled.Modal( () => ({

}));

export default Wishlist;
import styled from "styled-components/native";
import {useEffect, useState, useRef} from "react";
import CustomPressable from "../CustomPressable";
import UIStyles from "../../styles/UI";
import Icon from "../Icon";
import WishlistModal from "./components/WishlistModal";
import mainStore from "../../stores/MainStore";
import {observer} from "mobx-react-lite";
import BottomSheet from "react-native-gesture-bottom-sheet";
import wishlistModal from "./components/WishlistModal";


const Wishlist = observer(() => {
    const [modalVisible, setModalVisible] = useState(false);
    const { themeStore } = mainStore;
    const currentTheme = themeStore.theme;
    const wishlistSheet = useRef();
    return (
        <>
            <WishlistModalToggler currentTheme={currentTheme} targetFunction={() => wishlistSheet.current.show()}>
                <Icon iconType={'wishlist'} color={ currentTheme === 'dark' ? UIStyles.dark.dark : UIStyles.light.white } size={24} />
            </WishlistModalToggler>
            <BottomSheet
                ref={wishlistSheet}
                height={500}
                onRequestClose={() => {
                    wishlistSheet.current.close();
                    setSelectedEvent(null);
                }}
                sheetBackgroundColor={currentTheme === 'dark' ? UIStyles.dark.white : UIStyles.light.white}
            >

                <WishlistModal />
            </BottomSheet>
        </>
    )
});

const WishlistModalToggler = styled(CustomPressable)( ({currentTheme}) => ({
    background: currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green,
    justifyContent: 'center',
    alignItems: 'center',
    height:42,
    borderRadius: 42,
    width: 42,
    fontSize: 15,
}));

const CloseModal = styled(CustomPressable)( ({currentTheme}) => ({
    flex: 1,
    background: currentTheme === 'dark' ? UIStyles.dark.black : UIStyles.light.black,
    opacity: 0.55,
}));

const WishlistModalBox = styled.Modal( () => ({

}));

export default Wishlist;
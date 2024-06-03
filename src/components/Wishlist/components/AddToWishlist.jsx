import React from 'react';
import styled from "styled-components/native";
import CustomPressable from "../../CustomPressable";
import UIStyles from "../../../styles/UI";
import Icon from "../../Icon";
import { observer } from "mobx-react-lite";
import mainStore from "../../../stores/MainStore";
import { useCallback } from "react";

const AddToWishlist = observer(({ event }) => {
    const { wishlistStore, themeStore } = mainStore;
    const currentTheme = themeStore.theme;

    const handleToggleWishlist = useCallback(() => {
        if (event && wishlistStore) {
            if (wishlistStore.isEventInWishlist(event)) {
                wishlistStore.removeFromWishlist(event);
                console.log(`Removed event with ID: ${event.id} from wishlist`);
            } else {
                wishlistStore.addToWishlist(event);
                console.log(`Added event with ID: ${event.id} to wishlist`);
            }
        }
    }, [wishlistStore, event]);

    const isItemInWishlist = wishlistStore.isEventInWishlist(event);

    return (
        <AddToWishlistButton
            targetFunction={handleToggleWishlist}
            currentTheme={currentTheme}
        >
            <Icon
                iconType={'wishlist'}
                color={isItemInWishlist ? (currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green) : (currentTheme === 'dark' ? UIStyles.dark.dark : UIStyles.light.dark)} // Установка цвета иконки в зависимости от наличия события в вишлисте
                size={24}
            />
        </AddToWishlistButton>
    );
});

const AddToWishlistButton = styled(CustomPressable)(({ currentTheme }) => ({
    backgroundColor: currentTheme === 'dark' ? UIStyles.dark.background : UIStyles.light.background,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
}));

export default AddToWishlist;

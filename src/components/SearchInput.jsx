import styled from "styled-components/native";
import UIStyles from "../styles/UI";
import { useState, useEffect } from "react";
import Icon from "./Icon";
import { Keyboard } from "react-native";
import CustomPressable from "./CustomPressable";
import Wishlist from "./Wishlist/Wishlist";
import { observer } from "mobx-react-lite";
import mainStore from "../stores/MainStore";


const SearchInput = observer(({ onSearchChange, title }) => {
    const [isInputVisible, setInputVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const { themeStore, eventsStore } = mainStore;
    const currentTheme = themeStore.theme;

    useEffect(() => {
        setSearchValue(eventsStore.searchQuery);
    }, []);

    const submitSearch = () => {
        onSearchChange(searchValue);
        Keyboard.dismiss();
    };

    const toggleSearch = () => {
        setInputVisible(!isInputVisible);
        if (!isInputVisible) {
            setSearchValue('');
        }
        Keyboard.dismiss();
    };

    return (
        <SearchInputContainer>
            <IconWrapper targetFunction={toggleSearch}>
                <Icon iconType={'search'} color={currentTheme === 'dark' ? UIStyles.dark.dark : UIStyles.light.white} size={24} />
            </IconWrapper>
            <SearchTitle currentTheme={currentTheme}>{title}</SearchTitle>
            <Wishlist />
            <SearchTextContainer inputVisible={isInputVisible}>
                <SearchTextInput
                    placeholder={"Поиск"}
                    placeholderTextColor={currentTheme === 'dark' ? UIStyles.light.lightGrey : UIStyles.light.lightGrey}
                    visible={isInputVisible}
                    value={searchValue}
                    onChangeText={setSearchValue}
                    onBlur={submitSearch}
                    currentTheme={currentTheme}
                />
            </SearchTextContainer>
        </SearchInputContainer>
    );
});

const SearchInputContainer = styled.View(() => ({
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 24,
    overflow: 'hidden',
    gap: 12,
    justifyContent: 'space-between',
    flexWrap: 'wrap'
}));

const SearchTextContainer = styled.View(({ inputVisible }) => ({
    width: '100%',
    height: inputVisible ? 42 : 0,
}));

const SearchTitle = styled.Text(({ currentTheme }) => ({
    flex: 1,
    fontSize: 18,
    fontFamily: 'MontserratSemiBold',
    color: currentTheme === 'dark' ? UIStyles.dark.black : UIStyles.light.black,
    textAlign: 'center',
}));

const SearchTextInput = styled.TextInput(({ visible, currentTheme }) => ({
    flex: 1,
    width: '100%',
    display: visible ? null : 'none',
    backgroundColor: currentTheme === 'dark' ? UIStyles.dark.lightGrey : UIStyles.light.darkWhite,
    color: currentTheme === 'dark' ? UIStyles.dark.dark : UIStyles.light.black,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 12,
    alignSelf: 'center',
    fontSize: 15,
    marginRight: 0,
    fontFamily: 'MontserratRegular',
}));

const IconWrapper = styled(CustomPressable)(({ currentTheme }) => ({
    backgroundColor: currentTheme === 'dark' ? UIStyles.dark.green : UIStyles.light.green,
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    borderRadius: 42,
    width: 42,
    fontSize: 15,
}));

export default SearchInput;

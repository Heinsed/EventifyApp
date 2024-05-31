import styled from "styled-components/native";
import UIStyles from "../styles/UI";
import {useState, useEffect} from "react";
import Icon from "./Icon";
import {Keyboard} from "react-native";
import CustomPressable from "./CustomPressable";
import Wishlist from "./Wishlist/Wishlist";
import {observer} from "mobx-react-lite";
import mainStore from "../stores/MainStore";

const SearchInput = observer(({onSearchChange, title}) => {
    const [isInputVisible, setInputVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const { eventsStore } = mainStore;


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
                <Icon iconType={'search'} color={UIStyles.colors.white} size={24} />
            </IconWrapper>
            <SearchTitle>{title}</SearchTitle>
            <Wishlist />
            <SearchTextContainer inputVisible={isInputVisible}>
                <SearchTextInput
                    placeholder={"Пошук"}
                    visible={isInputVisible}
                    value={searchValue}
                    onChangeText={setSearchValue}
                    onBlur={submitSearch}
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
    gap: 12,
    justifyContent: 'space-between',
    flexWrap: 'wrap'
}));

const SearchTextContainer = styled.View(({inputVisible}) => ({
    width: '100%',
    height: inputVisible ? 42 : 0,
}));

const SearchTitle = styled.Text(() => ({
    flex: 1,
    fontSize: 18,
    fontFamily: 'MontserratSemiBold',
    color: UIStyles.colors.black,
    textAlign: 'center',
}));

const SearchTextInput = styled.TextInput(({visible}) => ({
    flex: 1,
    width: '100%',
    display: visible ? null : 'none',
    background: UIStyles.colors.darkWhite,
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

const IconWrapper = styled(CustomPressable)(() => ({
    background: UIStyles.colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    borderRadius: 42,
    width: 42,
    fontSize: 15,
}));

export default SearchInput;

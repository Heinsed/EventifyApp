import styled from "styled-components/native";
import {UIStyles} from "../styles/UI";
import {useState} from "react";
import Icon from "./Icon";
import {Keyboard} from "react-native";
import CustomPressable from "./CustomPressable";
import {useEffect} from "react";
import Wishlist from "./Wishlist/Wishlist";



const SearchInput = ({onSearchChange, onFilterSubmitted, title}) => {
    const [isInputVisible, setInputVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const submitSearch = () => {
        onSearchChange(searchValue);
        Keyboard.dismiss();
    }
    Keyboard.addListener('keyboardDidHide', () => {
        onSearchChange(searchValue);
    });

    const toggleSearch = () => {
        setSearchValue('');
        setInputVisible(!isInputVisible);
        Keyboard.dismiss();
    }

    return(
        <SearchInputContainer>

            <IconWrapper  targetFunction={() => { (isInputVisible && searchValue !== '') ? submitSearch() : toggleSearch()}}>
                <Icon iconType={'search'} color={ UIStyles.colors.white } size={24} />
            </IconWrapper>
            <SearchTitle>{title}</SearchTitle>
            <Wishlist />
            <SearchTextContainer inputVisible={isInputVisible}>
                <SearchTextInput placeholder={"Пошук"} visible={isInputVisible} value={searchValue} onChangeText={setSearchValue}/>
            </SearchTextContainer>

        </SearchInputContainer>
    )
}

const SearchInputContainer = styled.View( () => ({
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',

    paddingLeft: 24,
    paddingRight: 24,
    gap: 12,
    justifyContent: 'space-between',
    flexWrap: 'wrap'
}));

const SearchTextContainer = styled.View( ({inputVisible}) => ({
    width: '100%',
    height: inputVisible ? 42 : 0,
}));

const SearchTitle = styled.Text( () => ({
    flex: 1,
    fontSize: 18,
    fontFamily: 'MontserratSemiBold',
    color: UIStyles.colors.black,
    textAlign: 'center',

}));

const SearchTextInput = styled.TextInput( ({visible}) => ({
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

const IconWrapper = styled(CustomPressable)( ({}) => ({
    background: UIStyles.colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    height:42,
    borderRadius: 42,
    width: 42,
    fontSize: 15,
}));



export default SearchInput;
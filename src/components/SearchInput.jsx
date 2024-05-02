import styled from "styled-components/native";
import {UIStyles} from "../styles/UI";
import {useState} from "react";
import Icon from "./Icon";
import {Keyboard} from "react-native";
import CustomPressable from "./CustomPressable";
import {useEffect} from "react";



const SearchInput = ({onSearchChange, onFilterSubmitted}) => {
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
            <SearchTextInput placeholder={"Пошук"} visible={isInputVisible} value={searchValue} onChangeText={setSearchValue}/>
            <IconWrapper inputVisible={isInputVisible} targetFunction={() => { (isInputVisible && searchValue !== '') ? submitSearch() : toggleSearch()}}>
                <Icon iconType={'search'} color={ (isInputVisible || searchValue !== '') ? UIStyles.colors.white : UIStyles.colors.green } size={24} />
            </IconWrapper>
            <IconWrapper inputVisible={isInputVisible} targetFunction={() => { (isInputVisible && searchValue !== '') ? submitSearch() : toggleSearch()}}>
                <Icon iconType={'search'} color={ (isInputVisible || searchValue !== '') ? UIStyles.colors.white : UIStyles.colors.green } size={24} />
            </IconWrapper>

        </SearchInputContainer>
    )
}

const SearchInputContainer = styled.View( () => ({
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    paddingLeft: 24,
    paddingRight: 24,
    gap: 12,
    justifyContent: 'space-between',
}));

const SearchTextInput = styled.TextInput( ({visible}) => ({
    flex: 1,
    display: visible ? null : 'none',
    background: UIStyles.colors.darkWhite,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 12,

    fontSize: 15,
    fontFamily: 'MontserratRegular',
}));

const IconWrapper = styled(CustomPressable)( ({inputVisible}) => ({
    background: inputVisible ? UIStyles.colors.green : null,
    justifyContent: 'center',
    alignItems: 'center',
    height:42,
    borderRadius: 42,
    width: inputVisible ? 42 : 24,
    fontSize: 15,
}));



export default SearchInput;